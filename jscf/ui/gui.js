// JSCFEditor consts
const __GUIMANAGER_JSCFEDITOR_ID 		= "jscf-editor";
const __GUIMANAGER_JSCFEDITOR_SAVE_ID 	= "jscf-editor-save-button";
const __GUIMANAGER_JSCFEDITOR_CANCEL_ID	= "jscf-editor-cancel-button";
const __GUIMANAGER_JSCFEDITOR_PANEL_ID 	= "jscf-editor-panel";

// Panel consts
const __GUIMANAGER_DEBUG_PANEL_NAME 	= "debug-panel";
const __GUIMANAGER_HELP_PANEL_NAME 		= "help-panel";
const __GUIMANAGER_LIST_PANEL_NAME 		= "panel-script";

// Widget consts
const __GUIMANAGER_WINDOW_NAME 			= "window";
const __GUIMANAGER_CONTAINER_NAME 		= "con";
const __GUIMANAGER_X_SUFFIX				= "-x-btn";
const __GUIMANAGER_BG_NAME 				= "bg";
const __GUIMANAGER_BTN_NAME 			= "btn";
const __GUIMANAGER_TXT_NAME 			= "txt";
const __GUIMANAGER_TXTBOX_NAME			= "tb";

/**
 * @class
 * @classdesc the graphical interface manager of the engine's game object.
 * @memberof UI
 *
 * @param {Core.Game} game   the JSCF game object.
 * @param {Object}	  utheme a UI theme object.
 *
 * @constructor
 */
