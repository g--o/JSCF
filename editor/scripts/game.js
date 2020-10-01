
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var editor = null;

function loadResources()
{
	editor = new JSCFEditor(game);
	editor.init();
}

function loadScene()
{
	game.debug = true;
	game.inputManager.setOnMouseDown(function() {
		if (game.inputManager.isKeyDown(__RECTANGLE_GRAB_BUTTON)) {
			var tb = game.getCurrentScene().getEntity(__GUIMANAGER_DEBUG_PANEL_NAME).getChildAt(6);
			var name = "";
			if (RectangleEditor.currently_selected)
				name = RectangleEditor.currently_selected.name;
			tb.getChildAt(0).textBox.value(name);
		}
	});
	editor.toggleDebugPanel();
}

function update()
{

}

function gameStart()
{
	game.setup();
	// load game resources
	loadResources();
	loadScene();
	// start game
	game.start(update, true);
}
