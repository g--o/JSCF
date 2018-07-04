
/**
 * @class
 * @classdesc text graphic class
 *
 * @param       {Game} game    the game object
 * @param       {String} txt   the text itself (destined to be rendered)
 * @param       {String} style 2d context styling (can be just color)
 * @param       {String} font  2d cotext font description
 * @constructor
 */
function Text(game, txt, style, font)
{
	this.txt = txt;
	this.style = style;
	this.font = font;

    /**
     *    get the dimentions of text element if to be rendered.
     *
     *    @method
     *    @return {TextMetrics} 2d context object that contains the desired width & height properties.
     */
	this.getDimentions = function()
	{
		var ctx = game.graphics.context;
		ctx.font = this.font;
		return ctx.measureText(txt);
	};

    /**
     *    renders the text element
     *
     *    @method
     */
    this.render = function()
    {
		var lineheight = 20;
		var lines = String(this.txt).split('\n');

		for (var i = 0; i < lines.length; i++)
		    game.renderText(0, i * lineheight, lines[i], this.style, this.font);
    };
}
