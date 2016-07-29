
function InputManager()
{
    var keys = [];

    this.isKeyDownChar = function(c) {
        return keys[c.toUpperCase().charCodeAt()];
    };

    this.isKeyDown = function(code) {
        return keys[code];
    };

    function updateKeyTrue(e) {
        keys[e.keyCode] = true;
    }

    function updateKeyFalse(e) {
        keys[e.keyCode] = false;
    }

    document.addEventListener("keydown", updateKeyTrue);

    document.addEventListener("keyup", updateKeyFalse);

}
