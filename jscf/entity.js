
/**
 * Entity object of the game engine.
 * @param       {Game} game         the game object
 * @param       {String} name       the name of the entity
 * @param       {Boolean} alive     is the entity enabled or disabled?
 * @param       {Number} x          the x coordinate
 * @param       {Number} y          the y coordinate
 * @param       {Boolean} automated should the entity be automated (in update, render, etc)
 * @constructor
 */
function Entity(game, name, alive, x, y, automated)
{
    /**
     *    starts rendering the entity (applies transform to the graphical context)
     *
     *    @method
     */
    this.start_render = function()
    {
        var ctx = game.graphics.context;

        ctx.save();
        ctx.translate(this.transform.pos.x, this.transform.pos.y);
        ctx.rotate(this.transform.angle);
        ctx.scale(this.transform.scale.x, this.transform.scale.y);
    };

    /**
     *    ends rendering the entity (restores transform to graphical context)
     *
     *    @method
     */
    this.end_render = function()
    {
        game.graphics.context.restore();
    };

    /**
     *    renders the entity (and it's children)
     *
     *    @method
     */
    this.render = function() {
        this.start_render();
        // Update all children
        for (var child in this.children) {
            if (this.children[child] && this.children[child].render)
                this.children[child].render();
        }
        this.end_render();
    };

    /**
     *    updates the entity and it's children
     *
     *    @method
     */
    this.update = function() {
        // Update all children
        for (var child in this.children) {
            if (this.children[child] && this.children[child].update)
                this.children[child].update();
        }
    };

    /**
     *    checks whether entity has child with certain name.
     *
     *    @method
     *    @param  {String} name child name to check
     *    @return {Boolean}     true if has, false otherwise
     */
    this.hasOwnChild = function(name)
    {
        return this.children[name];
    };

    /**
     *    gets child by name (recursively)
     *
     *    @method
     *    @param  {String} name child name to check for
     *    @return {object}      the child if found; null otherwise.
     */
    this.getChild = function(name)
    {
        var e = this.hasOwnChild(name);
        if (e)
            return e;

        for (var child in this.children) {
            if (this.children.hasOwnProperty(child) && this.children[child].getChild) {
                var res = this.children[child].getChild(name);
                if (res)
                    return res;
            }
        }
    }

    /**
     *    gets child by index
     *
     *    @method
     *    @param  {Number} i the child index
     *    @return {object}   the child if found; null otherwise.
     */
    this.getChildAt = function(i)
    {
        return Object.values(this.children)[i];
    };

    /**
     *    gets component from name
     *
     *    @method
     *    @param  {String} compName component name to search for.
     *    @return {object}          the component if found; null otherwise.
     */
    this.getComponent = function(compName)
    {
        return this.getChild("[" + compName + "]");
    };

    /**
     *    gets built-in component by simplified name.
     *
     *    @method
     *    @param  {String} compName built-in component's simplified name (usually type in lowercases)
     *    @return {object}          built-in component if found; null otherwise.
     */
    this.getBuiltinComponent = function(compName)
    {
        return this.getComponent("builtin_" + compName);
    };

    /**
     *    gets component by type
     *
     *    @method
     *    @param  {Type} type the component's type (constructor name)
     *    @return {object}    the component if found; null otherwise.
     */
    this.getComponentOfType = function(type)
    {
        var name = Component.typeToName(type);
        var comp = this.getChild(name);
        if (!comp)
            comp = this.getBuiltinComponent(name);
        return comp;
    };

    /**
     *    checks whether a component of type is attached
     *
     *    @method
     *    @param  {Type} type component type to search for
     *    @return {Boolean}   true if component of type is attached; false otherwise.
     */
    this.hasComponentOfType = function(type)
    {
        var name = Component.typeToName(type);
        return (this.hasOwnChild(name) || this.hasOwnChild("[builtin_" + name+"]"));
    };

    /**
     *    adds component to entity
     *
     *    @method
     *    @param  {Type} comp type/constructor to add as component.
     */
    this.addComponent = function(comp)
    {
        var c = new comp(this);
        this.children[c.name] = c;
    };

    /**
     *    sets parent of current entity (make sure it's actually a child!)
     *
     *    @method
     *    @param  {Entity} entity parent entity
     */
    this.setParent = function(entity)
    {
        this.parent = entity;
    };

    /**
     *    clears current parent of entity (set to null)
     *
     *    @method
     */
    this.clearParent = function()
    {
        this.parent = null;
    };

    /**
     *    adds child to entity
     *
     *    @method
     *    @param  {String} name  child name
     *    @param  {object} child child, can be of any type; if present setParent() is called.
     */
    this.addChild = function(name, child)
    {
        if (child.setParent)
            child.setParent(this);
        else if (child.parent)
            child.parent = this;

        this.children[name] = child;
    };

    /**
     *    adds child with generated name
     *
     *    @method
     *    @param  {object} c the child object to add.
     */
    this.insertChild = function(c)
    {
        if (c.setParent)
            c.setParent(this);
        else if (c.parent)
            c.parent = this;
        this.children[this.getChildName()] = c;
    };

    /**
     *    gets global (recursive/world) transform.
     *
     *    @method
     *    @return {Vector2d} the global transform.
     */
    this.getGlobalTransform = function()
    {
        if (this.parent == null)
            return this.transform;
        return Transform.add(this.transform, this.parent.getGlobalTransform());
    };

    /**
     *    gets default shape from first shaped child (a child with width+height)
     *
     *    @method
     *    @return {Vector2d} default width height 2d vector from first shaped child.
     */
    this.getShapeByChild = function()
    {
        var shape = null;

        for (var childName in this.children) {
            if (this.children.hasOwnProperty(childName) && this.children[childName]) {
                var child = this.children[childName];
                if (child.width && child.height) {
                    shape = new Vector2d(child.width, child.height);
                    break;
                }

            }
        }

        if (shape != null)
            return shape;

        // wasn't found, return scale transform
        return new Vector2d(this.transform.scale.x, this.transform.scale.y);
    };

    /**
     *    generates child name (serial indexing)
     *
     *    @method
     *    @return {String} generated child name
     */
    this.getChildName = function()
    {
        return this.name + "." + this.max_cid++;
    };

    this.init = function()
    {
        this.name = name;
        this.alive = alive;
        this.max_cid = 0;
        this.parent = null;
        this.children = {};
        this.transform = new Transform(x, y);
        this.auto_physics = automated;
        this.auto_render = automated;
        this.auto_update = automated;
        this.game = game;
    };

    this.init();
}
