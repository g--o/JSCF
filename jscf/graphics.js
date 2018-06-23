
// If canvasWidth or canvasHeight is negative, then they get the
// window's corresponding size.
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
            this.canvas.width = window.innerWidth-50;
        else
            this.canvas.width = canvasWidth;
        if (canvasHeight < 0)
            this.canvas.height = window.innerHeight-50;
        else
            this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    };
    // call c'tor
    this.init();

    this.clear = function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

}
