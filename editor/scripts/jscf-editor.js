// JSCFEditor consts
const __JSCFEDITOR_ADD_WINDOW_NAME  = "add-window";
const __JSCFEDITOR_HELP_PANEL_NAME  = "help-panel";
const __JSCFEDITOR_LIST_PANEL_NAME  = "panel-script";
const __JSCFEDITOR_ID               = "jscf-editor";
const __JSCFEDITOR_SAVE_ID          = "jscf-editor-save-button";
const __JSCFEDITOR_CANCEL_ID        = "jscf-editor-cancel-button";
const __JSCFEDITOR_PANEL_ID         = "jscf-editor-panel";
// debug panel consts
const __JSCFEDITOR_HELP_TEXT        = "Welcome to the JSCF editor!\n\
- Mod key: left ctrl\n\
- Use Mod+left-click to drag entities\n\
- Use Mod+right-click to resize\n\
- Use ~ button to toggle";
// keybinds
const __JSCFEDITOR_KB_DEV_TOGGLE    = 192;

/**
 * conservingBind: keeps code but applies native binding
 * https://stackoverflow.com/questions/34255580/bind-that-does-not-return-native-code-in-javascript
 */
function conservingBind(fun, ctx){
    newFun = function(){
        return eval('[' + fun + ']')[0].apply(ctx, arguments);
    }
    newFun.toString = function(){
        return fun.toString();
    }
    return newFun;
}

