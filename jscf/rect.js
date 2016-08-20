
function Rect(game, x, y, width, height)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = 0;

    this.render = function()
    {
        var ctx = game.graphics.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        game.graphics.context.fillRect(this.width / -2, this.height / -2, this.width, this.height);

        ctx.restore();
    };

    this.isColliding = function(rect)
    {
        var x1 = this.x - this.width/2;
        var x2 = rect.x - rect.width/2;
        var y1 =  this.y - this.height/2;
        var y2 = rect.y - rect.height/2;

        if (x1 < x2 + rect.width &&
        x1 + this.width > x2 &&
        y1 > y2 - rect.height &&
        -this.height + this.y < y2) {
            return true;
        }

        return false;
    }

}

function Plane(game, x, y, width, height, color)
{
    this.rect = new Rect(game, x, y, width, height);

    this.render = function()
    {
        ctx = game.graphics.context;
        ctx.fillStyle = color;

        this.rect.render();
    };
}
