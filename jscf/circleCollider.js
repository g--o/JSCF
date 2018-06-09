
function CircleCollider(_x, _y, _R)
{

	this.setTransform = function(transform) // for now ignores scale
	{
		this.pos = transform.pos;
	};

    this.containsPoint = function(x, y)
    {
		var pos = new Point2d(this.pos.x, this.pos.y);
		var point = new Point2d(x, y);
        return pos.distanceTo(point) <= this.R;
    };

    this.isColliding = function(other)
    {
		return (Vector.subVector(this.pos - other.pos).length() <= (this.R + other.R));
    };

	this.getPenetration = function(other)
	{
		var dp = this.pos.clone();
		dp.subVector(other.pos);

		var dx = Math.abs(Math.abs(dp.x) - (this.R + other.R)/2);
		var dy = Math.abs(Math.abs(dp.y) - (this.R + other.R)/2);

		return new Vector2d((dp.x > 0)?dx:-dx, (dp.y > 0)?dy:-dy);
	}

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
