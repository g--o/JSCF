
function resolveSprDimentions(spr)
{
    if (!spr)
        return null;
    if(spr.width && spr.height) {
        return new Point2d(spr.width, spr.height);
    } else if(spr.spr){
        return resolveSprDimentions(spr.spr);
    } else {
        return null;
    }
}

function Entity(name, alive, x, y, spr, automated)
{
    this.init = function()
    {
        var w, h;
        // resolve sprite dimentions recursively in case we're using nested
        // [inheritence-dependent] sprites.
        var p = resolveSprDimentions(spr);
        if(p)
            w = p.getX(), h = p.getY();
        else
            w = 0, h = 0;

        this.rect = new Rect(x, y, w, h);
        this.name = name;
        this.alive = alive;
        this.spr = spr;
        this.auto_physics = automated;
        this.auto_render = automated;
        this.auto_update = automated;
    };

    this.init();

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
        this.spr.render();
        this.end_update();
    };

    this.update = function() {
        if (this.spr.update)
            this.spr.update();
    };
}
