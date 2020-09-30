
/**
 * @class
 * @classdsc textbox graphic class
 * @memberof UI
 *
 * @param       {Core.Entity}   parent entity to attach to
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

    /**
     *    parent
     *
     *    @type {Core.Entity}
     */
	this.parent = parent;

	/**
	 *    effect (defaults to shadow effect)
	 *
	 *    @type {Graphics.Effect}
	 */
	this.effect = shadowFx;

    /**
     *    textbox of CanvasInput object
     *
     *    @type {CanvasInput}
     */
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
     *    Set dimentions
     *
     *    @method
     *    @param  {Number} w width
     *    @param  {Number} h height
     */
    this.setDimentions = function(w, h) {
        if (w > 0)
            this.textBox.width(w * WIDTH_ERR_RATE);
        if (h > 0)
            this.textBox.height(h * HEIGHT_ERR_RATE);
    };

    /**
     *    Get dimentions
     *
     *    @method
     *    @return {Utils.Vector2d} vector containing width and height
     */
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
		this.effect.pre_render(ctx);
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		var ret = this.textBox.render(true);
		ctx.restore();
		this.effect.post_render(ctx);

		return ret;
	};

	/**
	 * toggles the readonly property
	 */
	this.toggleEnabled = function() {
		this.textBox._readonly = !this.textBox._readonly;
	};

	/**
	 *    destroys CanvasInput related objects
	 *
	 *    @method
	 */
	this.destroy = function() {
		this.textBox.destroy();
		game.graphics.canvas.style.cursor = "default";
	};
}
