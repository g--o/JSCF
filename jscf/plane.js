
function Plane(game, x, y, width, height, color)
{
    this.rect = new Rect(game, x, y, width, height);
    this.color = color;

    this.render = function()
    {
        ctx = game.graphics.context;
        ctx.fillStyle = this.color;

        this.rect.render();
    };
}
