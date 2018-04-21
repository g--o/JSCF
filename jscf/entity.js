
function Entity(name, alive, x, y, automated)
{
    this.start_render = function()
    {
        var ctx = game.graphics.context;

        ctx.save();
        ctx.translate(this.rect.x, this.rect.y);
        ctx.rotate(this.rect.angle);
    };

    this.end_update = function()
    {
        game.graphics.context.restore();
    };

    this.render = function() {
        this.start_render();
        // Update all children
        for (var child in this.children) {
            if (this.children.hasOwnProperty(child) && this.children[child].render)
                this.children[child].render();
        }
        this.end_update();
    };

    this.update = function() {
        // Update all children
        for (var child in this.children) {
            if (this.children.hasOwnProperty(child) && this.children[child].update)
                this.children[child].update();
        }
    };

    this.getChild = function(name)
    {
        var e = this.children[name];
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

    this.AddShapedChild = function(name, child)
    {
        this.children[name] = child;
        if (child.width && child.height) {
            this.rect.width = child.width;
            this.rect.height = child.height;
        }
    }

    this.getDefaultRect = function()
    {
        // Set default width & height as width & height of first component
        var w, h;
        var firstChild = this.getChildAt(0);
        if (firstChild && firstChild.width && firstChild.height)
            w = firstChild.width, h = firstChild.height;
        else
            w = 0, h = 0;

        return new Rect(x, y, w, h);
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
        this.children = {};
        this.rect = this.getDefaultRect();
        this.auto_physics = automated;
        this.auto_render = automated;
        this.auto_update = automated;
    };

    this.init();
}
