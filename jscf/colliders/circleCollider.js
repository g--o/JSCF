/**
 * @class
 * @classdesc   Circle collider class
 * @memberof    Colliders
 *
 * @param       {Number} _x x coordinate of the circle (center)
 * @param       {Number} _y y coordinate of the circle (center)
 * @param       {Number} _R the circle radius
 * @constructor
 */
function CircleCollider(_x, _y, _R)
{

    /**
     *    set the CircleCollider position from a transform.
     *
     *    @method
     *    @param  {Core.Transform} transform the transform to get position from
     */
	this.setTransform = function(transform) // for now ignores scale
	{
		this.pos = transform.pos;
	};

    /**
     *    checks whether CircleCollider contains a point.
     *
     *    @method
     *    @param  {Number} x the x position of the point to test.
     *    @param  {Number} y the y position of the point to test.
     *    @return {Boolean}   true if it contains the point, false otherwise.
     */
    this.containsPoint = function(x, y)
    {
		var pos = new Point2d(this.pos.x, this.pos.y);
		var point = new Point2d(x, y);
        return pos.distanceTo(point) <= this.R;
    };

    /**
     *    checks CircleCollider collision with other CircleCollider.
     *
     *    @method
     *    @param  {Colliders.CircleCollider}  other other CircleCollider to check collision against.
     *    @return {Boolean}         true if they collide, false otherwise.
     */
    this.isColliding = function(other)
    {
		return (Vector.subVector(this.pos - other.pos).length() <= (this.R + other.R));
    };

    /**
     *    calculates penetration vector with other CircleCollider. Assumes penetration itself.
     *
     *    @method
     *    @param  {Colliders.CircleCollider} other  other AABB to calculate penetration with.
     *    @return {Utils.Vector2d}    the penetration vector.
     */
	this.getPenetration = function(other)
	{
		var dp = this.pos.clone();
		dp.subVector(other.pos);

		var dx = Math.abs(Math.abs(dp.x) - (this.R + other.R)/2);
		var dy = Math.abs(Math.abs(dp.y) - (this.R + other.R)/2);

		return new Vector2d((dp.x > 0)?dx:-dx, (dp.y > 0)?dy:-dy);
	}


    /**
     *    calculates normal vector with other CircleCollider. Assumes penetration.
     *
     *    @method
     *    @param  {Colliders.CircleCollider} other    other CircleCollider to calculate normal with.
     *    @return {Utils.Vector2d}                the normal vector.
     */
    this.getNormal = function(other)
    {
		var pen = this.getPenetration(other);
		pen.normalize(); // non convex yay!

		return pen;
    };

	this.init = function(x, y, R)
	{
		this.pos = new Vector2d(x, y);
		this.R = R;
		this.type = "circle";

		this.reset();
	};

	this.init(_x, _y, _R);
}
