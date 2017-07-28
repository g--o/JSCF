
function SceneManager()
{
    this.scenes = { "splash":new Scene() };
    this.cur_scene = this.scenes["splash"];

    this.update = function()
    {
        return this.cur_scene.update();
    };

    this.render = function()
    {
        return this.cur_scene.render();
    };

    this.getCurrentScene = function()
    {
        return this.cur_scene;
    };

    this.setCurrentScene = function(scene)
    {
        if (!scene || !this.scenes[scene]) {
            console.warn("[JSCF] tried to change into an invalid scene!");
            return false;
        }
        this.cur_scene = this.scenes[scene];
        return true;
    };

    this.createScene = function(sceneName)
    {
        if (!sceneName) {
            console.warn("[JSCF] got an invalid scene name in creation!");
            return false;
        } else if(this.scenes[sceneName]) {
            console.warn("[JSCF] scene " + sceneName + " already exists (scene creation)!");
            return false;
        }
        this.scenes[sceneName] = new Scene();
        return true;
    };

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
