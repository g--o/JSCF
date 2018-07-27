
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

    /**
     *    get current animation index
     *
     *    @method
     *    @return {Number} current animation index
     */
    this.getAnimationIndex = function()
    {
        return this.px / this.w;
    };

    /**
     *    get current frame index
     *
     *    @method
     *    @return {Number} current frame index
     */
    this.getFrameIndex = function()
    {
        return this.py / this.h;
    };

    /**
     *    set animation index
     *
     *    @method
     *    @param  {Number} i          animation index to set
     *    @param  {Number} max_height the maximum height of the spritesheet
     */
    this.setAnimationIndex = function(i, max_height)
    {
        this.py = (this.py + this.h * i) % max_height;
    };

    /**
     *    set frame index
     *
     *    @method
     *    @param  {Number} i          frame index to set
     *    @param  {Number} max_width the maximum width of the spritesheet
     */
    this.setFrameIndex = function(i, max_width)
    {
        this.px = (i * this.w) % max_width;
    };

    /**
     *    sets the current to next animation
     *
     *    @method
     *    @param  {Number} max_height the maximum height of the spritesheet
     */
    this.nextAnimation = function(max_height)
    {
        this.py = (this.py + this.h) % max_height;
    };

    /**
     *    sets the current to next frame
     *
     *    @method
     *    @param  {Number} max_width the maximum width of the spritesheet
     */
    this.nextFrame = function(max_width)
    {
        this.px =  (this.px + this.w) % max_width;
    };
}
