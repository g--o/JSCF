// Panel consts
const __GUIMANAGER_DEBUG_PANEL_NAME 	= "debug-panel";

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
	this.isFocusConsumed = false;
	this.eleNum = 0;
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
	 *    get current theme
	 *
	 *    @method
	 *    @return {UI.Theme} the current theme
	 */
	this.getTheme = function() {
		return this.theme;
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
		return this.createContainer(this.generateUIName(__GUIMANAGER_CONTAINER_NAME), x, y,
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
     *    @param  {Number}		x        	x position
     *    @param  {Number}		y        	y position
     *    @param  {String}		txt      	the text to display on button
     *    @param  {Function}	onclick_fn	onclick function
     *    @return {Core.Entity}     		default gui button entity
     */
	this.createDefaultButton = function(x, y, txt, onclick_fn)
	{
		var buttonTheme = this.theme.settings.button;
		var btn = this.createButton(this.generateUIName(__GUIMANAGER_BTN_NAME), x, y,
								this.theme.getSize("button", "width"),
								this.theme.getSize("button", "height"),
								buttonTheme.color, txt,
								buttonTheme.font_color,
								this.theme.getFontDesc("button"));

		if (onclick_fn)
			btn.getComponentOfType(ButtonHandler).onClick = onclick_fn;

		return btn;
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
		return this.createTextBox(this.generateUIName(__GUIMANAGER_TXTBOX_NAME),
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
        window.name = this.generateUIName(__GUIMANAGER_WINDOW_NAME);

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

	/**
	 *    [description]
	 *
	 *    @method
	 *    @param  {String} base the base name
	 */
	this.generateUIName = function(base)
	{
		return base + this.eleNum++;
	};

	/**
	 *    consumes focus (lock-like)
	 *
	 *    @method
	 */
	this.focus = function()
	{
		if (!this.isFocusConsumed) {
			this.isFocusConsumed = true;
			return true;
		} else {
			// console.log("[JSCF][GuiManager] focus already consumed");
			return false;
		}
	};

	/**
	 *    resets focus (do not call unless absolutely certain)
	 *
	 *    @method
	 */
	this.resetFocus = function()
	{
		this.isFocusConsumed = false;
	};

}
