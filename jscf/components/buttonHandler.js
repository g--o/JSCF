
/***************************
	Button Handler component.
***************************/

const __BUTTON_HANDLER_NAME = "[builtin_button_handler]";
const __BUTTON_HANDLER_HOVER_SPEED = 1.1;
const __BUTTON_HANDLER_HOVER_MAX = 1.5;

function ButtonHandler(owner, speed)
{
	this.name = __BUTTON_HANDLER_NAME;
	this.parent = owner;
	this.hover_speed = speed ? speed : __BUTTON_HANDLER_HOVER_SPEED;
	this.pressed = false;

	// set bounding box
	var shape = owner.getShapeByChild();
	this.bb = new AABB(owner.transform.x, owner.transform.y, shape.x, shape.y);

	this.update = function()
	{
		this.bb.setTransform(owner.transform);

		var mx = owner.game.inputManager.getMouseX();
		var my = owner.game.inputManager.getMouseY();
		var mDown = owner.game.inputManager.IsMouseDown();

		if (this.bb.containsPoint(mx, my)) {
			if (owner.transform.scale.length() < __BUTTON_HANDLER_HOVER_MAX)
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

	this.onClick = function()
	{
		console.log("[JSCF][ButtonHandler] button press");
	};

}

ButtonHandler.component_name = __BUTTON_HANDLER_NAME;
