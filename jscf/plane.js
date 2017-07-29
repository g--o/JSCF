
function Plane(game, width, height, color)
{
    this.width = width;
    this.height = height;
    this.color = color;

    this.render = function()
    {
        ctx = game.graphics.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    };
}
