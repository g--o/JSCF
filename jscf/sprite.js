
function Sprite(game, width, height, url)
{
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = url;

    this.render = function()
    {
        game.graphics.context.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                                                    this.width/-2,this.height/-2,this.width, this.height);
    };

    this.setImageSrcFromAsset = function(asset) {
        this.image.src = game.assetManager.getAssetPath(asset);
    };

}
