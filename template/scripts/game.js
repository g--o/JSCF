
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

function loadResources()
{

}

function loadScene()
{

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