function GuiManager(game, utheme)
{
	this.eleNum = 0;
    this.isDebug = false;
	this.jscfEditor = null;
	this.theme = utheme ? utheme : new Theme(__UI_DEFAULT_THEME,
											game.getCanvasWidth(),
											game.getCanvasHeight());

	/**
	 *    Sets theme via json / object settings (not override).
	 *
	 *    @method
	 *    @param  {Object} themeSettings the theme settings json / object.
	 */
	this.setTheme = function(themeSettings)
	{
		if (!themeSettings) {
			game.warn("bad theme settings!");
			return;
		}

		this.theme = new Theme(themeSettings,
							   game.getCanvasWidth(),
							   game.getCanvasHeight());
	};

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
		bg.effect = this.theme.getProperty("container", "effect");
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
		var containerHeight = this.theme.getSize("container", "height");
		return this.createContainer(__GUIMANAGER_CONTAINER_NAME+this.eleNum, x, y,
									this.theme.getSize("container", "width"),
									containerHeight,
									this.theme.getProperty("container", "color"));
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
		var buttonTheme = this.theme.settings.button;
		return this.createButton(__GUIMANAGER_BTN_NAME+this.eleNum++, x, y,
								this.theme.getSize("button", "width"),
								this.theme.getSize("button", "height"),
								buttonTheme.color, txt,
								buttonTheme.font_color,
								this.theme.getFontDesc("button"));
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
     *    @param  {Effect} effect 	the effect to render with textbox
     *    @return {Core.Entity}     gui textbox entity
     */
	this.createTextBox = function(name, x, y, w, h, txt, effect)
	{
		var e = new Entity(game, name, true, x, y, true);
		var textBox = new Textbox(e, w, h, txt);

		if (effect)
			textBox.effect = effect;

		e.insertChild(textBox);

		return e;
	};

    /**
     *    creates default gui textbox
     *
     *    @method
     *    @param  {Number} x        x position
     *    @param  {Number} y        y position
     *    @param  {String} txt 		text to set in textbox
     *    @return {Core.Entity}     default gui textbox entity
     */
	this.createDefaultTextBox = function(x, y, txt)
	{
		if (!txt)
			txt = "";
		return this.createTextBox(__GUIMANAGER_TXTBOX_NAME+this.eleNum,
										x, y,
								  		this.theme.getSize("textbox", "width"),
								  		this.theme.getSize("textbox", "height"),
										txt,
										this.theme.getProperty("textbox", "effect"));
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
		var text = new Text(game, txt,
							this.theme.getProperty("label", "font_color"),
							this.theme.getFontDesc("label"));
		text.enabled = true;

		var txtEntity = new Entity(game, __GUIMANAGER_TXT_NAME, true, x, y, true);
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
		var self = this;

        var window = this.createDefaultContainer(x, y);
        window.name = __GUIMANAGER_WINDOW_NAME + this.eleNum++;

		var factor = this.theme.getSize("window","ctl_size");
		var btnWidth = this.theme.getSize("container", "width") * factor;
		var btnHeight = this.theme.getSize("container", "height") * factor;

		var bgChild = window.getChild(__GUIMANAGER_BG_NAME);

        var btn = this.createButton(window.name + __GUIMANAGER_X_SUFFIX,
									(btnWidth-bgChild.width)/2, (btnHeight-bgChild.height)/2,
									btnWidth, btnHeight,
									this.theme.getProperty("button","color"),
									"X",
									this.theme.getProperty("button", "font_color"),
									this.theme.getFontDesc("button"));

        btn.setDimentions = function() {
            btn.transform.pos.x = (btnWidth-bgChild.width)/2;
            btn.transform.pos.y = (btnHeight-bgChild.height)/2;
        };

        btn.getComponentOfType(ButtonHandler).onClick = function() {
            SceneUtils.deleteParent(game, btn);
        };

        window.insertChild(btn);
		window.addComponent(RectangleEditor);

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
	 *    edits an object
	 *
	 *    @method
	 *    @param  {String}		id the id of the editor element
	 *    @param  {Object}		obj the object to edit
	 *    @return {Object} 		the ace based jscf editor
	 */
	this.editObject = function(id, obj)
	{
		var self = this;

		if (this.jscfEditor)
			this.jscfEditor.destroy();

		this.jscfEditor = this.createJscfEditor(id, obj);

		return this.jscfEditor;
	};

	/**
	 *    creates a text editor
	 *
	 *    @method
	 *    @param  {String}		id the id of the editor element
	 *    @param  {Object}		obj the object to edit
	 *    @return {Object} 		the ace based jscf editor
	 */
	this.createJscfEditor = function(id, obj)
	{
		var editorObject = null;

		// create editor div
		var editor = document.createElement("div");
		editor.id = id;
		document.body.appendChild(editor);

		// create save button
		var editorPanel = document.createElement("div");
		var saveBtn = document.createElement("button");
		var cancelBtn = document.createElement("button");

		// set save script
		if (obj) {
			saveBtn.onclick = function () {
				var code = editorObject.getValue();
				var fn = eval('[' + code + ']')[0];
				obj.update = fn;
				editor.parentNode.removeChild(editor);
				editorPanel.parentNode.removeChild(editorPanel);
				ButtonHandler.active = true;
			};

			cancelBtn.onclick = function() {
				editor.parentNode.removeChild(editor);
				editorPanel.parentNode.removeChild(editorPanel);
				ButtonHandler.active = true;
			}

			saveBtn.innerHTML = "Save";
			saveBtn.id = __GUIMANAGER_JSCFEDITOR_SAVE_ID;
			cancelBtn.innerHTML = "Cancel";
			cancelBtn.id = __GUIMANAGER_JSCFEDITOR_CANCEL_ID;
			editorPanel.id = __GUIMANAGER_JSCFEDITOR_PANEL_ID;

			editorPanel.appendChild(saveBtn);
			editorPanel.appendChild(cancelBtn);
			document.body.appendChild(editorPanel);

			editorObject = createEditor(__GUIMANAGER_JSCFEDITOR_ID, obj, false);
		}

		ButtonHandler.active = false;

		return editorObject;
	};

    /**
     *    creates debug panel
     *
     *    @method
     *    @return {Core.Entity} returns debug panel entity
     */
	this.createDebugPanel = function()
	{
        var self = this;
		var panelHeight = this.theme.getSize("panel", "height");
		var panelWidth =  this.theme.getSize("panel", "width");

		// Toggle button
		var toggleBtn = game.guiManager.createDefaultButton(0, 0, "Dark / Light");
		toggleBtn.getComponentOfType(ButtonHandler).onClick = function() {
			if (self.theme.settings == __UI_LIGHT_THEME)
				self.setTheme(__UI_DARK_THEME);
			else
				self.setTheme(__UI_LIGHT_THEME);

			// restart debug panel
			self.toggleDebugPanel();
			self.toggleDebugPanel();
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

			// inspect object
			game.guiManager.createInspectionPanel(ent);
		});

        // FPS label
        var fpsLabel = this.createLabel(0, 0, "");

        // List label
 		var listLabel = this.createLabel(0, 0, "");

		// Panel script
        var panelScript = new Script(null);
		panelScript.lastTime = game.time.getTimeFromStart();
		panelScript.update = function()
		{
            var newTime = game.time.getTimeFromStart();
            if (newTime - panelScript.lastTime > 1000) {
                panelScript.lastTime = newTime;

                const NEW_LINE =  "\n";
				var txt = listLabel.getChildAt(0);

				if (txt.enabled) {
					var entities = Object.keys(game.getCurrentScene().entities);
					var finalText = "";
					var curText = "";
					for (var i = 0; i < entities.length; i++) {
						curText = self.buildString(game.getCurrentScene().getEntity(entities[i]), tb.value()) + NEW_LINE;
						finalText += curText;
					}
					txt.setText(finalText);
				} else {
					txt.setText("");
				}

                var fpsTxt = fpsLabel.getChildAt(0);
                var maxDeltaTime = Math.max(game.time.getDeltaTime(), game.renderTime.getDeltaTime());
                fpsTxt.setText(parseInt(1.0/maxDeltaTime).toString() + " fps");
            }
		};

        // Create the panel
		var panel = game.guiManager.createContainer(__GUIMANAGER_DEBUG_PANEL_NAME,
                                                    panelWidth/2, panelHeight/2, panelWidth,
                                                    panelHeight, this.theme.getProperty("container","color"));
        panel.addComponent(LayoutHandler);
        panel.getComponentOfType(LayoutHandler).layoutType = LinedLayout;

        panel.insertChild(fpsLabel);
		panel.insertChild(toggleBtn);
        panel.insertChild(searchTB);
        panel.insertChild(listLabel);
        panel.addChild(__GUIMANAGER_LIST_PANEL_NAME, panelScript);

		return panel;
	};

	/**
	 *    creates an inspection window for an object
	 *
	 *    @method
	 *    @param  {Object} 		obj the object to inspect
	 *    @return {Core.Entity}     the window created
	 */
	this.createInspectionPanel = function(obj)
	{
		var self = this;
		var canvasWidth = game.getCanvasWidth();
		var panelWidth = this.theme.getSize("panel", "width");
		var panelHeight = this.theme.getSize("panel", "height");

		// create label
		var label = this.createLabel(0,0);
		var text = label.getChildAt(0);
		label.update = function() {
			text.setText("------ " + obj.name + " ------");
		};

		var panel = this.createDefaultContainer(canvasWidth - panelWidth/2,
			 							   		panelHeight/2);
		panel.insertChild(label);
		panel.setDimentions(panelWidth, panelHeight);

		if (obj.transform) {
			panel.insertChild(this.createLabel(0,0,"transform"));
			var transTB = game.guiManager.createDefaultTextBox(0, 0, obj.transform);
			var tb = transTB.getChildAt(0).textBox;
			tb.onsubmit(function() {
				var array = tb.value().split(",");
				obj.transform.pos.x = parseInt(array[0]);
				obj.transform.pos.y = parseInt(array[1]);
			});
			panel.insertChild(transTB);
		}

		for (var name in obj.children) {
			if (!obj.children.hasOwnProperty(name))
				continue;
			var c = obj.children[name];

			if (c instanceof Entity) {	// entity resolves recursively
				; // TODO: allow nested edits
			} else {					// not an entity
				panel.insertChild(this.createLabel(0, 0, name));
				if (c.toString() == "[object Object]") {
					// Edit button
					var editBtn = this.createDefaultButton(0,0,"Edit");
					editBtn.obj = c;
					editBtn.getComponentOfType(ButtonHandler).onClick = (function() {
						self.editObject(__GUIMANAGER_JSCFEDITOR_ID, this.obj);
					}).bind(editBtn);
					panel.insertChild(editBtn);
				} else {
					// Textbox field
					panel.insertChild(this.createDefaultTextBox(0, 0, c));
				}
			}
		}

		// seperator
		panel.insertChild(this.createLabel(0,0,"______________________"));

		// close button
		var closeBtn = this.createDefaultButton(0, 0, "Close");
		closeBtn.getComponentOfType(ButtonHandler).onClick = function() {
			SceneUtils.deleteParent(game, closeBtn);
		};
		panel.insertChild(closeBtn);

		// add layout handler
		panel.addComponent(LayoutHandler);
        panel.getComponentOfType(LayoutHandler).layoutType = LinedLayout;

		game.getCurrentScene().addEntity(panel);
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
		const PANEL_WIDTH = this.theme.getSize("panel", "width");
        const DP_WIDTH =  PANEL_WIDTH + this.theme.getSize("panel", "margin");

        var helpPanel = this.createDefaultWindow(DP_WIDTH*2, PANEL_WIDTH);
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

			var hasComponent = (ents[e].hasComponentOfType(RectangleEditor));
            if (ents[e].name != __GUIMANAGER_DEBUG_PANEL_NAME && !hasComponent)
                ents[e].addComponent(RectangleEditor);
        }
    };

    this.delRectangleEditor = function()
    {
        // Remove rectangle editor from all entities!
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
     *    @param  {String} f filter string
     *    @return {String}   a nice string representation
     */
	this.buildString = function(e, f)
	{
		const INDENT = "\t\t\t";
		var finalText = "";
		finalText += e.name + " (Entity)";

		for (var name in e.children) {
			if (!e.children.hasOwnProperty(name))
				continue;
			var c = e.children[name];

			if (c instanceof Entity) {	// entity resolves recursively
				finalText += "\n" + INDENT;
				finalText += this.buildString(c, f);
			} else {					// not an entity
				// beautify name
				var addedText = "\n" + INDENT;
				if (c.constructor.component_name) {
					addedText += INDENT + "- ";
					if (c.constructor.component_name == Script.component_name)
						addedText += name + " ";
					addedText += c.constructor.component_name + " (Component)";
				} else {
					addedText += INDENT + "- " + name + " (" + c.constructor.name + ")";
				}

				// filter
				if (!f || (f && addedText.search(f) != -1))
					finalText += addedText;
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
