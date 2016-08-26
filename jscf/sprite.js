
function Sprite(game, x, y, width, height, url)
{
    this.rect = new Rect(game,x,y,width,height);
    this.image = new Image();
    this.image.src = url;

    this.start_update = function()
    {
        var ctx = game.graphics.context;

        ctx.save();
        ctx.translate(this.rect.x, this.rect.y);
        ctx.rotate(this.rect.angle);
    };

    this.end_update = function()
    {
         game.graphics.context.restore();
    };

    this.render = function()
    {
        this.start_update();

        game.graphics.context.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                                                    this.rect.width/-2,this.rect.height/-2,this.rect.width, this.rect.height);
        this.end_update();
    };

    this.setImageSrcFromAsset = function(asset) {
        this.image.src = game.assetManager.getAssetPath(asset);
    };

}
