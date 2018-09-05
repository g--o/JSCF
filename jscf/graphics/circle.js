/**
 * @class
 * @classdesc A circular graphic
 * @memberof Graphics
 *
 * @param {Core.Game} game  the game object.
 * @param {Number} radius   radius of the circle.
 * @param {String} color    color/style of 2d context.
 * @constructor
 */
function Circle(game, radius, color)
{
    this.radius = radius;
    this.color = color;

    /**
     *    sets width & height
     *
     *    @method
     *    @param  {Number} w radius to set
     *    @param  {Number} h radius to set
     */
    this.setDimentions = function(w, h)
    {
        if (w > 0)
            this.radius = w;
        if (h > 0)
            this.radius = h;
    };

    /**
     *    get width & height
     *
     *    @method
     *    @return {Utils.Vector2d} vector2d of (width, height)
     */
    this.getDimentions = function()
    {
        return new Vector2d(this.radius, this.radius);
    };

    /**
     *    renders the circle
     *
     *    @method
     */
    this.render = function()
    {
        ctx = game.graphics.context;

		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
		ctx.fill();
    };
}
