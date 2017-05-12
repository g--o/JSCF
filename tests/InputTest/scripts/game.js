
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var square;

function render()
{
    game.graphics.clear();   // clear canvas
    // render square as test.
    square.render();
    game.renderText(square.rect.x, square.rect.y, "lovely", "red", "30px Comic Sans MS");
}

function update()
{
    square.rect.x = game.inputManager.getMouseX();
    square.rect.y = game.inputManager.getMouseY();
    render();
}

function gameStart()
{
    game.setup();
    square = new Plane(game, 50, 50, 40, 40, "green");
    game.start(update);
}
