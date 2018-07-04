
/**
 * Point2d
 * @param       {Number} _x0 the x coordinate
 * @param       {Number} _y0 the y coordinate
 * @constructor
 */
function Point2d(_x0, _y0)
{
    this.vec = new Vector2d(_x0, _y0);

    /**
     *    distance to another point
     *
     *    @method
     *    @param  {Point2d} other   point to measure distance to
     *    @return {Number}          the distance between the points
     */
    this.distanceTo = function(other) {
        return Vector.subVector(this.vec, other.vec).length();
    };

    /**
     *    sets x position
     *
     *    @method
     *    @param  {Number} x new x position
     */
    this.setX = function(x) {
        this.vec.x = x;
    };

    /**
     *    sets y position
     *
     *    @method
     *    @param  {Number} y new y position
     */
    this.setY = function(y) {
        this.vec.y = y;
    };

    /**
     *    gets x position
     *
     *    @method
     *    @return {Number} current x position of point
     */
    this.getX = function() {
        return this.vec.x;
    };

    /**
     *    gets y position
     *
     *    @method
     *    @return {Number} current y position of point
     */
    this.getY = function() {
        return this.vec.y;
    };
}
