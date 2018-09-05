/**
 * @class
 * @classdesc A rectangular wire graphic
 * @memberof Graphics
 *
 * @param {Core.Game} game  the game object.
 * @param {Number} width    width of the rectangle.
 * @param {Number} height   height of the rectangle.
 * @param {String} color    color/style of 2d context.
 * @constructor
 */
function Rectangle(game, width, height, color)
{
    this.width = width;
    this.height = height;
    this.color = color;

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
     *    renders the rectangle
     *
     *    @method
     */
    this.render = function()
    {
        ctx = game.graphics.context;

		ctx.strokeStyle = color;
        ctx.strokeRect(this.width / -2, this.height / -2, this.width, this.height);
    };
}
