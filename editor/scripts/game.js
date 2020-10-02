
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
