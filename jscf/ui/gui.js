

const __GUIMANAGER_DEBUG_PANEL_NAME = "debug-panel";
const __GUIMANAGER_HELP_PANEL_NAME = "help-panel";
const __GUIMANAGER_WINDOW_NAME = "window";

const __GUIMANAGER_BG_NAME = "bg";
const __GUIMANAGER_TXT_NAME = "txt";

// Container consts
const __GUIMANAGER_CONTAINER_COLOR = "#a6a6a6cc";
const __GUIMANAGER_CONTAINER_WIDTH = 250;
const __GUIMANAGER_CONTAINER_HEIGHT = __GUIMANAGER_CONTAINER_WIDTH;

// Button consts
const __GUIMANAGER_BUTTON_WIDTH = 50;
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
    this.isDebug = false;

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
     *    @return {Core.Entity}    default gui container entity
     */
	this.createDefaultContainer = function(x, y)
	{
		return this.createContainer("con"+this.eleNum, x, y, __GUIMANAGER_CONTAINER_WIDTH, __GUIMANAGER_CONTAINER_HEIGHT, __GUIMANAGER_CONTAINER_COLOR);
	};

    /**
     *    creates rectangular button
     *
     *    @method
     *    @param  {String} name     button entity name
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @param  {Number} w        button width
     *    @param  {Number} h        button height
     *    @param  {String} bgcolor  background color (2d context descriptor)
     *    @param  {String} txt      the text to display on button
     *    @param  {String} txtstyle text 2d context styling (can be just color)
     *    @param  {String} font     2d cotext font description
     *    @return {Core.Entity}     gui button entity
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
     *    @return {Core.Entity}     default gui button entity
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
     *    @param  {String} name     textbox entity name
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @param  {Number} w        textbox width
     *    @param  {Number} h        textbox height
     *    @param  {String} bgcolor  background color (2d context descriptor)
     *    @param  {String} txt      the text to display on textbox
     *    @return {Core.Entity}     gui textbox entity
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
     *    @return {Core.Entity}     default gui textbox entity
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
     *    @return {Core.Entity}     the gui label entity
     */
	this.createLabel = function(x, y, txt)
	{
		var text = new Text(game, txt, "white", "15px arial");
		text.enabled = true;
		var txtEntity = new Entity(game, "txt", true, x, y, true);
		txtEntity.insertChild(text);

		return txtEntity;
	};

    /**
     *    creates default window
     *
     *    @method
     *    @param  {Number} x      x coordinate
     *    @param  {Number} y      y coordinate
     *    @return {Core.Entity}   the window entity
     */
    this.createDefaultWindow = function(x, y)
    {
        var window = this.createDefaultContainer(x, y);
        window.name = __GUIMANAGER_WINDOW_NAME + this.eleNum++;

        var btn = this.createDefaultButton((__GUIMANAGER_BUTTON_WIDTH-window.getChild("bg").width)/2,
                                    (__GUIMANAGER_BUTTON_HEIGHT-window.getChild("bg").height)/2, "X");

        btn.name = window.name + "-x-btn";
        btn.setDimentions = function() {
            btn.transform.pos.x = (__GUIMANAGER_BUTTON_WIDTH-window.getChild("bg").width)/2;
            btn.transform.pos.y = (__GUIMANAGER_BUTTON_HEIGHT-window.getChild("bg").height)/2;
        };

        btn.getComponentOfType(ButtonHandler).onClick = function() {
            console.log(window.parent);
            if (window.parent == null)
                game.getCurrentScene().delEntity(window.name);
            else
                btn.parent.delChild(window.name);
        };

        window.insertChild(btn);

        return window;
    };

    /**
     *    create rect editor
     *
     *    @method
     *    @param  {Number} x     x coordinate
     *    @param  {Number} y     y coordinate
     *    @param  {String} style context styling
     */
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
        var self = this;
		var panelHeight = game.getCanvasHeight();
		var panelWidth = game.getCanvasWidth()/4;

		// Toggle button
		var toggleBtn = game.guiManager.createDefaultButton(0, 0, "Toggle");
		toggleBtn.getComponentOfType(ButtonHandler).onClick = function() {
			var txt = listLabel.getChildAt(0);
			txt.enabled = !txt.enabled;
		};

		// Entity creation button
		var createBtn = game.guiManager.createDefaultButton(0, 0, "Help Panel");
		createBtn.getComponentOfType(ButtonHandler).onClick = function() {
            var hp = self.createHelpPanel();
            hp.addComponent(RectangleEditor);
			game.getCurrentScene().addEntity(hp);
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

        // FPS label
        var fpsLabel = this.createLabel(0, 0, "");

		// Transform label
        var transformLabel = this.createLabel(0, 0, "Transform");

        // List label
 		var listLabel = this.createLabel(0, 0, "");

		// Panel script
        var panelScript = {
            lastTime: performance.now(),
			update: function()
			{
                var newTime = performance.now();
                if (newTime - panelScript.lastTime > 1000) {
                    panelScript.lastTime = newTime;

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

                    var fpsTxt = fpsLabel.getChildAt(0);
                    var maxDeltaTime = Math.max(game.time.getDeltaTime(), game.renderTime.getDeltaTime());
                    fpsTxt.setText(parseInt(1.0/maxDeltaTime).toString() + " fps");
                }
			}
		};

        // Create the panel
		var panel = game.guiManager.createContainer(__GUIMANAGER_DEBUG_PANEL_NAME,
                                                    panelWidth/2, panelHeight/2, panelWidth,
                                                    panelHeight, __GUIMANAGER_CONTAINER_COLOR);
        panel.addComponent(LayoutHandler);
        panel.getComponentOfType(LayoutHandler).layoutType = LinedLayout;

        panel.insertChild(fpsLabel);
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
     *    inserts an error popup to scene
     *
     *    @method
     *    @param  {String} errMsg message to show
     */
    this.errorPopup = function(errMsg)
    {
        var win = this.createDefaultWindow(game.getCanvasWidth()/2, game.getCanvasHeight()/2)
        win.insertChild(this.createLabel(0,0, errMsg));
        game.getCurrentScene().addEntity(win);
    };

    /**
     *    create help panel
     *
     *    @method
     *    @return {Core.Entity} a help popup entity
     */
    this.createHelpPanel = function()
    {
        const HELP_TEXT = "Welcome to the JSCF editor!\n- Use left-click to drag entities\n- Use right-click to resize\n- Use ~ button to toggle";
        const DP_WIDTH = game.getCanvasWidth()/4 + 50; // + margin
        var helpPanel = this.createDefaultWindow(DP_WIDTH, game.getCanvasWidth()/4);
        helpPanel.name = __GUIMANAGER_HELP_PANEL_NAME + this.eleNum++;
        helpPanel.insertChild(this.createLabel(0, 0, HELP_TEXT));

        return helpPanel;
    };

    /**
     *    creates and inserts debug panel to current scene
     *
     *    @method
     */
	this.insertDebugPanel = function()
	{
        // Create debug panel
        var debugPanel = this.createDebugPanel();
        // Create debug help panel
        var helpPanel = this.createHelpPanel();

        // Insert panels
        game.getCurrentScene().addEntity(debugPanel);
        game.getCurrentScene().addEntity(helpPanel);
	};

    /**
     *    inserts rectangle editor to all editable entities
     *
     *    @method
     */
    this.insertRectangleEditor = function()
    {
        // Add rectangle editor to all entities!
        var ents = game.getCurrentScene().entities;
        for (var e in ents) {
            if (!ents.hasOwnProperty(e))
                continue;

            if (ents[e].name != __GUIMANAGER_DEBUG_PANEL_NAME)
                ents[e].addComponent(RectangleEditor);
        }
    };

    this.delRectangleEditor = function()
    {
        // Remove rectangle editor to all entities!
        var ents = game.getCurrentScene().entities;
        for (var e in ents) {
            if (!ents.hasOwnProperty(e))
                continue;

            if (ents[e].name != __GUIMANAGER_DEBUG_PANEL_NAME)
                ents[e].delComponentOfType(RectangleEditor);
        }
    };

    /**
     *    toggles the debug panel
     *
     *    @method
     */
    this.toggleDebugPanel = function()
    {
        var curScene = game.getCurrentScene();

        this.isDebug = !this.isDebug;

        if (this.isDebug) {
            this.insertDebugPanel();
            this.insertRectangleEditor();
        } else {
            this.delRectangleEditor();
            curScene.delEntity(__GUIMANAGER_DEBUG_PANEL_NAME);
        }
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

    this.init = function()
    {
        if (game.debugMode) {
            var self = this;

            // "`" to trigger debug panel
            game.inputManager.setOnKeyUpSpec(192, self.toggleDebugPanel.bind(self));
        }
    };

    this.init();

}
