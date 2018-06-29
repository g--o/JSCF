
/***************************
	rigid body component.
***************************/
const __RIGIDBODY_NAME = "[builtin_rigidbody]";
const __RIGIDBODY_BIAS = 10000;
const __RIGIDBODY_EPSILON = __RIGIDBODY_BIAS/Number.MAX_VALUE; //1/Infinity;
const __RIGIDBODY_STAIC_MASS = 1/__RIGIDBODY_EPSILON;

var Rigidbody = function(owner, tick_duration)
{

	this.setParent = function(p)
	{
		this.parent = p;
	};

	this.setStaticBody = function()
	{
		this.static = true;
		this.auto_gravity = false;
		this.mass = __RIGIDBODY_STAIC_MASS;
	};

	this.update = function()
	{
		if (this.auto_update)
			this.tick_update();
	};

	this.tick_update = function()
	{
		// displace (integrate)
		this.parent.transform.pos.x += this.velocity.x * this.tickDuration;
		this.parent.transform.pos.y += this.velocity.y * this.tickDuration;
	};

	this.calcCollision = function(other, normal)
	{
		// DEFINITIONS:
		const massA = this.mass;
		const massB = other.mass;
		const fCor = (this.cor + other.cor)/2;

    	const ut = new Vector2d(-normal.y,normal.x); 								// Tangent
		const v1 = this.velocity;
		const v2 = other.velocity;

    	var v1n = v1.dotProduct(normal); 										// Velocity in normal direction
    	var v1t = ut.dotProduct(v1); 											// Velocity in tangent direction
    	var v2n = normal.dotProduct(v2); 										// Velocity in normal direction
    	var v2t = ut.dotProduct(v2); 											// Velocity in tangent direction

		// APPLY MOMENTUM CONSERVATION:
    	var V1t = v1t
		var V2t = v2t;
    	var V1n = (v1n*(massA-fCor*massB)+(1+fCor)*massB*v2n)/(massA+massB); 	// Velocity size using my custom equation
    	var V2n = (v2n*(massB-fCor*massA)+(1+fCor)*massA*v1n)/(massA+massB); 	// Velocity size using my custom equation

    	var vV1n = new Vector2d(V1n*normal.x, V1n*normal.y);		 			// Getting the velocity for the normal direction
    	var vV1t = new Vector2d(V1t*ut.x, V1t*ut.y); 							// Getting the velocity for the tangent direction
    	var vV2n = new Vector2d(V2n*normal.x, V2n*normal.y); 					// Getting the velocity for the normal direction
    	var vV2t = new Vector2d(V2t*ut.x, V2t*ut.y); 							// Getting the velocity for the tangent direction

    	var fV1 = new Vector2d(vV1n.x+vV1t.x,vV1n.y+vV1t.y);					// Getting final velocity
    	var fV2 = new Vector2d(vV2n.x+vV2t.x,vV2n.y+vV2t.y);					// Getting final velocity

		if (!this.static)
			this.velocity = fV1;
		if (!other.static)
			other.velocity = fV2;
	};

	this.fixPenetration = function(other, penVec)
	{
		var biasVec = penVec.clone();
		// biasVec.scalarMul(correction);

		if (!this.static)
			this.parent.transform.pos.addVector(penVec);
		if (!other.static)
			other.parent.transform.pos.subVector(penVec);
	};

	this.applyAcceleration = function(acceleration)
	{
		// integrate to velocity & apply
		var vel = acceleration.clone();
		vel.scalarMul(this.tickDuration);

		this.applyVelocity(vel);
	};

	this.applyVelocity = function(velocity)
	{
		this.velocity.addVector(velocity);
	};

	this.init = function()
	{
		this.name = __RIGIDBODY_NAME;
		this.parent = owner;

		if (tick_duration)
			this.tickDuration = tick_duration;
		else
			this.tickDuration = this.parent.game.getCurrentScene().physicsEngine.tickDuration;

		this.displacement = new Vector2d(0, 0);
		this.velocity = new Vector2d(0, 0);
		this.ro = 1;
		this.cor = 1;
		this.mass = this.parent.transform.scale.x * this.parent.transform.scale.y * this.ro;
		this.auto_gravity = true;
		this.auto_update = false;
		this.static = false;

		if (!this.parent.hasComponentOfType(Collider))
			console.error("[jscf/components/rigidbody] parent doesn't have collider.");
		if (!this.parent.transform)
			console.error("[jscf/components/rigidbody] parent doesn't have transform! Not an entity?");
	};
	this.init();
};

Rigidbody.component_name = __RIGIDBODY_NAME;
