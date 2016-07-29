
function Sprite(game, x, y, width, height, url)
{
    this.rect = new Rect(game,x,y,width,height);
    this.image = new Image();
    this.image.src = url;

    this.render = function()
    {
        var ctx = game.graphics.context;

        ctx.save();
        ctx.translate(this.rect.x, this.rect.y);
        ctx.rotate(this.rect.angle);

        ctx.drawImage(this.image,
        this.rect.width / -2,
        this.rect.height / -2,
        this.rect.width, this.rect.height);

        ctx.restore();
    };

    this.setImageSrcFromAsset = function(asset) {
        this.image.src = game.assetManager.getAssetPath(asset);
    };

}
