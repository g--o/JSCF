
function SceneManager()
{
    this.scenes = { "splash":new Scene() };
    this.cur_scene = this.scenes["splash"];

    this.update = function()
    {
        this.cur_scene.update();
    }

    this.render = function()
    {
        this.cur_scene.render();
    }
}
