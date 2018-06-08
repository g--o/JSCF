
/***************************
	physics component.
***************************/
function PhysicsEngine(entities, tick_duration)
{
	this.tickDuration = tick_duration;
	this.gravity = new Vector2d(0, 9.8); // acceleration (m/s^2)
	this.collisionCache = {};

	this.applyNaturalForces = function(rigidbody)
	{
		if (rigidbody.auto_gravity && ! rigidbody.static) {
			var gravityVelocity = this.gravity.clone();
			gravityVelocity.scalarMul(this.tickDuration);
			rigidbody.velocity.addVector(gravityVelocity);
		}
	};

	this.applyCollision = function(e1, e2) // accepts entity1, entity2
	{
		var rigidBody1 = e1.getChild("[builtin_rigidbody]");
		var rigidBody2 = e2.getChild("[builtin_rigidbody]");
		var collider1 = e1.getChild("[builtin_collider]");
		var collider2 = e2.getChild("[builtin_collider]");

		if (rigidBody1 && rigidBody2 && collider1 && collider2) {
			var normal = collider1.getNormal(collider2);
			var penVec = collider1.resolver.getPenetration(collider2.resolver);
			rigidBody1.calcCollision(rigidBody2, normal, penVec);
		}

	};

	this.update = function()
	{
		this.collisionCache = {};

		// iterate entities and update physics
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

					// set collision forces
					var collider = entity.getComponentOfType(Collider);
					if (!(collider && collider.others))
						continue;

					// check collisions
					for (var j = 0; j < collider.others.length; j++) {
						var otherEntity = collider.others[j];
						if (otherEntity) {
							if (this.collisionCache[entity.name] && this.collisionCache[entity.name][otherEntity.name])
								break;

							if (!this.collisionCache[otherEntity.name])
								this.collisionCache[otherEntity.name] = {};
							this.collisionCache[otherEntity.name][entity.name] = true;
							this.applyCollision(entity, otherEntity);
						}
					}
				}
			}
		}
	};
}
