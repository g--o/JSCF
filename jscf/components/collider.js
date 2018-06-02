
var Collider = function(owner, collisionResolver, potential_entities)
{

	this.getNormal = function(otherCollider)
	{
		if (otherCollider.resolver.type == this.resolver.type)
		{
			return this.resolver.getNormal(otherCollider.resolver);
		}
	};

	this.update = function()
	{
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
		this.name = "[builtin_collider]";
		this.parent = owner;
		this.normal = new Vector2d(0, 0);
		this.others = [];
		if (potential_entities)
			this.potential_entities = potential_entities;
		else
			this.potential_entities = null;
		if (collisionResolver)
			this.resolver = collisionResolver;
		else
			this.resolver = this.parent.rect;
	};
	this.init();
}
