
/**
 * @class
 * @classdsc textbox graphic class
 *
 * @param       {Entity} parent entity to attach to
 * @param       {Number} w      the width
 * @param       {Number} h      the height
 * @param       {String} txt    the default text to display (defaults to "")
 * @constructor
 */
function Textbox(parent, w, h, txt)
{
	const TEXT_HEIGHT_RATIO = 0.8;
    const WIDTH_ERR_RATE = .97;
    const HEIGHT_ERR_RATE = .5;

	this.parent = parent;
	this.textBox = new CanvasInput({
		canvas: parent.game.graphics.canvas,
		width: w,
		height: h,
		value: txt?txt:"",
		fontSize: h * TEXT_HEIGHT_RATIO,
		borderRadius: 0,
		innerShadow: "0px 0px 0px #fff",
		borderColor: "#000",
		boxShadow: "0px 0px 0px #fff"
	});

    this.setDimentions = function(w, h) {
        if (w > 0)
            this.textBox.width(w * WIDTH_ERR_RATE);
        if (h > 0)
            this.textBox.height(h * HEIGHT_ERR_RATE);
    };

    this.getDimentions = function()
    {
        return new Vector2d(this.textBox.width()/WIDTH_ERR_RATE, this.textBox.height()/HEIGHT_ERR_RATE);
    };

    /**
     *    updates the textbox transform
     *
     *    @method
     */
	this.update = function()
	{
		if (!this.parent.transform) {
			console.warn("[JSCF][Textbox] No transform! Parent isn't entity?");
		}

		var transform = this.parent.getGlobalTransform();
        var dims = this.getDimentions();
		var newPosX = Math.round(transform.pos.x - dims.x/2);
		var newPosY = Math.round(transform.pos.y - dims.y/2);

		this.textBox.x(newPosX);
		this.textBox.y(newPosY);
	};

    /**
     *    renders the textbox
     *
     *    @method
     *    @return {Boolean} true if rendered successfully; false otherwise.
     */
	this.render = function()
	{
		var ctx = this.parent.game.graphics.context;
		shadowFx.pre_render(ctx);
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		var ret = this.textBox.render(true);
		ctx.restore();
		shadowFx.post_render(ctx);

		return ret;
	}
}
