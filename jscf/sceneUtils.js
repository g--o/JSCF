
// SceneUtils is a static-like class

/**
 * Scene utilities - serves as a static-like class to access scene utils.
 */
var SceneUtils = {

    makeFloor : function(game,x,y,floor_width,tile_side,type) {
        var platforms=[];

        for(var i = 0; i < floor_width/tile_side; i++) {
            platforms[i] = new Entity(game, "plat", true, x + tile_side * i + tile_side/2, y + game.getCanvasHeight() - tile_side/2, false);
            platforms[i].AddShapedChild("spr", new Sprite(game, tile_side, tile_side, type));
        }
        return platforms
    }
};
