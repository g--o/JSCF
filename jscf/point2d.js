
/**
 * Point2d
 * @param       {Number} _x0 the x coordinate
 * @param       {Number} _y0 the y coordinate
 * @constructor
 */
function Point2d(_x0, _y0)
{
    this.vec = new Vector2d(_x0, _y0);

    this.distanceTo = function(other) {
        return Vector.subVector(this.vec, other.vec).length();
    };

    this.setX = function(x) {
        this.vec.x = x;
    };

    this.setY = function(y) {
        this.vec.y = y;
    };

    this.getX = function() {
        return this.vec.x;
    };

    this.getY = function() {
        return this.vec.y;
    };
}
