/**
 * Scene class. (World class in other engines)
 * @param       {Core.Game} game          the game object
 *
 * @memberof Scene
 * @constructor
 */
function Scene(game)
{

    /**
     *    is scene paused
     *
     *    @type {Boolean}
     */
    this.paused = false;
    /**
     *    scene's physics engine
     *
     *    @type {Physics.PhysicsEngine}
     */
    this.physicsEngine = new PhysicsEngine(this.entities);

    /**
     *    pause game
     *
     *    @method
     */
    this.pause = function()
    {
        this.paused = true;
    };

    /**
     *    resume scene
     *
     *    @method
     */
    this.resume = function()
    {
        this.paused = false;
    };

    /**
     *    updates scene (advance tick)
     *
     *    @method
     *    @return {Boolean} updated
     */
    this.update = function()
    {
        if (this.paused)
            return false;

        // Normal update
        for (var i = 0; i < this.entities_keys.length; ++i) {
            var entityName = this.entities_keys[i];
            var entity = this.entities[entityName];
            if (!entity)
                continue;
            if (entity.update && entity.auto_update)
                entity.update();
        }
        // Physics update
        this.physicsEngine.update(game.time.getDeltaTime());

        return true;
    };

    /**
     *    renders scene
     *
     *    @method
     *    @return {Boolean} true if rendered, false otherwise.
     */
    this.render = function()
    {
        if (this.paused)
            return false;

        for (var i = this.entities_keys.length; i >= 0; --i) {
            var entityName = this.entities_keys[i];
            var entity = this.entities[entityName];
            if (entity && entity.auto_render) {
                entity.render();
            }
        }

        return true;
    };

    /**
     *    gets entity by name
     *
     *    @method
     *    @param  {String} name entity name
     *    @return {Core.Entity}      entity if found, null otherwise.
     */
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

    /**
     *    adds entity
     *
     *    @method
     *    @param  {Core.Entity} entity the entity to add
     *    @return {Boolean}       true if added, false otherwise.
     */
    this.addEntity = function(entity)
    {
        if (!(entity.name in this.entities)) {
            this.entities[entity.name] = entity;
            this.entities_keys.unshift(entity.name);
            return entity;
        } else {
            return false;
        }
    };

    /**
     *    deletes an entity from scene
     *
     *    @method
     *    @param  {String}  entityName The entity's name
     *    @return {Boolean}            True if deleted, false otherwise.
     */
    this.delEntity = function(entityName)
    {
        if (!(entityName in this.entities))
            return false;

        this.entities_keys = __delete_array_element(this.entities_keys, entityName);
        this.entities[entityName].destroy();
        delete this.entities[entityName];
        return true;
    };

    /**
     *    creates manual entity (does not render, update automatically etc.)
     *
     *    @method
     *    @param  {String} name       entity name
     *    @param  {Number} x          the x position
     *    @param  {Number} y          the y position
     *    @param  {object} firstChild entity's first child
     *    @return {Core.Entity}            the newly created entity
     */
    this.createManualEntity = function(name, x, y, firstChild) {
        var e = new Entity(game, name, true, x, y, false);
        e.addChild(this.getChildName(e, firstChild), firstChild);
        return this.addEntity(e);
    };

    /**
     *    creates entity
     *
     *    @method
     *    @param  {String} name       entity name
     *    @param  {Number} x          the x position
     *    @param  {Number} y          the y position
     *    @param  {object} firstChild entity's first child
     *    @return {Core.Entity}            the newly created entity
     */
    this.createEntity = function(name, x, y, firstChild)
    {
        var e = new Entity(game, name, true, x, y, true);
        if (firstChild)
            e.addChild(this.getChildName(e, firstChild), firstChild);
        return this.addEntity(e);
    };

    /**
     *    creates new entity
     *
     *    @method
     *    @param  {object} firstChild entity's first child
     *    @return {Core.Entity}            the newly created entity
     */
    this.createNewEntity = function(firstChild)
    {
        var e = new Entity(game, this.getEntityName(), true, 0, 0, true);
        if (firstChild)
            e.addChild(this.getChildName(e, firstChild), firstChild);
        return this.addEntity(e);
    };

    /**
     *    generates child name
     *
     *    @method
     *    @param  {Core.Entity} parent parent entity
     *    @param  {object} child  child object/entity
     *    @return {String}        the generated name
     */
    this.getChildName = function(parent, child)
    {
        if (child.name)
            return child.name;
        return parent.getChildName();
    };

    /**
     *    generates entity name
     *
     *    @method
     *    @return {String} the generated name.
     */
    this.getEntityName = function()
    {
        this.max_euid++;
        return "entity_" + this.max_euid;
    };

    /**
     *    serialize scene data
     *
     *    @method
     *    @return {Object} scene data representation object
     */
    this.serialize = function()
    {
        this.pause();
        var ents = JSON.stringify(this.entities, __get_circular_replaces());
        this.resume();

        return ents;
    };

    /**
     *    loads scene from serialized data
     *
     *    @method
     *    @param  {Object} data the data
     */
    this.deserialize = function(data)
    {
        this.pause();
        this.entities = JSON.parse(data, __func_reviver);
        this.resume();
    };

    /**
     *    the file drop handler
     *
     *    @method
     *    @param  {String} file file data
     */
    this.onFileDrop = function(file)
    {
        if (game.debug)
            this.deserialize(file);
    };

    this.init = function()
    {
        var self = this;
        this.max_euid = 0;
        this.entities = {};
        this.entities_keys = [];
        InputManager.droppedFileCallback = this.onFileDrop.bind(this);
    };

    this.init();
}

function __delete_array_element(arr, value)
{
    return arr.filter(function(item) { return item !== value; });
}

const __get_circular_replaces = () => {
  const seen = new WeakSet();
  return (key, value) => {
    // if we get a function give us the code for that function
    if (typeof value === 'function')
        return value.toString();

    if (typeof value === "object" && value !== null) {
      if (seen.has(value))
        return;
      seen.add(value);
    }
    return value;
  };
};

const __func_reviver = (key, value) => {
    if (typeof value === 'string'
        && value.indexOf('function ') === 0) {
      let functionTemplate = `(${value}).call(this)`;
      return new Function(functionTemplate);
    }
    return value;
};
