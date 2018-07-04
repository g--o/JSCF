
/***************************
	collider component.
***************************/

const __COLLIDER_NAME = "[builtin_collider]";

/**
 * @class
 * @classdesc Collider component class
 *
 * @param  {Entity} owner the entity the component's being applied to.
 * @param  {object} collisionResolver  collider object (e.g: AABB, CircleCollider)
 * @param  {Container} potential_entities container of potential entities to check against
 * 										  (usually dictionary)
 * @constructor
 */
var Collider = function(owner, collisionResolver, potential_entities)
{

	/**
	 *    gets normal with other collider
	 *
	 *    @method
	 *    @param  {Collider} otherCollider 	other collider
	 *    @return {Vector2d}				the normal of the collision
	 */
	this.getNormal = function(otherCollider)
	{
		return this.resolver.getNormal(otherCollider.resolver);
	};

	/**
	 *    updates the collider (position, detection, etc..)
	 *
	 *    @method
	 */
	this.update = function()
	{
		this.resolver.setTransform(this.parent.getGlobalTransform());
		this.others = [];

		if (this.potential_entities == null) {
			this.potential_entities = this.parent.game.getCurrentScene().entities;
		}

		for (entityName in this.potential_entities) {
			if (this.parent.name == entityName)
				continue;
            if (this.potential_entities.hasOwnProperty(entityName)) {
                var entity = this.potential_entities[entityName];
                if (!entity)
                    continue;

				var otherCollider = entity.getChild(this.name);

				if (otherCollider && this.resolver.isColliding(otherCollider.resolver)) {
					this.others.push(entity);
				}
			}
		}
		this.potential_entities = null;
	};

	this.init = function()
	{
		this.name = __COLLIDER_NAME;
		this.parent = owner;
		this.normal = new Vector2d(0, 0);
		this.others = [];

		if (potential_entities)
			this.potential_entities = potential_entities;
		else
			this.potential_entities = null;

		if (collisionResolver) {
			this.resolver = collisionResolver;
		} else {
			var pos = this.parent.getGlobalTransform().pos;
			var dims = this.parent.getShapeByChild();
			this.resolver = new AABB(pos.x, pos.y, dims.x, dims.y);
		}
	};
	this.init();
};

/**
 *    the component name
 *
 *    @type {String}
 */
Collider.component_name = __COLLIDER_NAME;
