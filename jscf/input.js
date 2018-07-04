
/**
 * @class
 * @classdesc the input manager of the engine's game object.
 *
 * @param {Canvas} canvas   the canvas object (usually from the Graphics module).
 *
 * @constructor
 */
function InputManager(canvas)
{
    var keys = [];
    var mouseX = 0, mouseY = 0;
    var mouseDown = false;
    var mouseEvent = -1;

    /**
     *    checks if a certain key is down (currently pressed)
     *
     *    @method
     *    @param  {String} c key character
     *    @return {Boolean}  true if key is pressed; false otherwise.
     */
    this.isKeyDownChar = function(c) {
        return keys[c.toUpperCase().charCodeAt()];
    };

    /**
    *    checks if a certain key is down (currently pressed)
     *
     *    @method
     *    @param  {Number} code key code (number)
     *    @return {Boolean}  true if key is pressed; false otherwise.
     */
    this.isKeyDown = function(code) {
        return keys[code];
    };

    /**
     *    get mouse x position
     *
     *    @method
     *    @return {Number} mouse x position
     */
    this.getMouseX = function()
    {
        return mouseX;
    }

    /**
     *    get mouse y position
     *
     *    @method
     *    @return {Number} mouse y position
     */
    this.getMouseY = function()
    {
        return mouseY;
    }

    /**
     *    checks if mouse is down (mouse button is pressed)
     *
     *    @method
     *    @return {Boolean} true if mouse button is pressed; false otherwise.
     */
    this.IsMouseDown = function()
    {
        return mouseDown;
    };

    /**
     *    get last mouse event
     *
     *    @method
     *    @return {MouseEvent} the mouse event
     */
    this.getMouseEvent = function()
    {
        return mouseEvent;
    };

    /**
     *    register callback to mouse up
     *
     *    @method
     *    @param  {Function} callback callback function(e) to be called when mouseup is fired.
     */
    this.setOnMouseUp = function(callback)
    {
        document.addEventListener("mouseup", callback);
    };

    /**
    *    register callback to mouse down
     *
     *    @method
     *    @param  {Function} callback callback function(e) to be called when mousedown is fired.
     */
    this.setOnMouseDown = function(callback)
    {
        document.addEventListener("mousedown", callback);
    };

    function updateMouseDown(e)
    {
        e.preventDefault();
        mouseEvent = e;
        mouseDown = true;
    }

    function updateMouseUp(e)
    {
        e.preventDefault();
        mouseEvent = e;
        mouseDown = false;
    }

    function updateKeyTrue(e)
    {
        keys[e.keyCode] = true;
    }

    function updateKeyFalse(e)
    {
        keys[e.keyCode] = false;
    }

    function updateMousePosition(e)
    {
        mouseX = e.clientX - canvas.offsetLeft;
        mouseY = e.clientY - canvas.offsetTop;
    }

    document.addEventListener("keydown", updateKeyTrue);
    document.addEventListener("keyup", updateKeyFalse);
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener('contextmenu', function() { event.preventDefault() } );
    this.setOnMouseDown(updateMouseDown);
    this.setOnMouseUp(updateMouseUp);

}
