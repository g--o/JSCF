/**
 * @class
 * @classdesc A rectangular-shaped graphic
 * @memberof Graphics
 *
 * @param {Core.Game} game       the game object.
 * @param {Number} width    width of the plane.
 * @param {Number} height   height of the plane.
 * @param {String} color    color/style of 2d context.
 * @constructor
 */
function Plane(game, width, height, color)
{
    this.width = width;
    this.height = height;
    this.color = color;
    this.effect = null;

    /**
     *    sets width & height
     *
     *    @method
     *    @param  {Number} w width to set
     *    @param  {Number} h height to set
     */
    this.setDimentions = function(w, h)
    {
        if (w > 0)
            this.width = w;
        if (h > 0)
            this.height = h;
    };

    /**
     *    get width & height
     *
     *    @method
     *    @return {Utils.Vector2d} vector2d of (width, height)
     */
    this.getDimentions = function()
    {
        return new Vector2d(this.width, this.height);
    };

    /**
     *    renders the plane
     *
     *    @method
     */
    this.render = function()
    {
        ctx = game.graphics.context;

        if (this.effect)
            this.effect.pre_render(ctx);

        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);

        if (this.effect)
            this.effect.post_render(ctx);
    };
}
