
function Entity(name, alive, spr, automated)
{
    this.name = name;
    this.alive = alive;
    this.spr = spr;
    this.auto_physics = automated;
    this.auto_render = automated;
    this.auto_update = automated;
    this.render = spr.render;
}
