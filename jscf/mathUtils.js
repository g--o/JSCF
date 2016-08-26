
var MathUtils = {

    toRad : function(deg)
    {
        return deg*Math.PI/180.0;
    },

    square : function(n)
    {
        return n*n;
    }
};

function Vector2d(x, y)
{
    this.x = x;
    this.y = y;

    this.add = function(ax, ay)
    {
        this.x += ax;
        this.y += ay;
    };

    this.sub = function(ax, ay)
    {
        return add(-ax, -ay);
    };

    this.addVector = function(vec)
    {
        return add(vec.x, vec.y);
    };

    this.subVector = function(vec)
    {
        return sub(vec.x, vec.y);
    };

    this.length = function()
    {
        return Math.sqrt(MathUtils.square(this.x) + MathUtils.square(this.y));
    };

    this.getNormal = function()
    {
        var length = this.length();
        if (length != 0)
            return new Vector2d(this.x /length, this.y / length);
        else
            return new Vector2d(0, 0);
    };

    this.normalize = function()
    {
        var len = this.length();
        this.x /= len;
        this.y /= len;
    };

    this.dotProduct = function(vec)
    {
        return this.x * vec.x + this.y * vec.y;
    };
}
