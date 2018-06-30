
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

// Textbox consts
const __GUIMANAGER_TXTBOX_WIDTH = 100;
const __GUIMANAGER_TXTBOX_HEIGHT = 23;

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
		bg.effect = shadowFx;
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

	this.createTextBox = function(name, x, y, w, h, txt)
	{
		var e = new Entity(game, name, true, x, y, true);
		e.insertChild(new Textbox(e, w, h, txt));

		return e;
	};

	this.createDefaultTextBox = function(x, y)
	{
		return this.createTextBox("tb"+this.eleNum, x, y, __GUIMANAGER_TXTBOX_WIDTH, __GUIMANAGER_TXTBOX_HEIGHT);
	};

	this.createLabel = function(x, y, txt)
	{
		var text = new Text(game, txt, "white", "15px arial");
		text.enabled = true;
		var txtEntity = new Entity(game, "txt", true, x, y, true);
		txtEntity.insertChild(text);

		return txtEntity;
	};

	this.createDebugPanel = function()
	{
		var panelHeight = game.getCanvasHeight();
		var panelWidth = game.getCanvasWidth()/4;
		var HORIZONTAL_OFFSET = panelWidth/4;
		var VERTICAL_OFFSET = -panelHeight/8;

		var panel = game.guiManager.createContainer("left-panel", panelWidth/2, panelHeight/2, panelWidth, panelHeight, __GUIMANAGER_CONTAINER_COLOR);
		game.getCurrentScene().addEntity(panel);

		// List label
 		var listLabel = this.createLabel(-HORIZONTAL_OFFSET, 0, "");
		panel.insertChild(listLabel);

		// build button
		var btn = game.guiManager.createDefaultButton(-HORIZONTAL_OFFSET, VERTICAL_OFFSET, "Toggle");
		btn.getComponentOfType(ButtonHandler).onClick = function() {
			var txt = listLabel.getChildAt(0);
			txt.enabled = !txt.enabled;
		}
		panel.insertChild(btn);

		// Entity creation
		var createBtn = game.guiManager.createDefaultButton(HORIZONTAL_OFFSET, VERTICAL_OFFSET, "Create Entity");
		createBtn.getComponentOfType(ButtonHandler).onClick = function() {
			game.getCurrentScene().createNewEntity(game.getCurrentScene().getEntityName(), 0, 0, null);
		}
		panel.insertChild(createBtn);

		// Search entity
		var textBox = game.guiManager.createDefaultTextBox(-HORIZONTAL_OFFSET/2, VERTICAL_OFFSET*2);
		var tb = textBox.getChildAt(0).textBox;
		tb.width(__GUIMANAGER_TXTBOX_WIDTH*2);
		tb.placeHolder("Search entity...");
		tb.onsubmit(function() {
			var ent = game.getCurrentScene().getEntity(tb.value());
			if (!ent) {
				tb.value("");
				return;
			}
			var pos = ent.transform.pos;
			transformTBx.getChildAt(0).textBox.value(pos.x);
			transformTBy.getChildAt(0).textBox.value(pos.y);
		});
		panel.insertChild(textBox);

		// Transform edit
		var transformTBx = game.guiManager.createDefaultTextBox(-HORIZONTAL_OFFSET, VERTICAL_OFFSET*2.5);
		transformTBx.getChildAt(0).textBox.placeHolder("pos.x");
		transformTBx.getChildAt(0).textBox.onsubmit(function()
		{
			var ent = game.getCurrentScene().getEntity(tb.value());
			if (!ent) {
				tb.value("");
				return;
			}
			ent.transform.pos.x = parseInt(transformTBx.getChildAt(0).textBox.value());
		});
		panel.insertChild(transformTBx);

		var transformTBy = game.guiManager.createDefaultTextBox(HORIZONTAL_OFFSET, VERTICAL_OFFSET*2.5);
		transformTBy.getChildAt(0).textBox.placeHolder("pos.y");
		transformTBy.getChildAt(0).textBox.onsubmit(function()
		{
			var ent = game.getCurrentScene().getEntity(tb.value());
			if (!ent) {
				tb.value("");
				return;
			}
			ent.transform.pos.y = parseInt(transformTBy.getChildAt(0).textBox.value());
		});
		panel.insertChild(transformTBy);

		// Transform label
		panel.insertChild(this.createLabel(0, VERTICAL_OFFSET*3, "Transform"));

		// Panel itself update
		var self = this;
		panel.insertChild({
			update: function()
			{
				var txt = listLabel.getChildAt(0);
				if (txt.enabled) {
					var entities = Object.keys(game.getCurrentScene().entities);
					var finalText = "";
					for (var i = 0; i < entities.length; i++) {
						finalText += self.buildString(game.getCurrentScene().getEntity(entities[i])) + "\n";
					}
					txt.txt = finalText;
				} else {
					txt.txt = "";
				}
			}
		});

		return panel;
	};

	this.insertDebugPanel = function()
	{
		game.getCurrentScene().addEntity(this.createDebugPanel());
	};

	this.buildString = function(e)
	{
		const INDENT = "\t\t\t";
		var finalText = "";
		finalText += e.name + " (Entity)";

		for (var name in e.children) {
			if (!e.children.hasOwnProperty(name))
				continue;

			finalText += "\n" + INDENT;
			var c = e.children[name];

			if (c instanceof Entity) {
				finalText += this.buildString(c);
			} else if (c.constructor.component_name){
				finalText += INDENT + "- " + c.constructor.component_name + " (Component)";
			} else {
				finalText += INDENT + "- " + name + " (" + c.constructor.name + ")";
			}
		}
		return finalText;
	};

}
