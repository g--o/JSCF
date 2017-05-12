
function Scene()
{
    this.max_eid = 0;
    this.entities = {};
    this.paused = false;

    this.pause = function()
    {
        this.paused = true;
    };

    this.resume = function()
    {
        this.paused = false;
    };

    this.update = function()
    {
        if (this.paused)
            return false;

        for (entityName in this.entities) {
            if (this.entities.hasOwnProperty(entityName)) {
                var entity = this.entities[entityName];
                if(entity.auto_physics) {
                    // TODO: physics.
                }
                if (entity.auto_update) {
                    entity.update();
                }
            }
        }

        return true;
    };

    this.render = function()
    {
        if (this.paused)
            return false;

        for (entityName in this.entities) {
            if (this.entities.hasOwnProperty(entityName)) {
                var entity = this.entities[entityName];
                if (entity.auto_render) {
                    entity.render();
                }
            }
        }

        return true;
    };

    this.addEntity = function(entity)
    {
        if (!(entity.name in this.entities)) {
            this.entities[entity.name] = entity;
            return entity;
        } else {
            return false;
        }
    };

    this.createEmptyEntity = function(name, spr_handler)
    {
        return this.entites["empty_entity_"+max_euid] = new Entity(name, true, spr_handler, true);
    };

    this.getEntityName = function()
    {
        max_euid++;
        return "entity_" + max_euid;
    };
}
