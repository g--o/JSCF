/**
 * @class
 * @classdesc sound player class.
 * @memberof Sound
 *
 * @param       {String} src URL to sound to play
 * @constructor
 */
function SoundPlayer(src)
{
    /**
     *    the sound element
     *
     *    @type {DOMElement}
     */
    this.sound = document.createElement("audio");
    this.sound.style.display = "none";
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    document.body.appendChild(this.sound);

    /**
     *    play the loaded sound.
     *
     *    @method
     */
    this.play = function() {
        this.sound.play();
    };

    /**
     *    stop playing the loaded sound.
     *
     *    @method
     */
    this.stop = function() {
        this.sound.pause();
    };
}
