
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
	this.txt = "";
	this.style = style;
	this.font = font;
    this.lines = [];
    this.maxWidth = 0;
    this.maxHeight = 20;
    this.lineMargin = 5;

    /**
     *    sets the text to display
     *
     *    @method
     *    @param  {String} txt the text to display
     */
    this.setText = function(txt)
    {
        this.txt = txt;
        this.lines = String(this.txt).split('\n');

        var ctx = game.graphics.context;
        ctx.font = this.font;

        for (var i = 0; i < this.lines.length; i++) {
            var width = ctx.measureText(this.lines[i]).width;
            this.maxWidth = Math.max(this.maxWidth, width);
        }

        this.maxHeight = parseInt(ctx.font.match(/\d+/), 10) + this.lineMargin;
    };

    /**
     *    get the dimentions of text element if to be rendered.
     *
     *    @method
     *    @return {TextMetrics} 2d context object that contains the desired width & height properties.
     */
	this.getDimentions = function()
	{
		return new Vector2d(this.maxWidth, this.maxHeight);
	};

    this.setDimentions = function (w, h)
    {

    };

    /**
     *    renders the text element
     *
     *    @method
     */
    this.render = function()
    {
        var dims = this.getDimentions();

		for (var i = 0; i < this.lines.length; i++)
		    game.renderText(-dims.x/2, i * dims.y, this.lines[i], this.style, this.font);
    };

    this.init = function()
    {
        this.setText(txt);
    };

    this.init();
}
