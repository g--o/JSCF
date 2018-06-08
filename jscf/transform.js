

function Transform(x, y, xscale, yscale)
{
    x = x?x:0, y = y?y:0;
    xscale = xscale?xscale:1, yscale = yscale?yscale:1;

    // position
    this.pos = new Vector2d(x, y);
    // scaling
    this.scale = new Vector2d(xscale, yscale);
    // rotating
    this.angle = 0;
}
