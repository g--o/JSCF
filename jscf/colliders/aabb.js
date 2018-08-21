/**
 * @class
 * @classdesc   Axis-Aligned Bounding Box
 * @memberof    Colliders
 *
 * @param       {Number} _x      x position of the AABB
 * @param       {Number} _y      y position of the AABB
 * @param       {Number} _width  width position of the AABB
 * @param       {Number} _height height position of the AABB
 *
 * @constructor
 */
function AABB(_x, _y, _width, _height)
{

    /**
     *    set the AABB position from a transform.
     *
     *    @method
     *    @param  {Core.Transform} transform the transform to get position from
     */
	this.setTransform = function(transform) // for now ignores scale
	{
		this.pos = transform.pos;
		this.reset();
	};

    /**
     *    checks whether AABB contains a point.
     *
     *    @method
     *    @param  {Number} x the x position of the point to test.
     *    @param  {Number} y the y position of the point to test.
     *    @return {Boolean}   true if it contains the point, false otherwise.
     */
    this.containsPoint = function(x, y)
    {
        return ((x > this.xMin) && (x < this.xMax)) &&
				((y < this.yMax) && (y > this.yMin));
    };

    /**
     *    checks AABB collision with other AABB.
     *
     *    @method
     *    @param  {Colliders.AABB} other other AABB to check collision against.
     *    @return {Boolean}    true if they collide, false otherwise.
     */
    this.isColliding = function(other)
    {
		// apply SAT
		if (this.xMin < other.xMax &&
			this.xMax > other.xMin &&
			this.yMin < other.yMax &&
			this.yMax > other.yMin) {
			return true;
		}

		return false;
    };

    /**
     *    calculates penetration vector with other AABB. Assumes penetration itself.
     *
     *    @method
     *    @param  {Colliders.AABB} other  other AABB to calculate penetration with.
     *    @return {Utils.Vector2d}    the penetration vector.
     */
	this.getPenetration = function(other)
	{
		var dp = this.pos.clone();
		dp.subVector(other.pos);

		var dx = Math.abs(Math.abs(dp.x) - (this.dims.x + other.dims.x)/2);
		var dy = Math.abs(Math.abs(dp.y) - (this.dims.y + other.dims.y)/2);

		if (dx < dy)
			return new Vector2d((dp.x > 0)?dx:-dx, 0);
		else
			return new Vector2d(0, (dp.y > 0)?dy:-dy);
	}

    /**
     *    calculates normal vector with other AABB. Assumes penetration.
     *
     *    @method
     *    @param  {Colliders.AABB} other  other AABB to calculate normal with.
     *    @return {Utils.Vector2d}    the normal vector.
     */
    this.getNormal = function(other)
    {
		var pen = this.getPenetration(other);
		pen.normalize(); // non convex yay!

		return pen;
    };

    /**
     *    re-sets the AABB (updates min max axis points)
     *
     *    @method
     */
	this.reset = function()
	{
		// extract points from rect
		this.xMin = this.pos.x - this.dims.x/2;
		this.yMin =  this.pos.y - this.dims.y/2;
		// calculate min and max points
		this.xMax = this.xMin + this.dims.x;
		this.yMax = this.yMin + this.dims.y;
	};

	this.init = function(x, y, w, h)
	{
		this.pos = new Vector2d(x, y);
		this.dims = new Vector2d(w, h);
		this.type = "aabb";

		this.reset();
	};

	this.init(_x, _y, _width, _height);
}
