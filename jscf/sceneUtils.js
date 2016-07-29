
// SceneUtils is a static-like class

var SceneUtils = {

    makeFloor : function(game, x, y, floor_width ,tile_width, type)
    {
        var platforms = [];

        for(var i = 0; i < floor_width/tile_width; i++)
            platforms[i] = new Sprite(game, x+64*i+32,y+game.getCanvasHeight()-32, 64, 64, type);

        return platforms;
    }
};
