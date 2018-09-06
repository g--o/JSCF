/***************************
	Button Handler component.
***************************/

const __BUTTON_HANDLER_NAME = "[builtin_button_handler]";
const __BUTTON_HANDLER_HOVER_SPEED = 1.1;
const __BUTTON_HANDLER_HOVER_MAX = 1.5;

/**
 * @class
 * @classdesc 	the button handler component.
 * @memberof    Components
 *
 * @param       {Core.Entity} owner the entity the component's being applied to.
 * @param       {Number} speed animation speed (ticks per second).
 * @constructor
 */
function ButtonHandler(owner, speed)
{
	this.name = __BUTTON_HANDLER_NAME;
	this.parent = owner;
	this.hover_speed = speed ? speed : __BUTTON_HANDLER_HOVER_SPEED;
	this.pressed = false;

	this.setDimentions = function(w, h)
	{
		if (w > 0)
			this.bb.dims.x = w;
		if (h > 0)
			this.bb.dims.y = h;
		this.bb.reset();
	};

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
		var mDown = owner.game.inputManager.isMouseDown();

		if (this.bb.containsPoint(mx, my)) {
			if (transform.scale.length() < __BUTTON_HANDLER_HOVER_MAX)
				owner.transform.scale.scalarMul(this.hover_speed);

			if (mDown)
				this.pressed = true;
		} else {
			owner.transform.scale = new Vector2d(1, 1);
		}

		if (this.pressed && !mDown) {
			this.pressed = false;
			this.onClick();
		}
	};

	/**
	 *    stub callback function for click; override if needed.
	 *
	 *    @method
	 */
	this.onClick = function()
	{
		console.log("[JSCF][ButtonHandler] button press");
	};

	this.init = function()
	{
		// set bounding box
		var shape = owner.getDimentions();
		var transform = owner.getGlobalTransform();
		this.bb = new AABB(transform, transform, shape.x, shape.y);
	};

	this.init();

}

/**
 *    the component name
 *
 *    @type {String}
 */
ButtonHandler.component_name = __BUTTON_HANDLER_NAME;
