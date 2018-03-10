
var POINTY = 0;
var CIRCLEY = 1;
var FLATY = 2;

function Player(game)
{
    this.s = new Sprite(game,50,50, game.assetManager.getAssetPath("pointy.png"));
    this.type = POINTY;
    this.rect = new Rect(100, game.getCanvasHeight()-64, 50, 50);

    this.setPointy = function()
    {
        this.s.setImageSrcFromAsset("pointy.png");
        this.rect.width = 50;
        this.rect.height = 50;
        this.s.width = this.rect.width;
        this.s.height = this.rect.height;
        this.type = POINTY;
    };

    this.setCircley = function()
    {
        this.s.setImageSrcFromAsset("circley.png");
        this.rect.width = 50;
        this.rect.height = 50;
        this.s.width = this.rect.width;
        this.s.height = this.rect.height;
        this.type = CIRCLEY;
    };

    this.setFlaty = function()
    {
        this.s.setImageSrcFromAsset("flaty.png");
        this.rect.width = 64*2.0;
        this.rect.height = 16*2.0;
        this.s.width = this.rect.width;
        this.s.height = this.rect.height;
        this.s.rect.angle = MathUtils.toRad(0);
        this.type = FLATY;
    };

    this.Render = function()
    {
        game.graphics.context.save();
        game.graphics.context.translate(this.rect.x, this.rect.y);
        this.s.render();
        game.graphics.context.restore();
    };

}
