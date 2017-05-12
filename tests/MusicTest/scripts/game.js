
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var square;
var bgm;

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
    square = new Plane(game, 20, 20, 40, 40, "green");
    bgm = new SoundPlayer(game.assetManager.getAssetPath("INGAME.mp3"));
    //alert(game.assetManager.getExtention("ingame.mp3"));
    game.start(update);
    bgm.play();
}
