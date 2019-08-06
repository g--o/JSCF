
/**
 * @class
 * @classdesc the vector handling class
 * @memberof Utils
 *
 * @param       {Number} x the x coordinate (defaults to 0)
 * @param       {Number} y the y coordinate (defaults to 0)
 * @constructor
 */
function Vector2d(x, y)
{
    this.x = x ? x : 0;
    this.y = y ? y : 0;

    // Easy access

    /**
     *    adds by scalars
     *
     *    @method
     *    @param  {Number} ax scalar to add to x component
     *    @param  {Number} ay scalar to add to y component
     *    @return {Utils.Vector2d}  the updated vector
     */
    this.add = function(ax, ay)
    {
        this.x += ax;
        this.y += ay;

        return this;
    };


    /**
     *    subs by scalars
     *
     *    @method
     *    @param  {Number} ax scalar to sub to x component
     *    @param  {Number} ay scalar to sub to y component
     *    @return {Utils.Vector2d}  the updated vector
     */
    this.sub = function(ax, ay)
    {
        return this.add(-ax, -ay);
    };

    // Scalar stuff


    /**
     *    adds a scalar to both components.
     *
     *    @method
     *    @param  {Number} d    scalar to add
     *    @return {Utils.Vector2d}    the updated vector
     */
    this.scalarAdd = function(d)
    {
        return this.add(d, d);
    };

    /**
     *    subtracts a scalar to both components.
     *
     *    @method
     *    @param  {Number} d    scalar to subtract
     *    @return {Utils.Vector2d}    the updated vector
     */
    this.scalarSub = function(d)
    {
        return this.sub(d, d);
    };

    /**
     *    multiplies by scalar
     *
     *    @method
     *    @param  {Number} scalar   scalar to multiply by
     *    @return {Utils.Vector2d}        the updated vector
     */
    this.scalarMul = function(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
    };

    /**
     *    divides by scalar
     *
     *    @method
     *    @param  {Number} scalar   scalar to divide by
     *    @return {Utils.Vector2d}        the updated vector
     */
    this.scalarDiv = function(scalar)
    {
        if (scalar == 0)
            return;
        this.x /= scalar;
        this.y /= scalar;
    };

    // Vector - vector operations

    /**
     *    adds another vector
     *
     *    @method
     *    @param  {Utils.Vector2d} vec vector to add to this vector
     *    @return {Utils.Vector2d}        the updated vector
     */
    this.addVector = function(vec)
    {
        return this.add(vec.x, vec.y);
    };

    /**
     *    subtracts another vector
     *
     *    @method
     *    @param  {Utils.Vector2d} vec    vector to sub from this vector
     *    @return {Utils.Vector2d}        the updated vector
     */
    this.subVector = function(vec)
    {
        return this.sub(vec.x, vec.y);
    };

    /**
     *    dot product by another vector
     *
     *    @method
     *    @param  {Vector2d} vec    another vector to dot product by
     *    @return {Number}          the dot product
     */
    this.dotProduct = function(vec)
    {
        return this.x * vec.x + this.y * vec.y;
    };

    // Other vector operations

    /**
     *    get the length of this vector
     *
     *    @method
     *    @return {Number} the length of the vector
     */
    this.length = function()
    {
        return Math.sqrt(MathUtils.square(this.x) + MathUtils.square(this.y));
    };

    /**
     *    gets the normalized vector as new vector
     *
     *    @method
     *    @return {Utils.Vector2d} the normalized vector
     */
    this.getNormal = function()
    {
        var length = this.length();
        if (length != 0)
            return new Vector2d(this.x /length, this.y / length);
        else
            return new Vector2d(0, 0);
    };

    /**
     *    normalize the vector
     *
     *    @method
     */
    this.normalize = function()
    {
        var len = this.length();
        if (!len) {
            this.x = 0, this.y = 0;
            return;
        }
        this.x /= len;
        this.y /= len;
    };

    /**
     *    converts the vector to an array of components
     *
     *    @method
     *    @return {Array} array of the vector's components
     */
    this.makeArray = function()
    {
        return [this.x, this.y];
    };

    /**
     *    clones the vector
     *
     *    @method
     *    @return {Utils.Vector2d} copy of the vector
     */
    this.clone = function() {
        return new Vector2d(this.x, this.y);
    };
};

/**
 * Vector static-like class to allow access to vector utilities.
 */
const Vector = {

    /**
     *    adds two vectors and returns the sum in new vector
     *
     *    @method
     *    @param  {Utils.Vector2d} vec1 a vector to add
     *    @param  {Utils.Vector2d} vec2 a vector to add
     *    @return {Utils.Vector2d}      new summed vector
     */
    addVector : function(vec1, vec2)
    {
        return vec1.clone().addVector(vec2);
    },

    /**
     *    subtracts first vector from second and returns the subtracted in new vector
     *
     *    @method
     *    @param  {Utils.Vector2d} vec1 vector to sub from
     *    @param  {Utils.Vector2d} vec2 vector to sub
     *    @return {Utils.Vector2d}      new subtracted vector
     */
    subVector : function(vec1, vec2)
    {
        return vec1.clone().subVector(vec2);
    }
};

Vector2d.prototype.toString = function() {
    return [this.x, this.y].toString();
};
