
// Consts
var RIGHT = 39;
var LEFT = 37;
var DOWN = 40;
var UP = 38;

var SPEED = 5;

// Game objects
var player;
var platforms = [];
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

// Input handler
function input()
{
    var tweak = 0;

    if (player.type == FLATY)
        tweak = 90;

    // Movement
    if (game.inputManager.isKeyDown(RIGHT)) {
        // scroll
        if (player.s.rect.x < game.getCanvasWidth()) {
            bg.rect.x+=SPEED;
            game.graphics.context.translate(-SPEED,0);
        }

        player.s.rect.angle = MathUtils.toRad(tweak+90);
        player.s.rect.x+=SPEED;
    }

    if(game.inputManager.isKeyDown(LEFT)) {
        // scroll
        if(player.s.rect.x < game.getCanvasWidth()) {
            bg.rect.x-=SPEED;
            game.graphics.context.translate(SPEED,0);
        }
        // rotate
        player.s.rect.angle = MathUtils.toRad(tweak+270);
        player.s.rect.x-=SPEED;
    }

    // no ups or downs if FLATY
    if(player.type != FLATY) {
        if(game.inputManager.isKeyDown(UP))
            player.s.rect.angle = MathUtils.toRad(tweak+0);
        if(game.inputManager.isKeyDown(DOWN))
            player.s.rect.angle = MathUtils.toRad(tweak+180);
    }

    // Reshape
    if(game.inputManager.isKeyDownChar('a'))
        player.setPointy();
    if(game.inputManager.isKeyDownChar('s'))
        player.setCircley();
    if(game.inputManager.isKeyDownChar('d'))
        player.setFlaty();
}

function collisions()
{
    // a VERY dumb collision system cause we don't have time!
    var isFalling = true;

    for (var i = 0; i < platforms.length; i++) {
        if (player.s.rect.isColliding(platforms[i].rect)) {
            isFalling = false;
            break;
        }
    }

    if(isFalling)
        player.s.rect.y+=SPEED;
}

function logic()
{
    input();       // handle input
    collisions();

    if (player.s.rect.y-64 > game.getCanvasHeight()) {
        document.getElementById('status').innerHTML = "<h1>Game Over!</h1>";
        clearInterval(game.interval);
    }
}

function render()
{
    game.graphics.clear();   // clear canvas
    // render BG
    bg.render();
    // render level
    for (var i = 0; i < platforms.length; i++)
        platforms[i].render();
    // render player.
    player.Render();
}

function update()
{
    logic();
    render();
}

function gameStart()
{
    game.setup();
    platforms = setLevel1();
    player = new Player(game);
    game.start(update);
}
