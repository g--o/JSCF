
function Vector2d(x, y)
{
    this.x = x;
    this.y = y;

    this.add = function(ax, ay)
    {
        this.x += ax;
        this.y += ay;

        return this;
    };

    this.sub = function(ax, ay)
    {
        return this.add(-ax, -ay);
    };

    this.addVector = function(vec)
    {
        return this.add(vec.x, vec.y);
    };

    this.subVector = function(vec)
    {
        return this.sub(vec.x, vec.y);
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

    this.makeArray = function()
    {
        return [this.x, this.y];
    };

    this.clone = function() {
        return new Vector2d(this.x, this.y);
    };
};

const Vector = {

    addVector : function(vec1, vec2)
    {
        return vec1.clone().addVector(vec2);
    },
    subVector : function(vec1, vec2)
    {
        return vec1.clone().subVector(vec2);
    }
};
