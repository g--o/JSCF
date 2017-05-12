
// SceneUtils is a static-like class

var SceneUtils = {

    makeFloor : function(game,x,y,floor_width,tile_side,type) {
        var platforms=[];

        for(var i = 0; i < floor_width/tile_side; i++)
            platforms[i] = new Sprite(game, x + tile_side * i + tile_side/2, y + game.getCanvasHeight() - tile_side/2, tile_side, tile_side, type);
        return platforms
    }
};
