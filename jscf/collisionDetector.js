
var CollDetectors = {
    circle : function(circle1, circle2)
    {
        return ((circle1.center - circle2.center) <= (cricle1.R + circle2.R));
    },

    box : function(rect1, rect2)
    {
        // extract points from rect
        var xMin1 = rect1.x - rect1.width/2;
        var xMin2 = rect2.x - rect2.width/2;
        var yMin1 =  rect1.y - rect1.height/2;
        var yMin2 = rect2.y - rect2.height/2;

        // calculate min and max points
        var xMax1 = xMin1 + rect1.width;
        var xMax2 = xMin2 + rect2.width;
        var yMax1 = yMin1 + rect1.height;
        var yMax2 = yMin2 + rect2.height;

        // apply SAT
        if (xMin1 < xMax2 &&
            xMax1 > xMin2 &&
            yMin1 < yMax2 &&
            yMax1 > yMin2) {
            return true;
        }

        return false;
    }
};
