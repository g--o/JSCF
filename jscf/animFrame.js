
/**
 * @class
 * @classdesc the animation frame class
 *
 * @param       {Number} px the frame x position
 * @param       {Number} py the frame y position
 * @param       {Number} w  the frame width
 * @param       {Number} h  the frame height
 * @constructor
 */
function AnimFrame(px, py, w, h)
{
    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;

    this.getAnimationIndex = function()
    {
        return this.px / this.w;
    };

    this.getFrameIndex = function()
    {
        return this.py / this.h;
    };

    this.setAnimationIndex = function(i, max_height)
    {
        this.py = (this.py + this.h * i) % max_height;
    };

    this.setFrameIndex = function(i, max_width)
    {
        this.px = (i * this.w) % max_width;
    };

    this.nextAnimation = function(max_height)
    {
        this.py = (this.py + this.h) % max_height;
    };

    this.nextFrame = function(max_width)
    {
        this.px =  (this.px + this.w) % max_width;
    };
}
