
/*******
	Collision Manifold
*******/
function Manifold(e1, e2)
{
	this.rigidBody1 = e1.getChild("[builtin_rigidbody]");
	this.rigidBody2 = e2.getChild("[builtin_rigidbody]");
	this.collider1 = e1.getChild("[builtin_collider]");
	this.collider2 = e2.getChild("[builtin_collider]");

	this.valid = (this.rigidBody1 && this.rigidBody2 && this.collider1 && this.collider2);

	this.getPenetration = function()
	{
		return this.collider1.resolver.getPenetration(this.collider2.resolver);
	};

	this.getNormal = function()
	{
		return this.collider1.getNormal(this.collider2);
	};

}
