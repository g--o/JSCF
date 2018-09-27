/**
 * @class
 * @classdesc the physics engine of JSCF.
 * @memberof Physics
 *
 * @param {Container} entities   container of entities (usually dictionary)
 *
 * @constructor
 */
function PhysicsEngine(entities)
{
    /**
     *    pixels/meter ratio (default: 50)
     *
     *    @type {Number}
     */
	this.pixelMeterRatio = 50;
    /**
     *    number of iterations/ticks per update (default: 5)
     *
     *    @type {Number}
     */
	this.numIterations = 5;
    /**
     *    tick duration in seconds. Should be linear to 1/numIterations! (default: Scene.tick_duration/numIterations)
     *
     *    @type {Number}
     */
	this.tickDuration = 1/this.numIterations;
    /**
     *    gravity acceleration in px/s^2 (default: (0, 9.8 * pixelMeterRatio) )
     *
     *    @type {Utils.Vector2d}
     */
	this.gravity = new Vector2d(0, 9.8 * this.pixelMeterRatio); // acceleration

	// Disable if no rigidbody component was found
	if (typeof(Rigidbody) == "undefined") {
		console.warn("[JSCF][PhysicsEngine] Rigidbody component not included! Disabled!");
		this.numIterations = 0;
	}

    /////////// Methods ///////////

    /**
     *    applys natural forces to a rigidbody component
     *
     *    @method
     *    @param  {Components.Rigidbody} rigidbody rigidbody component
     */
	this.applyNaturalForces = function(rigidbody)
	{
		if (rigidbody.auto_gravity && ! rigidbody.static) {
			rigidbody.applyAcceleration(this.gravity);
		}
	};

    /**
     *    resolve a collision described by a manifold
     *
     *    @method
     *    @param  {Physics.Manifold} manifold collision manifold of two entities.
     */
	this.applyCollision = function(manifold) // accepts collision manifold
	{
		if (manifold.valid) {
			var normal = manifold.getNormal();
			manifold.rigidBody1.calcCollision(manifold.rigidBody2, normal);
		}
	};

    /**
     *    fixes penetration/energy loss
     *
     *    @method
     *    @param  {Physics.Manifold} manifold collision manifold
     */
	this.fixPenetration = function(manifold)
	{
		if (manifold.valid) {
			var penVec = manifold.getPenetration();
			manifold.rigidBody1.fixPenetration(manifold.rigidBody2, penVec);
		}
	};

    /**
     *    detects collisions
     *
     *    @method
     *    @return {Array} array of collision manifolds
     */
	this.detectCollisions = function()
	{
		var collisionCache = {};
		var manifolds = [];

		// Resolve collisions for each pair of entities
		for (entityName in entities) {
			if (entities.hasOwnProperty(entityName)) {
				var entity = entities[entityName];
				if (!entity)
					continue;
				if (entity.auto_physics) {
					// get rigidbody
					var rigidbody = entity.getComponentOfType(Rigidbody);
					if (!rigidbody)
						continue;

					rigidbody.tick_update(this.tickDuration);

					// set collision forces
					var collider = entity.getComponentOfType(Collider);
					if (!(collider && collider.others))
						continue;

					collider.update();

					// check collisions
					for (var j = 0; j < collider.others.length; j++) {
						var otherEntity = collider.others[j];
						if (otherEntity) {
							if (collisionCache[entity.name] && collisionCache[entity.name][otherEntity.name])
								break;

							if (!collisionCache[otherEntity.name])
								collisionCache[otherEntity.name] = {};
							collisionCache[otherEntity.name][entity.name] = true;
							var man = new Manifold(entity, otherEntity);
							manifolds.push(man);
						}
					}
				}
			}
		}

		return manifolds;
	};

    /**
     *    resolve natural forces on engine's tracked entities.
     *
     *    @method
     */
	this.resolveNaturalForces = function()
	{
		// Update natural forces for each entity
		for (entityName in entities) {
			if (entities.hasOwnProperty(entityName)) {
				var entity = entities[entityName];
				if (!entity)
					continue;
				if (entity.auto_physics) {
					// get rigidbody
					var rigidbody = entity.getComponentOfType(Rigidbody);
					if (!rigidbody)
						continue;
					// set forces
					this.applyNaturalForces(rigidbody);
				}
			}
		}
	};

    /**
     *    resolve collision manifolds
     *
     *    @method
     *    @param  {Array} manifolds array of collision manifolds
     */
	this.resolveCollisions = function(manifolds)
	{
		// apply collisions
		for (var i = 0; i < manifolds.length; i++)
			this.applyCollision(manifolds[i]);

		// fix penetrations
		for (var i = 0; i < manifolds.length; i++)
			this.fixPenetration(manifolds[i]);
	};

    /**
     *    updates physics engine (tick)
     *
     *    @param {Number} tick_duration the time (in seconds) of a tick (usually dt)
     *    @method
     */
	this.update = function(tick_duration)
	{
        this.tickDuration = tick_duration/this.numIterations;

		for (var i = 0; i < this.numIterations; i++) {
			this.resolveNaturalForces();

			var manifolds = this.detectCollisions();

			this.resolveCollisions(manifolds);
		}
	};
}
