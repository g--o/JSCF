
function Game(canvasWidth, canvasHeight, fps, assetDir) {

    // c'tor
    this.init = function()
    {
        this.state = "loading";
        this.fps = fps;
        this.interval = null;
        this.inputManager = null;
        this.assetManager = null;
        this.graphics = null;
        this.update = null;
        this.automated = true;
        this.resourceManager = new ResourceManager();
        this.assetManager = new AssetManager(assetDir);
        this.sceneManager = new SceneManager();
    };
    // calling c'tor
    this.init();

    // State functions
    this.setup = function()
    {
        this.graphics = new Graphics(canvasWidth, canvasHeight);
        this.inputManager = new InputManager(this.graphics.canvas);
    };

    this.start = function(update, automated) {
        if (this.state != "running") {
            this.update = update;
            this.automated = automated;
            this.state = "running";
            var self = this;
            this.interval = setInterval(function() {
                self.handler();
            }, 1000.0/fps);
        }
    };

    this.stop = function() {
        if (this.interval != null)
            clearInterval(this.interval);
    };

    // Automated handler fucntions

    this.handler = function()
    {
        if (this.automated) {
            this.sceneManager.update();
            this.graphics.clear();
            this.sceneManager.render();
        }
        if (this.update)
            this.update();
    };

    this.getCurrentScene = function()
    {
        return this.sceneManager.getCurrentScene();
    };

    // Graphics functions

    this.getCanvasWidth = function() {
        if (this.graphics != null)
            return this.graphics.canvas.width;
        else
            return canvasWidth;
    }

    this.getCanvasHeight = function() {
        if (this.graphics != null)
            return this.graphics.canvas.height;
        else
            return canvasHeight;
    }

    this.FPS2AnimSpeed = function(fps) {
        return fps * this.fps;
    };

    this.renderText = function(x, y, txt, color, font) {
        var ctx = this.graphics.context;
        if (font)
            ctx.font = font;
        if (color)
            ctx.fillStyle = color;
        ctx.fillText(txt, x, y);
    }

}
