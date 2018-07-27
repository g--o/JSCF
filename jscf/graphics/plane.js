
/**
 * @class
 * @classdesc A rectangular-shaped graphic
 *
 * @param {Game} game       the game object.
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