/**
 * @class
 * @classdesc the collision manifold.
 * @memberof Physics
 *
 * @param {Core.Entity} e1   one entity that collided.
 * @param {Core.Entity} e2   other entity that collided.
 * @constructor
 */
function Manifold(e1, e2)
{
	this.rigidBody1 = e1.getBuiltinComponent("rigidbody");
	this.rigidBody2 = e2.getBuiltinComponent("rigidbody");
	this.collider1 = e1.getBuiltinComponent("collider");
	this.collider2 = e2.getBuiltinComponent("collider");

    /**
     *    validity flag
     *
     *    @type {Boolean}
     */
	this.valid = (this.rigidBody1 && this.rigidBody2 && this.collider1 && this.collider2);

    /**
     *    gets penetration between the entities' colliders
     *
     *    @method
     *    @return {Utils.Vector2d}    the penetration vector between colliders.
     */
	this.getPenetration = function()
	{
		return this.collider1.resolver.getPenetration(this.collider2.resolver);
	};

    /**
     *    gets the normal between the entitie's colliders.
     *
     *    @method
     *    @return {Utils.Vector2d}    the normal vector between colliders.
     */
	this.getNormal = function()
	{
		return this.collider1.getNormal(this.collider2);
	};

}
