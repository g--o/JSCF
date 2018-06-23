
const __GUIMANAGER_BG_NAME = "bg";
const __GUIMANAGER_TXT_NAME = "txt";

// Container consts
const __GUIMANAGER_CONTAINER_COLOR = "#a6a6a6cc";
const __GUIMANAGER_CONTAINER_WIDTH = 150;
const __GUIMANAGER_CONTAINER_HEIGHT = __GUIMANAGER_CONTAINER_WIDTH;

// Button consts
const __GUIMANAGER_BUTTON_WIDTH = 100;
const __GUIMANAGER_BUTTON_HEIGHT = 50;
const __GUIMANAGER_BUTTON_FONT_COLOR = "#000";
const __GUIMANAGER_BUTTON_FONT_SIZE = __GUIMANAGER_BUTTON_HEIGHT * 0.3;
const __GUIMANAGER_BUTTON_FONT =  __GUIMANAGER_BUTTON_FONT_SIZE + "px arial";


function GuiManager(game)
{
	this.eleNum = 0;

	// Set default bgcolor gradient
	var __GUIMANAGER_BUTTON_BGCOLOR = game.graphics.context.createLinearGradient(0, __GUIMANAGER_BUTTON_HEIGHT*0.4, 0, 0);
	__GUIMANAGER_BUTTON_BGCOLOR.addColorStop(0, "#bebebe");
	__GUIMANAGER_BUTTON_BGCOLOR.addColorStop(1, "#e7e7e7");

	this.createContainer = function(name, x, y, w, h, bgcolor)
	{
		var e = new Entity(game, name, true, x, y, true);
		// Build bg
		var bg = new Plane(game, w, h, bgcolor);
		e.addChild(__GUIMANAGER_BG_NAME, bg);

		return e;
	};

	this.createDefaultContainer = function(x, y)
	{
		return this.createContainer("con"+this.eleNum, x, y, __GUIMANAGER_CONTAINER_WIDTH, __GUIMANAGER_CONTAINER_HEIGHT, __GUIMANAGER_CONTAINER_COLOR);
	};

	this.createButton = function(name, x, y, w, h, bgcolor, txt, txtstyle, font)
	{
		var e = this.createContainer(name, x, y, w, h, bgcolor);

		// Build txt
		var t = new Text(game, txt, txtstyle, font);
		var trect = t.getDimentions();
		var txtEntity = new Entity(game, name+"."+__GUIMANAGER_TXT_NAME, true, -trect.width/2, 0, true);
		txtEntity.addChild(__GUIMANAGER_TXT_NAME, t);

		// Add text entity
		e.addChild(__GUIMANAGER_TXT_NAME, txtEntity);

		// Add button handler component
		if (typeof(ButtonHandler) == "undefined") {
			console.warn("[JSCF][GuiManager] ButtonHandler component not loaded! Some functionality is disabled!");
		} else {
			e.addComponent(ButtonHandler);
		}

		return e;
	};

	this.createDefaultButton = function(x, y, txt)
	{
		return this.createButton("btn"+this.eleNum++, x, y, __GUIMANAGER_BUTTON_WIDTH,
		 	__GUIMANAGER_BUTTON_HEIGHT, __GUIMANAGER_BUTTON_BGCOLOR, txt,
			__GUIMANAGER_BUTTON_FONT_COLOR,__GUIMANAGER_BUTTON_FONT);
	};

}
