
// Consts
var RIGHT = 39;
var LEFT = 37;
var DOWN = 40;
var UP = 38;

var SPEED = 5;

// Game objects
var player;
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

function logic()
{
    //player.updateAnim();
    if (game.inputManager.isKeyDown(13))
        player.anim.nextAnimation();
}

function render()
{
    game.graphics.clear();   // clear canvas
    // render player.
    player.render();
}

function update()
{
    logic();
    render();
}

function gameStart()
{
    game.setup();
    player = new AnimSprite(game, 23, 20, 46, 40, game.assetManager.getAssetPath("coin.png"),  44, 40, 30);
    player.startAnimation();
    game.start(update);
}
