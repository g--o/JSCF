
function Rect(x, y, width, height, collDetectorType)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = 0;

    if (!collDetectorType)
        collDetectorType = "box";

    this.type = collDetectorType;

    this.containsPoint = function(x, y)
    {
        return ((x > this.x - this.width/2) && (x < this.x + this.width/2)) && ((y > this.y - this.height/2) && (y < this.y + this.height/2));
    };

    this.isColliding = function(otherRect)
    {
        var detector = CollDetectors[collDetectorType];
        if (detector) {
            return detector(this, otherRect);
        } else {
            console.warn("[JSCF] invalid detector was given to rect object!");
            return false;
        }
    };

    this.getNormal = function(otherRect)
    {
        let rect1 = this;
        let rect2 = otherRect;

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


        var dx = rect1.x - rect2.x;
        var dy = rect1.y - rect2.y;

        if (dx > 0) {
            var px = xMax1 - xMax2;
            var py = (dy > 0)?(yMin1-yMax2):(yMax1-yMin2);
            if (px > py)
                return new Vector2d(1,0);
            else
                return new Vector2d(0,1);
        } else {
            var px = xMax1 - xMax2;
            var py = (dy > 0)?(yMin1-yMax2):(yMax1-yMin2);
            if (px > py)
                return new Vector2d(-1,0);
            else
                return new Vector2d(0,-1);
        }
        if((this.x - otherRect.x) > (this.y - otherRect.y)) // X TEST
            return new Vector2d((this.x > otherRect.x)?-1:1,0);
        else
            return new Vector2d(0, (this.y > otherRect.y)?-1:1);
    };
}
