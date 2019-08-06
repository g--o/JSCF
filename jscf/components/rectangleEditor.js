/***************************
	Button Handler component.
***************************/

const __RECTANGLE_EDITOR_NAME = "[rectangle_editor]";
const __RECTANGLE_DEFAULT_ACTIVE_STYLE = "red";
const __RECTANGLE_DEFAULT_PASSIVE_STYLE = "black";

/**
 * @class
 * @classdesc 	the rectangle editor component.
 * @memberof    Components
 *
 * @param       {Core.Entity} owner the entity the component's being applied to.
 * @param       {String} 	  color of the editor
 * @constructor
 */
function RectangleEditor(owner, style)
{
	this.name = __RECTANGLE_EDITOR_NAME;
	this.parent = owner;
	this.style = style ? style : __RECTANGLE_DEFAULT_PASSIVE_STYLE;

	/**
	 *    updates rect editor component
	 *
	 *    @method
	 */
	this.update = function()
	{
		var transform = this.parent.getGlobalTransform();
		this.bb.setTransform(transform);

		var mx = this.parent.game.inputManager.getMouseX();
		var my = this.parent.game.inputManager.getMouseY();
		var mousePos = new Vector2d(mx, my);

		if (this.parent.game.inputManager.isRMBDown() && this.isSelected()) {
			var dims = Vector.subVector(mousePos, this.parent.transform.pos);
			dims.scalarMul(2);
			this.parent.setDimentions(dims.x, dims.y);

			// update dims
			dims = this.parent.getDimentions();
			this.bb.dims = dims;
			this.bb.reset();
			this.rectangle.width = dims.x;
			this.rectangle.height = dims.y;
		}

		if (this.bb.containsPoint(mx, my) && this.parent.game.inputManager.isMouseDown()) {
			if (this.parent.game.inputManager.isLMBDown()) {
				this.selectOwner();
				this.parent.transform.pos = mousePos;
			}
		}
	};

	/**
	 *    set dimentions of rectangle editor
	 *
	 *    @method
	 *    @param  {Number} width  desired width
	 *    @param  {Number} height desire height
	 */
	this.setDimentions = function(width, height) {
		this.bb.dims.x = width;
		this.bb.dims.y = height;
		this.bb.reset();
		this.rectangle.width = width;
		this.rectangle.height = height;
	};

	/**
	 *    gets whether or not the owner is selected
	 *
	 *    @method
	 *    @return {Boolean} True if selected; false otherwise
	 */
	this.isSelected = function()
	{
		return RectangleEditor.currently_selected == this.parent;
	};

	/**
	 *    selects the owner
	 *
	 *    @method
	 */
	this.selectOwner = function()
	{
		if (RectangleEditor.currently_selected) {
			var re = RectangleEditor.currently_selected.getComponentOfType(RectangleEditor);
			if (re)
				re.deselectOwner();
		}

		RectangleEditor.currently_selected = this.parent;
		this.style = __RECTANGLE_DEFAULT_ACTIVE_STYLE;
		this.rectangle.color = this.style;
	};

	/**
	 *    deselects the owner
	 *
	 *    @method
	 */
	this.deselectOwner = function()
	{
		RectangleEditor.currently_selected = null;
		this.style = __RECTANGLE_DEFAULT_PASSIVE_STYLE;
		this.rectangle.color = this.style;
	};

	/**
	 *    renders the rectangle editor
	 *
	 *    @method
	 */
	this.render = function()
	{
		this.rectangle.render();
	};

	this.init = function()
	{
		// set bounding box
		var shape = this.parent.getDimentions();
		var transform = this.parent.getGlobalTransform();

		this.rectangle = new Rectangle(game, shape.x, shape.y, this.style);
		this.bb = new AABB(transform, transform, shape.x, shape.y);
	};

	this.init();

}


/**
 *    the currently selected object
 *
 *    @type {Core.Entity}
 */
RectangleEditor.currently_selected = null;

/**
 *    the component name
 *
 *    @type {String}
 */
RectangleEditor.component_name =  __RECTANGLE_EDITOR_NAME;

RectangleEditor.prototype.toString = function() {
	return this.isSelected();
};
