/**
 * @class
 * @classdesc Animation class
 * @memberof Graphics
 *
 * @param       {Core.Game} game          the game object
 * @param       {Graphics.Sprite} sprite      the sprite object to apply animation to
 * @param       {Number} frameWidth  the sprite tile frame width
 * @param       {Number} frameHeight the sprite tile frame height
 * @param       {Number} speed       the animation speed (relative to fps)
 * @constructor
 */
function Animation(game, sprite, frameWidth, frameHeight, speed)
{
    this.spr = sprite;
    this.frame = new AnimFrame(0, 0, frameWidth, frameHeight);

    /**
     *    current frame
     *
     *    @type {Number}
     */
    this.frameCounter = 0;

    /**
     *    sets the animation index (usually spritesheet row)
     *
     *    @method
     *    @param  {Number} i animation index
     */
    this.setAnimationIndex = function(i)
    {
        this.frame.setAnimationIndex(i, this.spr.image.height);
    };

    /**
     *    sets the animation frame index.
     *
     *    @method
     *    @param  {Number} i animation frame index
     */
    this.setFrameIndex = function(i)
    {
        this.frame.setFrameIndex(i, this.spr.image.width);
    };

    /**
     *    sets current to next animation
     *
     *    @method
     */
    this.nextAnimation = function()
    {
        this.frame.nextAnimation(this.spr.image.height);
    };

    /**
     *    sets current to next frame
     *
     *    @method
     */
    this.nextFrame = function()
    {
        this.frame.nextFrame(this.spr.image.width);
    };

    /**
     *    updates the current frame
     *
     *    @method
     */
    this.updateFrame = function()
    {
        this.frameCounter = (this.frameCounter + 1) % Math.floor(game.fps / speed);
        if (this.frameCounter == 0)
            this.nextFrame();
    };

    /**
     *    rendering the animaion
     *
     *    @method
     */
    this.render = function()
    {
        game.graphics.context.drawImage(this.spr.image,
            this.frame.px ,this.frame.py,
            this.frame.w, this.frame.h,
            this.spr.width/-2, this.spr.height/-2,
            this.spr.width, this.spr.height);
    };
}
