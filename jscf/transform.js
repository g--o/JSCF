
/**
 * @class
 * @classdesc the transform class
 *
 * @param       {Number} x      the x coordinate
 * @param       {Number} y      the y coordinate
 * @param       {Number} xscale the x-axis (horizontal) scaling
 * @param       {Number} yscale the y-axis (vertical) scaling
 * @constructor
 */
function Transform(x, y, xscale, yscale)
{
    x = x?x:0, y = y?y:0;
    xscale = xscale?xscale:1, yscale = yscale?yscale:1;

    // position
    this.pos = new Vector2d(x, y);
    // scaling
    this.scale = new Vector2d(xscale, yscale);
    // rotating
    this.angle = 0;
}

Transform.add = function(t1, t2)
{
    t = new Transform();
    t.pos = Vector.addVector(t1.pos, t2.pos);
    t.scale = new Vector2d(t1.scale.x * t2.scale.x, t1.scale.y * t2.scale.y);
    t.angle = t1.angle + t2.angle;

    return t;
};
