/**
 * @class
 * @classdesc the input manager of the engine's game object.
 * @memberof Input
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
    this.isMouseDown = function()
    {
        return mouseDown;
    };

    /**
     *    checks if left mouse button is down
     *
     *    @method
     *    @return {Boolean} true if pressed; false otherwise
     */
    this.isLMBDown = function()
    {
        return mouseDown && (mouseEvent.button == 0);
    };

    /**
     *    checks if right mouse button is down
     *
     *    @method
     *    @return {Boolean} true if pressed; false otherwise
     */
    this.isRMBDown = function()
    {
        return mouseDown && (mouseEvent.button == 2);
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

    /**
     *    register callback to key up
     *
     *    @method
     *    @param  {Function} callback callback function(event) to be called when keyup is fired
     */
    this.setOnKeyUp = function(callback)
    {
        document.addEventListener("keyup", callback);
    };

    /**
     *    register callback to key up for specific key
     *
     *    @method
     *    @param  {Number}   key      the key code of the key that fires the event
     *    @param  {Function} callback callback function(event) to be called when keyup is fired with key
     */
    this.setOnKeyUpSpec = function(key, callback)
    {
        this.setOnKeyUp(function(e) {
            if (e.keyCode == key)
                callback();
        });
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

    function updateDrop(e)
    {
        e.preventDefault();
        e.stopPropagation();
        var files = e.dataTransfer.files; // Array of all files

        for (var i=0, file; file=files[i]; i++) {
            var reader = new FileReader();
            reader.onload = function(e2) {
                InputManager.droppedFileCallback(e2.target.result);
            }
            reader.readAsText(file);
        }
    }

    function readTextFile(file){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        }
        rawFile.send(null);
    }

    document.addEventListener("keydown", updateKeyTrue);
    document.addEventListener("keyup", updateKeyFalse);
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("contextmenu", function(ev) { ev.preventDefault() } );
    window.addEventListener("dragover",function(e){ e = e || event; e.preventDefault(); },false);
    window.addEventListener("drop",updateDrop,false);
    this.setOnMouseDown(updateMouseDown);
    this.setOnMouseUp(updateMouseUp);

}

InputManager.droppedFileCallback = function() { console.log("[JSCF] file dropped!"); };
