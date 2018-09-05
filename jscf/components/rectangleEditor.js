/***************************
	Button Handler component.
***************************/

const __RECTANGLE_EDITOR_NAME = "[rectangle_editor]";

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
	this.name = __BUTTON_HANDLER_NAME;
	this.parent = owner;
	this.style = style ? style : "red";

	/**
	 *    updates button handler component (position, effects, clicks, hovers, etc..)
	 *
	 *    @method
	 */
	this.update = function()
	{
		var transform = owner.getGlobalTransform();
		this.bb.setTransform(transform);

		var mx = owner.game.inputManager.getMouseX();
		var my = owner.game.inputManager.getMouseY();
		var mousePos = new Vector2d(mx, my);

		if (owner.game.inputManager.IsRMBDown()) {
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

		if (this.bb.containsPoint(mx, my) && owner.game.inputManager.IsMouseDown()) {
			if (owner.game.inputManager.IsLMBDown()) {
				this.parent.transform.pos = mousePos;
			}
		}
	};

	this.render = function()
	{
		this.rectangle.render();
		this.circle.render();
	};

	this.init = function()
	{
		// set bounding box
		var shape = owner.getDimentions();
		var transform = owner.getGlobalTransform();

		this.rectangle = new Rectangle(game, shape.x, shape.y, this.style);
		this.circle = new Circle(game, 5, this.style);
		this.bb = new AABB(transform, transform, shape.x, shape.y);
	};

	this.init();

}

/**
 *    the component name
 *
 *    @type {String}
 */
RectangleEditor.component_name =  __RECTANGLE_EDITOR_NAME;
