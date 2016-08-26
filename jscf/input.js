
function InputManager(canvas)
{
    var keys = [];
    var mouseX, mouseY;

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

    function updateKeyTrue(e) {
        keys[e.keyCode] = true;
    }

    function updateKeyFalse(e) {
        keys[e.keyCode] = false;
    }

    function updateMousePosition(e)
    {
        mouseX = e.clientX - canvas.offsetLeft;
        mouseY = e.clientY - canvas.offsetTop;
    }

    document.addEventListener("keydown", updateKeyTrue);

    document.addEventListener("keyup", updateKeyFalse);

    document.addEventListener("mousemove", updateMousePosition)

}
