
/***************************
	rigid body component.
***************************/
var Rigidbody = function(owner, tick_duration)
{

	this.backupRect = function()
	{
		this.oldRect.x = this.parent.rect.x;
		this.oldRect.y = this.parent.rect.y;
	};

	this.update = function()
	{
		this.backupRect();
		// displace
		this.parent.rect.x += this.velocity.x;
		this.parent.rect.y += this.velocity.y;

		this.displacement = new Vector2d(this.parent.rect.x - this.oldRect.x, this.parent.rect.y - this.oldRect.y);
	};

	this.calcCollision = function(otherRigidBody, normal)
	{
		// DEFINITIONS:
		let massA = this.mass;
		let massB = otherRigidBody.mass;
		let fCor = (this.cor + otherRigidBody.cor)/2;

    	let ut = new Vector2d(-normal.y,normal.x); 								// Tangent
		let v1 = this.velocity;
		let v2 = otherRigidBody.velocity;

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
		if (!otherRigidBody.static)
			otherRigidBody.velocity = fV2;
	};

	this.applyVelocity = function(velocity)
	{
		this.velocity.addVector(velocity);
	};

	this.init = function()
	{
		this.name = "[builtin_rigidbody]";
		this.parent = owner;

		if (tick_duration)
			this.tickDuration = tick_duration;
		else
			this.tickDuration = this.parent.game.getCurrentScene().physicsEngine.tickDuration;

		this.displacement = new Vector2d(0, 0);
		this.velocity = new Vector2d(0, 0);
		this.ro = 1;
		this.cor = 1;
		this.mass = this.parent.rect.x * this.parent.rect.y * this.ro;
		this.auto_gravity = true;
		this.static = false;

		if (!this.parent.hasOwnChild("[builtin_collider]"))
			console.error("[jscf/components/rigidbody] parent doesn't have collider.");
		if (!this.parent.rect)
			console.error("[jscf/components/rigidbody] parent doesn't have rect! Not an entity?");

		this.oldRect = new Rect(this.parent.x, this.parent.y, this.parent.width, this.parent.height, this.parent.type);
	};
	this.init();
};
