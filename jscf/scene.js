
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
                if (!entity)
                    continue;
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
                if (entity && entity.auto_render) {
                    entity.render();
                }
            }
        }

        return true;
    };

    this.getEntity = function(name)
    {
        var e = this.entities[name];
        if (e)
            return e;

        for (var entity in this.entities) {
            if (this.entities.hasOwnProperty(entity) && this.entities[entity].getChild) {
                var res = this.entities[entity].getChild(name);
                if (res)
                    return res;
            }
        }
        console.warn("[JSCF] scene couldn't find requested object: " + name);
    }

    this.addEntity = function(entity)
    {
        if (!(entity.name in this.entities)) {
            this.entities[entity.name] = entity;
            return entity;
        } else {
            return false;
        }
    };

    this.createManualEntity = function(name, x, y, firstChild) {
        var e = new Entity(name, true, x, y, false);
        e.children[this.getChildName(e, firstChild)] = firstChild;
        return this.addEntity(e);
    };

    this.createEntity = function(name, x, y, firstChild)
    {
        var e = new Entity(name, true, x, y, true);
        e.children[this.getChildName(e, firstChild)] = firstChild;
        return this.addEntity(e);
    };

    this.createNewEntity = function(firstChild)
    {
        var e = new Entity(this.getEntityName(), true, 0, 0, true);
        e.children[this.getChildName(e, firstChild)] = firstChild;
        return this.addEntity(e);
    };

    this.getChildName = function(parent, child)
    {
        if (child.name)
            return child.name;
        return parent.getChildName();
    };

    this.getEntityName = function()
    {
        this.max_euid++;
        return "entity_" + this.max_euid;
    };
}
