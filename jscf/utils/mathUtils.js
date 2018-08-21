
/**
 *    an epsilon to consider when using float calculations
 *    @memberof Utils
 *
 *    @type {Number}
 */
const __EPSILON = 1e-8;

/**
 * An object that is used as a static class for math utilities.
 * @namespace
 * @memberof Utils
 */
var MathUtils = {

    /**
     *    converts degrees to radians
     *
     *    @method
     *    @param  {Number} deg the angle in degrees
     *    @return {Number}     the corresponding radians to the angle.
     */
    toRad : function(deg)
    {
        return deg*Math.PI/180.0;
    },

    /**
     *    squares a number
     *
     *    @method
     *    @param  {Number} n the number to square
     *    @return {Number}   the squared number
     */
    square : function(n)
    {
        return n*n;
    },

    /**
     *    floating point ">=" checking against _EPSILON (see: _EPSILON)
     *
     *    @method
     *    @param  {Number} a floating point number
     *    @param  {Number} b floating point number
     *    @return {Boolean}  true if abs(a-b) >= _EPSILON; false otherwise
     */
    greaterThan: function(a,b)
    {
        return Math.abs(a-b) >= __EPSILON;
    },

    /**
     *    floating point "<" checking against _EPSILON (see: _EPSILON)
     *
     *    @method
     *    @param  {Number} a floating point number
     *    @param  {Number} b floating point number
     *    @return {Boolean}  true if abs(a-b) < _EPSILON; false otherwise
     */
    lesserThan: function(a,b)
    {
        return MathUtils.greaterThan(b,a);
    },

    /**
     *    gets number sign
     *
     *    @method
     *    @param  {Number} n the number
     *    @return {Number}   0 if n is 0; 1 if n > 0; -1 otherwise
     */
    sign: function(n)
    {
        if (n == 0)
            return 0;
        return n/Math.abs(n);
    }
};
