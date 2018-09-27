/**
 * @class
 * @classdesc the time class
 * @memberof Core
 *
 * @param {Number} fps 	fixed tick duration by fps. if negative tick isn't fixed.
 *
 * @constructor
 */
function Time(fps)
{
    /**
     *    get time from engine start
     *
     *    @method
     *    @return {Number} time from engine start
     */
    this.getTimeFromStart = function()
    {
        return Time.getTime() - this.startTime;
    };

    /**
     *    gets the delta time between updates
     *
     *    @method
     *    @return {Number} the delta time
     */
    this.getDeltaTime = function()
    {
        return this.dt;
    };

	/**
	 *    updates time & delta time
	 *
	 *    @method
	 */
	this.update = function()
	{
		if (this.isFixedTime())
			return;

		var newTime = Time.getTime();
		this.dt = (newTime - this.lastTime)/1000.0;
		this.lastTime = newTime;
	};

    this.isFixedTime = function()
    {
        return this.fps && (this.fps > 0);
    };

	this.init = function()
	{
		this.startTime = Time.getTime();
		this.lastTime = this.startTime;
		this.fps = fps;
		this.dt = 1/this.fps;
	};
	this.init();

}

/**
 *    gets arbitrary time measure as accurately as possible
 *
 *    @method
 *    @return {Number} the time from browser
 */
Time.getTime = function()
{
    return performance.now();
};
