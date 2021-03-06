////// file for layout static classes
////// @TODO: merge LinedLayout and FitLayout with callback function.

/**
 *    Raw layout static class
 *    @namespace
 *    @memberof UI
 */
var Layout = {

	/**
	 *	The method calculates a target children container preferred size based on its content.
	 *
     * 	@method
	 * 	@param  {Core.Entity} target the entity to contain
	 */
	calcPreferredSize : function(target) {

	},

	/**
	 *    The method orders the target children container based on specific rules the manager implements.
	 *
     *    @method
	 *    @param  {Core.Entity} target the container to apply changes to.
	 */
	doLayout : function(target) {

	}
};

/**
 *    Lined layout static class
 *    @namespace
 *    @memberof UI
 */
var LinedLayout = {

    /**
	 *	The method calculates a target children container preferred size based on its content.
	 *
     * 	@method
	 * 	@param  {Core.Entity} target the entity to contain
	 */
	calcPreferredSize : function(target) {

	},

	/**
	 *    The method orders the target children container based on specific rules the manager implements.
	 *
     *    @method
	 *    @param  {Core.Entity} target the container to apply changes to.
	 */
	doLayout : function(target) {
        const MARGIN = 10;

        var shape = target.getDimentions();
        var children = target.getEntityChildren();

        var lineWidth = shape.x - MARGIN;
        var curLine = MARGIN;

        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var childHeight = child.getDimentions().y + MARGIN;

            // set top at y=0
            curLine += childHeight/2;

            if (child.transform) {
                child.transform.pos = new Vector2d(0, (-shape.y/2) + curLine);
                child.setDimentions(lineWidth, -1); // update but keep y.
            }

            // set bottom at y=childHeight
            curLine += childHeight/2;
        }
	}
};

/**
 *    Fit layout static class
 *
 *    @namespace
 *    @memberof UI
 */
var FitLayout = {
	/**
	 *	The method calculates a target children container preferred size based on its content.
	 *
     * 	@method
	 * 	@param  {Core.Entity} target the entity to contain
	 */
	calcPreferredSize : function(target) {

	},

	/**
	 *    The method orders the target children container based on specific rules the manager implements.
	 *
     *    @method
	 *    @param  {Core.Entity} target the container to apply changes to.
	 */
	doLayout : function(target) {
        const MARGIN_X = 10;
		const MARGIN_Y = 10;

        var shape = target.getDimentions();
        var children = target.getEntityChildren();

        var lineWidth = shape.x - MARGIN_X;
        var curLine = MARGIN_Y;
		var childHeight = Math.floor(shape.y/children.length-MARGIN_Y);

        for (var i = 0; i < children.length; i++) {
            var child = children[i];

            // set top at y=0
            curLine += (childHeight+MARGIN_Y)/2;

            if (child.transform) {
                child.transform.pos = new Vector2d(0, (-shape.y/2) + curLine);
                child.setDimentions(lineWidth, childHeight);
            }

            // set bottom at y=childHeight
            curLine += childHeight/2;
        }
	}
};
