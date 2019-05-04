/**
 * @class
 * @classdesc graphics related management (mainly canvas)
 * @memberof Graphics
 *
 * @param {Number} canvasWidth  the width of the canvas to be created.
 * @param {Number} canvasHeight  the height of the canvas to be created.
 *
 * @note: If canvasWidth or canvasHeight is negative, then they get the
 *        window's corresponding size.
 * @constructor
 */
function Graphics(canvasWidth, canvasHeight)
{

    // c'tor
    this.init = function() {

        if (document.body == null) {
            alert("JSCF: Fatal error!\nCan't initialize graphics before body is loaded!")
        }

        this.canvas = document.createElement("canvas");
        this.canvas.id = "GameCanvas";

        if (canvasWidth < 0)
            this.canvas.width = window.innerWidth;
        else
            this.canvas.width = canvasWidth;
        if (canvasHeight < 0)
            this.canvas.height = window.innerHeight;
        else
            this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    };
    // call c'tor
    this.init();

    /**
     * clear - clears the canvas
     * @return  null
     */
    this.clear = function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

}
