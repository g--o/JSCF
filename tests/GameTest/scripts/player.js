
var POINTY = 0;
var CIRCLEY = 1;
var FLATY = 2;

function Player(game)
{
    this.s = new Sprite(game, 100, game.getCanvasHeight()-64,50,50, game.assetManager.getAssetPath("pointy.png"));
    this.type = POINTY;

    this.setPointy = function()
    {
        this.s.setImageSrcFromAsset("pointy.png");
        this.s.rect.width = 50;
        this.s.rect.height = 50;
        this.type = POINTY;
    };

    this.setCircley = function()
    {
        this.s.setImageSrcFromAsset("circley.png");
        this.s.rect.width = 50;
        this.s.rect.height = 50;
        this.type = CIRCLEY;
    };

    this.setFlaty = function()
    {
        var x,y;

        this.s.setImageSrcFromAsset("flaty.png");
        this.s.rect.width = 64*2.0;
        this.s.rect.height = 16*2.0;
        this.s.rect.angle = MathUtils.toRad(0);
        this.type = FLATY;
    };

    this.Render = function()
    {
        this.s.render();
    };

}
