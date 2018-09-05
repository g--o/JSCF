
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

/**
 * @class
 * @classdesc the graphical interface manager of the engine's game object.
 * @memberof UI
 *
 * @param {Core.Game} game   the JSCF game object.
 *
 * @constructor
 */
function GuiManager(game)
{
	this.eleNum = 0;

	// Set default bgcolor gradient
	var __GUIMANAGER_BUTTON_BGCOLOR = game.graphics.context.createLinearGradient(0, __GUIMANAGER_BUTTON_HEIGHT*0.4, 0, 0);
	__GUIMANAGER_BUTTON_BGCOLOR.addColorStop(0, "#bebebe");
	__GUIMANAGER_BUTTON_BGCOLOR.addColorStop(1, "#e7e7e7");

    /**
     *    creates rectangular container with background
     *
     *    @method
     *    @param  {String} name    container entity name
     *    @param  {Number} x       x position
     *    @param  {Number} y       y position
     *    @param  {Number} w       container width
     *    @param  {Number} h       container height
     *    @param  {String} bgcolor background color (2d context descriptor)
     *    @return {Core.Entity}         gui container entity
     */
	this.createContainer = function(name, x, y, w, h, bgcolor)
	{
		var e = new Entity(game, name, true, x, y, true);
		// Build bg
		var bg = new Plane(game, w, h, bgcolor);
		bg.effect = shadowFx;
		e.addChild(__GUIMANAGER_BG_NAME, bg);

		return e;
	};

    /**
     *    creates default rectangular container
     *
     *    @method
     *    @param  {Number} x       x position
     *    @param  {Number} y       y position
     *    @return {Core.Entity}         default gui container entity
     */
	this.createDefaultContainer = function(x, y)
	{
		return this.createContainer("con"+this.eleNum, x, y, __GUIMANAGER_CONTAINER_WIDTH, __GUIMANAGER_CONTAINER_HEIGHT, __GUIMANAGER_CONTAINER_COLOR);
	};

    /**
     *    creates rectangular button
     *
     *    @method
     *    @param  {String} name    button entity name
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @param  {Number} w        button width
     *    @param  {Number} h        button height
     *    @param  {String} bgcolor  background color (2d context descriptor)
     *    @param  {String} txt      the text to display on button
     *    @param  {String} txtstyle text 2d context styling (can be just color)
     *    @param  {String} font     2d cotext font description
     *    @return {Core.Entity}          gui button entity
     */
	this.createButton = function(name, x, y, w, h, bgcolor, txt, txtstyle, font)
	{
		var e = this.createContainer(name, x, y, w, h, bgcolor);
        var bg = e.getChildAt(0);

		// Add text
		var t = new Text(game, txt, txtstyle, font);
		e.addChild(__GUIMANAGER_TXT_NAME, t);

		// Add button handler component
		if (typeof(ButtonHandler) == "undefined") {
			console.warn("[JSCF][GuiManager] ButtonHandler component not loaded! Some functionality is disabled!");
		} else {
			e.addComponent(ButtonHandler);
		}

		return e;
	};

    /**
     *    creates default gui button
     *
     *    @method
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @param  {String} txt      the text to display on button
     *    @return {Core.Entity}          default gui button entity
     */
	this.createDefaultButton = function(x, y, txt)
	{
		return this.createButton("btn"+this.eleNum++, x, y, __GUIMANAGER_BUTTON_WIDTH,
		 	__GUIMANAGER_BUTTON_HEIGHT, __GUIMANAGER_BUTTON_BGCOLOR, txt,
			__GUIMANAGER_BUTTON_FONT_COLOR,__GUIMANAGER_BUTTON_FONT);
	};

    /**
     *    creates gui rectangular textbox
     *
     *    @method
     *    @param  {String} name    textbox entity name
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @param  {Number} w        textbox width
     *    @param  {Number} h        textbox height
     *    @param  {String} bgcolor  background color (2d context descriptor)
     *    @param  {String} txt      the text to display on textbox
     *    @return {Core.Entity}          gui textbox entity
     */
	this.createTextBox = function(name, x, y, w, h, txt)
	{
		var e = new Entity(game, name, true, x, y, true);
		e.insertChild(new Textbox(e, w, h, txt));

		return e;
	};

    /**
     *    creates default gui textbox
     *
     *    @method
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @return {Core.Entity}          default gui textbox entity
     */
	this.createDefaultTextBox = function(x, y)
	{
		return this.createTextBox("tb"+this.eleNum, x, y, __GUIMANAGER_TXTBOX_WIDTH, __GUIMANAGER_TXTBOX_HEIGHT);
	};

    /**
     *    creates label (text gui entity)
     *
     *    @method
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @param  {String} txt      the text to display
     *    @return {Core.Entity}          the gui label entity
     */
	this.createLabel = function(x, y, txt)
	{
		var text = new Text(game, txt, "white", "15px arial");
		text.enabled = true;
		var txtEntity = new Entity(game, "txt", true, x, y, true);
		txtEntity.insertChild(text);

		return txtEntity;
	};

    this.createRectEditor = function(x, y, style)
    {
        var e = new Entity(game, "rect-editor", true, x, y, true);
        e.insertChild(new RectangleEditor(e, style));

        return e;
    }

    /**
     *    creates debug panel
     *
     *    @method
     *    @return {Core.Entity} returns debug panel entity
     */
	this.createDebugPanel = function()
	{
		var panelHeight = game.getCanvasHeight();
		var panelWidth = game.getCanvasWidth()/4;

		// Toggle button
		var toggleBtn = game.guiManager.createDefaultButton(0, 0, "Toggle");
		toggleBtn.getComponentOfType(ButtonHandler).onClick = function() {
			var txt = listLabel.getChildAt(0);
			txt.enabled = !txt.enabled;
		};

		// Entity creation button
		var createBtn = game.guiManager.createDefaultButton(0, 0, "Create Entity");
		createBtn.getComponentOfType(ButtonHandler).onClick = function() {
			game.getCurrentScene().createNewEntity(game.getCurrentScene().getEntityName(), 0, 0, null);
		};

		// Search entity textbox
		var searchTB = game.guiManager.createDefaultTextBox(0, 0);
		var tb = searchTB.getChildAt(0).textBox;
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

		// Transform textboxs
		var transformTBx = game.guiManager.createDefaultTextBox(0, 0);
		transformTBx.getChildAt(0).textBox.placeHolder("pos.x");
		transformTBx.getChildAt(0).textBox.onsubmit(function() {
			var ent = game.getCurrentScene().getEntity(tb.value());
			if (!ent) {
				tb.value("");
				return;
			}
			ent.transform.pos.x = parseInt(transformTBx.getChildAt(0).textBox.value());
		});

		var transformTBy = game.guiManager.createDefaultTextBox(0, 0);
		transformTBy.getChildAt(0).textBox.placeHolder("pos.y");
		transformTBy.getChildAt(0).textBox.onsubmit(function() {
			var ent = game.getCurrentScene().getEntity(tb.value());
			if (!ent) {
				tb.value("");
				return;
			}
			ent.transform.pos.y = parseInt(transformTBy.getChildAt(0).textBox.value());
		});

		// Transform label
        var transformLabel = this.createLabel(0, 0, "Transform");

        // List label
 		var listLabel = this.createLabel(0, 0, "");

		// Panel script
		var self = this;
        var panelScript = {
			update: function()
			{
                const NEW_LINE =  "\n";
				var txt = listLabel.getChildAt(0);
				if (txt.enabled) {
					var entities = Object.keys(game.getCurrentScene().entities);
					var finalText = "";
					for (var i = 0; i < entities.length; i++) {
						finalText += self.buildString(game.getCurrentScene().getEntity(entities[i])) + NEW_LINE;
					}
					txt.setText(finalText);
				} else {
					txt.setText("");
				}
			}
		};

        // Create the panel
		var panel = game.guiManager.createContainer("left-panel", panelWidth/2, panelHeight/2, panelWidth, panelHeight, __GUIMANAGER_CONTAINER_COLOR);
        panel.addComponent(LayoutHandler);
        panel.getComponentOfType(LayoutHandler).layoutType = LinedLayout;

        panel.insertChild(searchTB);
        panel.insertChild(transformLabel);
        panel.insertChild(transformTBx);
        panel.insertChild(transformTBy);
        panel.insertChild(createBtn);
        panel.insertChild(toggleBtn);
        panel.insertChild(listLabel);
        panel.insertChild(panelScript);

		return panel;
	};

    /**
     *    creates and inserts debug panel to current scene
     *
     *    @method
     */
	this.insertDebugPanel = function()
	{
        var dp = this.createDebugPanel();
		game.getCurrentScene().addEntity(dp);

        var testBtn = game.guiManager.createDefaultContainer(500, 500);
        testBtn.addComponent(RectangleEditor);

        game.getCurrentScene().addEntity(testBtn);
	};

    /**
     *    builds string description of an object
     *
     *    @method
     *    @param  {object} e an object (entity, component, other object...)
     *    @return {String}   a nice string representation
     */
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
