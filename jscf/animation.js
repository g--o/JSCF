

function Animation(game, sprite, frameWidth, frameHeight, speed)
{
    this.spr = sprite;
    this.frame = new AnimFrame(0, 0, frameWidth, frameHeight);
    this.frameCounter = 0;

    this.setAnimationIndex = function(i)
    {
        this.frame.setAnimationIndex(i, this.spr.image.height);
    };

    this.setFrameIndex = function(i)
    {
        this.frame.setFrameIndex(i, this.spr.image.width);
    };

    this.nextAnimation = function()
    {
        this.frame.nextAnimation(this.spr.image.height);
    };

    this.nextFrame = function()
    {
        this.frame.nextFrame(this.spr.image.width);
    };

    this.updateFrame = function()
    {
        this.frameCounter = (this.frameCounter + 1) % Math.floor(game.fps / speed);
        if (this.frameCounter == 0)
            this.nextFrame();
    };

    this.render = function()
    {
        game.graphics.context.drawImage(this.spr.image,
            this.frame.px ,this.frame.py,
            this.frame.w, this.frame.h,
            this.spr.width/-2, this.spr.height/-2,
            this.spr.width, this.spr.height);
    };
}
