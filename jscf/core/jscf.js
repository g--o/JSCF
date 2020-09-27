 /**
  * @class
  * @classdesc Game is the engine's game object to interface with.
  * @memberof Core
  *
  * @param  {Number} canvasWidth  The width of the game canvas
  * @param  {Number} canvasHeight The height of the game canvas
  * @param  {Number} fps          The frames per second to lock to
  * @param  {String} assetDir     The assets directory
  * @constructor
  */
function Game(canvasWidth, canvasHeight, fps, assetDir) {

    // c'tor
    this.init = function()
    {
        // time related
        this.lastDelay = 0;
        this.time = new Time(fps);
        this.renderTime = new Time(fps);
        this.interval = null;
        this.renderInterval = null;

        this.graphics = null;
        this.update = null;
        this.automated = true;
        this.debug = false;

        /**
         *    current state
         *
         *    @type {String}
         */
        this.state = "loading";


        // Managers
        /**
         *    input manager
         *
         *    @type {Input.InputManager}
         */
        this.inputManager = null;
        /**
         *    gui manager
         *
         *    @type {UI.GuiManager}
         */
        this.guiManager = null;
        /**
         *    resource manager
         *
         *    @type {Resources.ResourceManager}
         */
        this.resourceManager = new ResourceManager();
        /**
         *    assetManager
         *
         *    @type {Resources.AssetManager}
         */
        this.assetManager = new AssetManager(assetDir);
        /**
         *    sceneManager
         *
         *    @type {Scene.SceneManager}
         */
        this.sceneManager = new SceneManager(this);
    };
    // calling c'tor
    this.init();

    // State functions

    /**
     * Setup    initiate the game object.
     *          Should be called after document body has been loaded.
     * @return  null
     **/
    this.setup = function()
    {
        this.graphics = new Graphics(canvasWidth, canvasHeight);
        this.inputManager = new InputManager(this.graphics.canvas);
        this.guiManager = new GuiManager(this);

        var self = this;
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            if (self.debug)
                self.warn(msg + ": " + error + "\n " + url);
            return false;
        };

    };

    /**
     * Start - start the game engine
     *
     * @param {Function} update     the update function (called each engine step)
     * @param {Boolean} automated   set whether the engine should automate update & render
     *
     * @method
     **/
    this.start = function(update, automated) {
        if (this.state != "running") {
            this.update = update;
            this.automated = automated;
            this.state = "running";

            if (this.time.isFixedTime()) {
                this.interval = setInterval(this.handler.bind(this), 1000.0 * this.time.getDeltaTime());
            } else {
                this.updateLoop();
                this.renderLoop();
            }
        }
    };

    /**
     * Stop - stops the game engine
     *
     * @return  null
     **/
    this.stop = function() {
        if (this.interval != null)
            clearInterval(this.interval);
        if (this.renderInterval)
            cancelAnimationFrame(this.renderInterval);
    };

    // Automated handler fucntions

    this.handler = function()
    {
        this.time.update();

        if (this.automated) {
            this.sceneManager.update();
            this.graphics.clear();
            this.sceneManager.render();
        }
        if (this.update)
            this.update();
    };

    /**
     *    (internal) fast as possible update loop
     *
     *    @method
     */
    this.updateLoop = function()
    {
        this.time.update();
        if (this.automated)
            this.sceneManager.update();
        if (this.update)
            this.update();
        if (this.automated)
            this.guiManager.resetFocus();

        this.lastDelay = (this.lastDelay + this.time.getDeltaTime())/2.0;
        setTimeout(this.updateLoop.bind(this), this.lastDelay);
    };

    /**
     *    (internal) Synchronized render loop
     *
     *    @method
     */
    this.renderLoop = function()
    {
        this.renderTime.update();
        this.graphics.clear();
        this.sceneManager.render();

        if (this.automated)
            this.renderInterval = requestAnimationFrame(this.renderLoop.bind(this), this.graphics.canvas);
    };

    /**
     *    gets the current scene
     *
     *    @method
     *    @return {Scene.Scene} the current scene
     */
    this.getCurrentScene = function()
    {
        return this.sceneManager.getCurrentScene();
    };

    // Graphics functions

    /**
     * getCanvasWidth   get game canvas width
     * @return {Number} the canvas width
     **/
    this.getCanvasWidth = function() {
        if (this.graphics != null)
            return this.graphics.canvas.width;
        else
            return canvasWidth;
    };

    /**
     * getCanvasHeight   get game canvas height
     * @return {Number} the canvas height
     **/
    this.getCanvasHeight = function() {
        if (this.graphics != null)
            return this.graphics.canvas.height;
        else
            return canvasHeight;
    };

    this.GetAnimSpeed = function(fps_) {
        return fps_ * this.time.getDeltaTime();
    };

    /**
     * renderText   renders text to canvas
     *
     * @param {Number} x        position to render text to
     * @param {Number} y        position to render text to
     * @param {String} txt      the text to render
     * @param {String} style 2d context style, can be also color description (e.g: "#fff")
     * @param {String} font 2d  context font string
     *
     * @return  null
     **/
    this.renderText = function(x, y, txt, style, font) {
        var ctx = this.graphics.context;
        if (font)
            ctx.font = font;
        if (style)
            ctx.fillStyle = style;
        ctx.fillText(txt, x, y);
    };

    // Miscellaneous

    /**
     *    Logs and stops the game.
     *
     *    @method
     *    @param: {string} msg  the message to log.
     */
    this.logAndStop = function(msg)
    {
        console.log(msg);
        this.stop();
    };

    /**
     *    warns if in debug mode
     *
     *    @method
     *    @param  {String} msg warning message
     */
    this.warn = function(msg)
    {
        this.guiManager.errorPopup(msg);
    };

}
