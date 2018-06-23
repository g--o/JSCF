
function AABB(_x, _y, _width, _height)
{

	this.setTransform = function(transform) // for now ignores scale
	{
		this.pos = transform.pos;
		this.reset();
	};

    this.containsPoint = function(x, y)
    {
        return ((x > this.xMin) && (x < this.xMax)) &&
				((y < this.yMax) && (y > this.yMin));
    };

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

    this.getNormal = function(other)
    {
		var pen = this.getPenetration(other);
		pen.normalize(); // non convex yay!

		return pen;
    };

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
