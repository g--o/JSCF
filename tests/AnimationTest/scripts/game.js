
// Consts
const RIGHT = 39;
const LEFT = 37;
const DOWN = 40;
const UP = 38;

const SPEED = 5;
const SPRITE_WIDTH = 46;
const SPRITE_HEIGHT = 40;

// Game objects
var player;
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

function logic()
{
    //player.updateAnim();
    if (Math.floor(game.time.getTimeFromStart()) % 1000 == 0)
        player.anim.nextAnimation();
}

function render()
{
    // clear canvas
    game.graphics.clear();
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
    player = new AnimSprite(game, SPRITE_WIDTH, SPRITE_HEIGHT, game.assetManager.getAssetPath("coin.png"),  44, 40, 30);
    player.startAnimation();

    game.start(update, false);

    // center player
    game.graphics.context.translate(player.spr.width/2, player.spr.height/2);
}
