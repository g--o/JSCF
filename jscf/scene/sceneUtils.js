
// SceneUtils is a static-like class

/**
 * Scene utilities - serves as a static-like class to access scene utils.
 *
 * @memberof Scene
 */
var SceneUtils = {

    /**
     *    makes a sprite floor inefficently
     *
     *    @method
     *    @param  {Core.Game} game        the game object
     *    @param  {Number} x           the initial x position
     *    @param  {Number} y           the initial y position
     *    @param  {Number} floor_width the floor's width
     *    @param  {Number} tile_side   the sprite tile's side (assumes square)
     *    @return {Array}              array of platforms
     */
    makeFloor : function(game,x,y,floor_width,tile_side,type) {
        var platforms=[];
        //
        // for(var i = 0; i < floor_width/tile_side; i++) {
        //     platforms[i] = new Entity(game, "plat", true, x + tile_side * i + tile_side/2, y + game.getCanvasHeight() - tile_side/2, false);
        //     platforms[i].AddShapedChild("spr", new Sprite(game, tile_side, tile_side, type));
        // }
        return platforms
    }
};
