
const __EPSILON = 1e-8;

/**
 * An object that is used as a static class for math utilities.
 */
var MathUtils = {

    toRad : function(deg)
    {
        return deg*Math.PI/180.0;
    },

    square : function(n)
    {
        return n*n;
    },

    greaterThan: function(a,b)
    {
        return a-b >= __EPSILON;
    },

    lesserThan: function(a,b)
    {
        return MathUtils.greaterThan(b,a);
    },

    sign: function(n)
    {
        return n/Math.abs(n);
    }
};
