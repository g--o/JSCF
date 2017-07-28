
function Scene()
{
    this.max_euid = 0;
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

    this.createManualEntity = function(name, spr_handler) {
        return this.addEntity(new Entity(name, true, spr_handler, false));
    };

    this.createEntity = function(name, spr_handler)
    {
        return this.addEntity(new Entity(name, true, spr_handler, true));
    };

    this.createNewEntity = function(spr_handler)
    {
        return this.addEntity(new Entity(this.getEntityName(), true, spr_handler, true));
    };

    this.getEntityName = function()
    {
        this.max_euid++;
        return "entity_" + this.max_euid;
    };
}
