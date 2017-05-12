
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

function render()
{
    game.graphics.clear();   // clear canvas
    // render square as test.
    square.render();
}

function update()
{
    render();
}

function gameStart()
{
    game.setup();
    game.start(update);
    bgm.play();
}
