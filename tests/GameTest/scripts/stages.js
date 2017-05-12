

var bg;

function setLevel1()
{
    var floors;
    const canvasWidth = game.getCanvasWidth();
    const canvasHeight = game.getCanvasHeight();
    bg = new Sprite(game, canvasWidth/2,canvasHeight/2,canvasWidth, canvasHeight, game.assetManager.getAssetPath("bg.png"));
    floors = SceneUtils.makeFloor(game, 0,20,canvasWidth/2, 64, game.assetManager.getAssetPath("stone_top.png"));
    floors = floors.concat(SceneUtils.makeFloor(game, canvasWidth/2+64*3, 20, canvasWidth, 64, game.assetManager.getAssetPath("stone_top.png")));
    return floors;
}
