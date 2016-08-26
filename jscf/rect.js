
function Rect(game, x, y, width, height, collDetectorType)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = 0;

    if (!collDetectorType)
        collDetectorType = "box";

    this.render = function()
    {
        var ctx = game.graphics.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        game.graphics.context.fillRect(this.width / -2, this.height / -2, this.width, this.height);

        ctx.restore();
    };

    this.containsPoint = function(x, y)
    {
        return ((x > this.x) && (x < this.x + this.width)) && ((y > this.y) && (y < this.y + this.height));
    };

    this.isColliding = function(otherRect)
    {
        var detector = CollDetectors[collDetectorType];
        if (detector) {
            return detector(this, otherRect);
        } else {
            console.warn("[JSCF] invalid detector was given to rect object!");
            return false;
        }
    };
}
