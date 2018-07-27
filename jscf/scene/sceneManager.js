
/**
 * Scene manager.
 * @param       {Game} game             the game object
 * @param       {Number} tick_duration  the default tick duration for a new scene.
 * @constructor
 */
function SceneManager(game, tick_duration)
{
    this.tickDuration = tick_duration;
    this.scenes = { "splash": new Scene(game, this.tickDuration) };
    this.cur_scene = this.scenes["splash"];

    /**
     *    update scene manager (current scene)
     *
     *    @method
     *    @return {Boolean} scene's update return value
     */
    this.update = function()
    {
        return this.cur_scene.update();
    };

    /**
     *    render scene manager (current scene)
     *
     *    @method
     *    @return {Boolean} scene's render return value
     */
    this.render = function()
    {
        return this.cur_scene.render();
    };

    /**
     *    gets the current scene
     *
     *    @method
     *    @return {Scene} the current scene
     */
    this.getCurrentScene = function()
    {
        return this.cur_scene;
    };

    /**
     *    sets current scene
     *
     *    @method
     *    @param  {Scene} scene a scene to set
     *    @return {Boolean}     true if was set; false otherwise.
     */
    this.setCurrentScene = function(scene)
    {
        if (!scene || !this.scenes[scene]) {
            console.warn("[JSCF] tried to change into an invalid scene!");
            return false;
        }
        this.cur_scene = this.scenes[scene];
        return true;
    };

    /**
     *    creates a scene
     *
     *    @method
     *    @param  {String} sceneName scene name
     *    @return {Boolean}          true if created; false otherwise
     */
    this.createScene = function(sceneName)
    {
        if (!sceneName) {
            console.warn("[JSCF] got an invalid scene name in creation!");
            return false;
        } else if(this.scenes[sceneName]) {
            console.warn("[JSCF] scene " + sceneName + " already exists (scene creation)!");
            return false;
        }
        this.scenes[sceneName] = new Scene(game, this.tickDuration);
        return true;
    };

    /**
     *    deltes scene by name
     *
     *    @method
     *    @param  {String} sceneName the scene name for deletetion
     *    @return {Boolean}          true if deleted; false otherwise.
     */
    this.deleteScene = function(sceneName) {
        if (!sceneName) {
            console.warn("[JSCF] got an invalid scene name in deletion!");
            return false;
        } else if(!this.scenes[sceneName]) {
            console.warn("[JSCF] scene " + sceneName + " doesn't exists (scene creation)!");
            return false;
        }
        return true;
    };

}
