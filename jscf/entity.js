
function Entity(game, name, alive, x, y, automated)
{
    this.start_render = function()
    {
        var ctx = game.graphics.context;

        ctx.save();
        ctx.translate(this.transform.pos.x, this.transform.pos.y);
        ctx.rotate(this.transform.angle);
        ctx.scale(this.transform.scale.x, this.transform.scale.y);
    };

    this.end_render = function()
    {
        game.graphics.context.restore();
    };

    this.render = function() {
        this.start_render();
        // Update all children
        for (var child in this.children) {
            if (this.children[child] && this.children[child].render)
                this.children[child].render();
        }
        this.end_render();
    };

    this.update = function() {
        // Update all children
        for (var child in this.children) {
            if (this.children[child] && this.children[child].update)
                this.children[child].update();
        }
    };

    this.hasOwnChild = function(name)
    {
        return this.children[name];
    };

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

    this.getChildAt = function(i)
    {
        return Object.values(this.children)[i];
    };

    this.getComponent = function(compName)
    {
        return this.getChild("[" + compName + "]");
    };

    this.getBuiltinComponent = function(compName)
    {
        return this.getComponent("builtin_" + compName);
    };

    this.getComponentOfType = function(type)
    {
        var name = Component.typeToName(type);
        var comp = this.getChild(name);
        if (!comp)
            comp = this.getBuiltinComponent(name);
        return comp;
    };

    this.hasComponentOfType = function(type)
    {
        var name = Component.typeToName(type);
        return (this.hasOwnChild(name) || this.hasOwnChild("[builtin_" + name+"]"));
    };

    this.addComponent = function(comp)
    {
        var c = new comp(this);
        this.children[c.name] = c;
    };

    this.setParent = function(entity)
    {
        this.parent = entity;
    };

    this.clearParent = function()
    {
        this.parent = null;
    };

    this.addChild = function(name, child)
    {
        if (child.setParent)
            child.setParent(this);
        else if (child.parent)
            child.parent = this;

        this.children[name] = child;
    };

    this.insertChild = function(c)
    {
        if (c.setParent)
            c.setParent(this);
        else if (c.parent)
            c.parent = this;
        this.children[this.getChildName()] = c;
    };

    this.getGlobalTransform = function()
    {
        if (this.parent == null)
            return this.transform;
        return Transform.add(this.transform, this.parent.getGlobalTransform());
    };

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
