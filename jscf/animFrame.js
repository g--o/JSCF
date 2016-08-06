
function AnimFrame(px, py, w, h)
{
    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;

    this.getAnimationIndex = function()
    {
        return this.px / this.w;
    };

    this.getFrameIndex = function()
    {
        return this.py / this.h;
    };

    this.setAnimationIndex = function(i, max_height)
    {
        this.py = (this.py + this.h * i) % max_height;
    };

    this.setFrameIndex = function(i, max_width)
    {
        this.px = (i * this.w) % max_width;
    };

    this.nextAnimation = function(max_height)
    {
        this.py = (this.py + this.h) % max_height;
    };

    this.nextFrame = function(max_width)
    {
        this.px =  (this.px + this.w) % max_width;
    };
}