function JSCFEditor (game)
{

    /**
     * creates customized ace editor
     *
     * @param editor_id id of the editor element
     * @param script_object a script to edit
     * @param useWebWorker set to false to prevent using worker, for local html file due to browser security restritions
     */
    this.createEditor = function(editor_id, script_object, useWebWorker)
    {
        // fetch script
        const COMMENT = ""; // "// WARNING! scripting anonymous functions may be fatal here!\r\n";
        document.getElementById(editor_id).innerHTML = COMMENT + script_object;

        //create editor
        var editor = ace.edit(editor_id);
        editor.getSession().setMode("ace/mode/javascript");

        // editor styling
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setUseWrapMode(true);
        editor.getSession().setWrapLimitRange(null, null);
        editor.$blockScrolling = Infinity; //prevents ace from logging annoying warnings
        //editor.setShowPrintMargin(false);

        // tern settings
        ace.config.loadModule('ace/ext/tern', function () {
            editor.setOptions({
                enableTern: {
                    defs: ['jscf', 'browser', 'ecma5'],     // http://ternjs.net/doc/manual.html#option_defs
                    plugins: {                              // http://ternjs.net/doc/manual.html#plugins
                        doc_comment: {
                            fullDocs: true
                        },
                        node: {},
                    },
                    useWorker: useWebWorker,
                    switchToDoc: function (name, start) {
                        // tern can use file switching when jump to defnition of function in another file is called
                    },
                    startedCb: function () {
                        //once tern is enabled, it can be accessed via editor.ternServer
                    },
                },
                enableSnippets: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
            });
        });

        // beautify settings
        ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
            editor.setOptions({
                // beautify when closing bracket typed in javascript or css mode
                autoBeautify: true,
                // this enables the plugin to work with hotkeys (ctrl+b to beautify)
                htmlBeautify: true,
            });

            //modify beautify options as needed:
            window.beautifyOptions = beautify.options;
        });

        return editor;
    };

    /**
     *    edits an object
     *
     *    @method
     *    @param  {String}      id the id of the editor element
     *    @param  {Object}      obj the object to edit
     *    @return {Object}      the ace based jscf editor / null
     */
    this.editObject = function(id, obj)
    {
        var self = this;

        if (obj instanceof Script || obj instanceof Function || obj instanceof String){
            if (this.jscfEditor)
                this.jscfEditor.destroy();

            // default callback & value
            var callback = function(newval) {
                /*obj.update = eval('[' + newval + ']')[0];*/
                obj.update = conservingBind(newval, obj);
            }
            var value = obj.update;

            // default for text object
            if (obj instanceof Text) {
                callback = function(newval) { obj.setText(newval); }
                value = obj.getText();
                console.log(value);
            }

            this.jscfEditor = this.createJscfEditor(id, value, callback);
        } else {
            this.jscfEditor = null;
            this.createInspectionPanel(obj);
        }

        return this.jscfEditor;
    };

    /**
     *    creates a text editor
     *
     *    @method
     *    @param  {String}      id          the id of the editor element
     *    @param  {Object}      obj         the object to edit
     *    @param  {Function}    callback    a callback with saved data as parameter.
     *    @return {Object}      the ace based jscf editor
     */
    this.createJscfEditor = function(id, obj, callback)
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
                callback(code);
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
            saveBtn.id = __JSCFEDITOR_SAVE_ID;
            cancelBtn.innerHTML = "Cancel";
            cancelBtn.id = __JSCFEDITOR_CANCEL_ID;
            editorPanel.id = __JSCFEDITOR_PANEL_ID;

            editorPanel.appendChild(saveBtn);
            editorPanel.appendChild(cancelBtn);
            document.body.appendChild(editorPanel);

            editorObject = this.createEditor(__JSCFEDITOR_ID, obj, false);
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
        var guim = game.guiManager;
        var panelHeight = guim.getTheme().getSize("panel", "height");
        var panelWidth =  guim.getTheme().getSize("panel", "width");

        // Toggle button
        var toggleBtn = guim.createDefaultButton(0, 0, "Dark / Light", function() {
            if (guim.getTheme().settings == __UI_LIGHT_THEME)
                guim.setTheme(__UI_DARK_THEME);
            else
                guim.setTheme(__UI_LIGHT_THEME);

            // restart debug panel
            self.toggleDebugPanel();
            self.toggleDebugPanel();
        });

        // Search entity textbox
        var searchTB = guim.createDefaultTextBox(0, 0);
        var tb = searchTB.getChildAt(0).textBox;
        tb.placeHolder("Search entity...");
        tb.onsubmit(function() {
            var ent = game.getCurrentScene().getEntity(tb.value());
            if (!ent) {
                tb.value("");
                return;
            }

            // inspect object
            self.createInspectionPanel(ent);
        });

        // FPS label
        var fpsLabel = guim.createLabel(0, 0, "");

        // List label
        var listLabel = guim.createLabel(0, 0, "");

        // Panel script
        var panelScript = new Script(null);
        /* set internal script vars */
        panelScript.listLabel = listLabel;
        panelScript.tb = tb;
        panelScript.fpsLabel = fpsLabel;
        panelScript.lastTime = game.time.getTimeFromStart();
        panelScript.update = conservingBind(function()
        {
            var newTime = game.time.getTimeFromStart();
            if (newTime - this.lastTime > 1000) {
                this.lastTime = newTime;

                const NEW_LINE =  "\n";
                var txt = this.listLabel.getChildAt(0);

                if (txt.enabled) {
                    var entities = Object.keys(game.getCurrentScene().entities);
                    var finalText = "";
                    var curText = "";
                    for (var i = 0; i < entities.length; i++) {
                        curText = game.guiManager.buildString(
                            game.getCurrentScene().getEntity(entities[i]), this.tb.value())
                             + NEW_LINE;
                        finalText += curText;
                    }
                    txt.setText(finalText);
                } else {
                    txt.setText("");
                }

                var fpsTxt = this.fpsLabel.getChildAt(0);
                var maxDeltaTime = Math.max(game.time.getDeltaTime(), game.renderTime.getDeltaTime());
                fpsTxt.setText(parseInt(1.0/maxDeltaTime).toString() + " fps");
            }
        }, panelScript);

        var saveBtn = guim.createDefaultButton(0,0,"Save",function() {
            SceneUtils.saveToFile(game.getCurrentScene().serialize(), "scene");
        });

        var createBtn = guim.createDefaultButton(0,0,"Create Entity",function() {
            var e = game.getCurrentScene().createNewEntity();
            tb.value(e.name);
        });

        // Create the panel
        var panel = guim.createContainer(__GUIMANAGER_DEBUG_PANEL_NAME,
                                        panelWidth/2, panelHeight/2, panelWidth,
                                        panelHeight, guim.getTheme().getProperty("container","color"));
        panel.addComponent(LayoutHandler);
        panel.getComponentOfType(LayoutHandler).layoutType = LinedLayout;

        panel.insertChild(fpsLabel);
        panel.insertChild(toggleBtn);
        panel.insertChild(saveBtn);
        panel.insertChild(createBtn);
        panel.insertChild(searchTB);
        panel.insertChild(listLabel);
        panel.addChild(__JSCFEDITOR_LIST_PANEL_NAME, panelScript);

        return panel;
    };

    /**
     *    creates an inspection window for an object
     *
     *    @method
     *    @param  {Object}      obj the object to inspect
     *    @return {Core.Entity}     the window created
     */
    this.createInspectionPanel = function(obj)
    {
        var self = this;
        var canvasWidth = game.getCanvasWidth();
        var guim = game.guiManager;
        var panelWidth = guim.getTheme().getSize("panel", "width");
        var panelHeight = guim.getTheme().getSize("panel", "height");

        // create label
        var label = guim.createLabel(0,0);
        var text = label.getChildAt(0);
        label.update = function() {
            text.setText("------ " + obj.name + " ------");
        };

        var panel = guim.createDefaultContainer(canvasWidth - panelWidth/2,
                                                panelHeight/2);
        panel.insertChild(label);
        panel.setDimentions(panelWidth, panelHeight);

        if (obj instanceof Textbox) { // Textbox special case
            var tb = game.guiManager.createDefaultTextBox(0, 0, obj.textBox.value());
            tb.getChildAt(0).textBox.onsubmit(function(){
                obj.textBox.value(tb.getChildAt(0).textBox.value());
            });
            var tb2 = game.guiManager.createDefaultTextBox(0, 0, obj.textBox._readonly);
            tb2.getChildAt(0).textBox.onsubmit(function(){
                obj.textBox._readonly = eval(tb2.getChildAt(0).textBox.value());
            });

            panel.insertChild(tb);
            panel.insertChild(guim.createLabel(0,0,"readonly"));
            panel.insertChild(tb2);
        } else if (!(obj instanceof Entity)) { // Regular
            for (prop in obj) {
                var propType = typeof(obj[prop]);
                if (obj.hasOwnProperty(prop) &&
                propType != "function" &&
                propType != "object") {
                    panel.insertChild(guim.createLabel(0,0,prop));
                    var propTB = game.guiManager.createDefaultTextBox(0, 0, obj[prop]);
                    var tb = propTB.getChildAt(0).textBox;
                    tb.prop = prop;
                    tb.onsubmit(set_property.bind(tb, obj));
                    panel.insertChild(propTB);
                }
            }
        }

        for (var name in obj.children) {
            if (!obj.children.hasOwnProperty(name))
                continue;
            var c = obj.children[name];
            var repr_string = name + " " + guim.beautifyObjectString(c);

            panel.insertChild(guim.createLabel(0, 0, repr_string));
            if (c.toString() == "[object Object]") {
                // Edit button
                var editBtn = guim.createDefaultButton(0,0,"Edit");
                editBtn.obj = c;
                editBtn.getComponentOfType(ButtonHandler).onClick = (function() {
                    self.editObject(__JSCFEDITOR_ID, this.obj);
                }).bind(editBtn);
                panel.insertChild(editBtn);
            } else {
                panel.insertChild(guim.createDefaultTextBox(0,0,c));
            }
        }

        // seperator
        panel.insertChild(guim.createLabel(0,0,"______________________"));

        // add button
        var addBtn = guim.createDefaultButton(0, 0, "Add");
        addBtn.getComponentOfType(ButtonHandler).onClick = function() {
            game.getCurrentScene().addEntity(self.createAddWindow(obj, panel));
        };
        panel.insertChild(addBtn);

        // close button
        var closeBtn = guim.createDefaultButton(0, 0, "Close");
        closeBtn.getComponentOfType(ButtonHandler).onClick = function() {
            SceneUtils.deleteParent(game, closeBtn);
        };
        panel.insertChild(closeBtn);

        // add layout handler
        panel.addComponent(LayoutHandler);
        panel.getComponentOfType(LayoutHandler).layoutType = FitLayout;

        game.getCurrentScene().addEntity(panel);
    };

    /**
     * creates add property window for object
     *
     * @method
     * @param  {Entity} obj the object to add property to
     * @param  {Entity} panel the creating panel
     * @return {Entity} the window entity
     */
    this.createAddWindow = function(obj, panel)
    {
        var guim = game.guiManager;

        const PANEL_WIDTH = guim.theme.getSize("panel", "width");
        const DP_WIDTH =  PANEL_WIDTH + guim.theme.getSize("panel", "margin");
        const COMPONENT_LIST = [ LayoutHandler, ButtonHandler, Script, Collider, Rigidbody, RectangleEditor ];

        var addWindow = guim.createDefaultWindow(DP_WIDTH*2, PANEL_WIDTH);
        addWindow.name = guim.generateUIName(__JSCFEDITOR_ADD_WINDOW_NAME);
        addWindow.addComponent(LayoutHandler);
        addWindow.getComponentOfType(LayoutHandler).layoutType = FitLayout;

        var self = this;
        var closeFn = function() {
            game.getCurrentScene().delEntity(panel.name);
            self.createInspectionPanel(obj);
            game.getCurrentScene().delEntity(addWindow.name);
        };

        for (var i = 0; i < COMPONENT_LIST.length; i++) {
            var btn = guim.createDefaultButton(0,0,COMPONENT_LIST[i].component_name,null);
            btn.componentType = COMPONENT_LIST[i];
            btn.getComponentOfType(ButtonHandler).onClick = function() {
                obj.addComponent(this.componentType);
                closeFn();
            }.bind(btn);
            addWindow.insertChild(btn);
        }

        var planeBtn = guim.createDefaultButton(0,0,"Plane",function() {
            obj.insertChild(new Plane(game,100,100,"black"));
            closeFn();
        });
        addWindow.insertChild(planeBtn);

        return addWindow;
    };

    /**
     *    create help window
     *
     *    @method
     *    @return {Core.Entity} a help popup entity
     */
    this.createHelpWindow = function()
    {
        var guim = game.guiManager;

        const PANEL_WIDTH = guim.theme.getSize("panel", "width");
        const DP_WIDTH =  PANEL_WIDTH + guim.theme.getSize("panel", "margin");

        var helpPanel = guim.createDefaultWindow(DP_WIDTH*2, PANEL_WIDTH);
        helpPanel.name = guim.generateUIName(__JSCFEDITOR_HELP_PANEL_NAME);
        helpPanel.insertChild(guim.createLabel(0, 0, __JSCFEDITOR_HELP_TEXT));

        return helpPanel;
    };

    /**
     *    toggles the debug panel
     *
     *    @method
     */
    this.toggleDebugPanel = function()
    {
        var guim = game.guiManager;
        var curScene = game.getCurrentScene();

        this.isDebug = !this.isDebug;

        if (this.isDebug) {
            console.log("[jscf-editor] debug panel enabled");
            this.insertDebugPanel();
            guim.insertRectangleEditor();
        } else {
            console.log("[jscf-editor] debug panel disabled");
            guim.delRectangleEditor();
            curScene.delEntity(__GUIMANAGER_DEBUG_PANEL_NAME);
        }
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
        var helpPanel = this.createHelpWindow();

        // Insert panels
        game.getCurrentScene().addEntity(debugPanel);
        game.getCurrentScene().addEntity(helpPanel);
    };

    this.init = function()
    {
        this.isDebug = false;

        var self = this;
        // keybind trigger debug panel
        game.inputManager.setOnKeyUpSpec(__JSCFEDITOR_KB_DEV_TOGGLE, function() {
            self.toggleDebugPanel();
        });
    }

    this.init();
}

function set_property(obj)
{
    obj[this.prop] = this.value();
}
