
var CollDetectors = {
    circle : function(circle1, circle2)
    {
        return ((circle1.center - circle2.center) <= (cricle1.R + circle2.R));
    },

    box : function(rect1, rect2)
    {
        
    }
};
