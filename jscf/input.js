
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

    this.isKeyDownChar = function(c) {
        return keys[c.toUpperCase().charCodeAt()];
    };

    this.isKeyDown = function(code) {
        return keys[code];
    };

    this.getMouseX = function()
    {
        return mouseX;
    }

    this.getMouseY = function()
    {
        return mouseY;
    }

    this.IsMouseDown = function()
    {
        return mouseDown;
    };

    this.getMouseEvent = function()
    {
        return mouseEvent;
    };

    this.setOnMouseUp = function(callback)
    {
        document.addEventListener("mouseup", callback);
    };

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
