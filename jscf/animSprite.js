
/**
 * Animated Sprite class
 * @param       {Game} game             the game object
 * @param       {Number} width          the sprite width
 * @param       {Number} height         the sprite height
 * @param       {String} url            URL to the resource
 * @param       {Number} frameWidth     sprite frame tile width
 * @param       {Number} frameHeight    sprite frame tile height
 * @param       {Number} animSpeed      animation speed - relative to fps. (keeps time constant)
 * @note
 * @constructor
 */
function AnimSprite(game, width, height, url, frameWidth, frameHeight, animSpeed)
{
    this.spr = new Sprite(game, width, height, url);
    this.anim = new Animation(game, this.spr, frameWidth, frameHeight, animSpeed);
    this.interval = null;

    /**
     *    starts playing the animation
     *
     *    @method
     */
    this.startAnimation = function()
    {
        var that = this;
        if (this.interval == null)
            this.interval = setInterval(function() { that.anim.nextFrame() } , (1 / animSpeed) * 1000);
        else
            console.warn("JSCF: [startAnimation] animation already started!");
    };

    /**
     *    stops playing the animation.
     *
     *    @method
     */
    this.stopAnimation = function()
    {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    /**
     *    updates the animation.
     *
     *    @method
     */
    this.updateAnim = function()
    {
        this.anim.updateFrame();
    };

    /**
     *    renders the sprite with the animation.
     *
     *    @method
     */
    this.render = function()
    {
        this.anim.render();
    };

    /**
     *    renders the sprite statically (disregards the animation)
     *
     *    @method
     */
    this.staticRender = function()
    {
        this.spr.render();
    };
}
