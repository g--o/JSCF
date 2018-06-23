
function Text(game, txt, style, font)
{
	this.txt = txt;
	this.style = style;
	this.font = font;

	this.getDimentions = function()
	{
		var ctx = game.graphics.context;
		ctx.font = this.font;
		return ctx.measureText(txt);
	};

    this.render = function()
    {
		var lineheight = 20;
		var lines = String(this.txt).split('\n');

		for (var i = 0; i < lines.length; i++)
		    game.renderText(0, i * lineheight, lines[i], this.style, this.font);
    };
}
