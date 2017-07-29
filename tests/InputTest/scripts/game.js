
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var square;
var x = 0, y = 0;

function render()
{
    game.graphics.clear();   // clear canvas
    // render square as test.
    square.render();
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
    square = new Plane(game, 140, 140, "green");
    game.start(update);
}
