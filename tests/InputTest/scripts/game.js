
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var x = 0, y = 0;

function render()
{
    game.graphics.clear();   // clear canvas
    // render square as test.
    game.renderText(x, y, "lovely", "red", "30px Comic Sans MS");
}

function update()
{
    x = game.inputManager.getMouseX();
    y = game.inputManager.getMouseY();
    render();
}

function gameStart()
{
    game.setup();
    game.start(update);
}
