
function Rect(x, y, width, height, collDetectorType)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = 0;

    if (!collDetectorType)
        collDetectorType = "box";

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
}
