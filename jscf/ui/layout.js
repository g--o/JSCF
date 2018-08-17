
/**
 *    Raw layout static class
 */
var Layout = {

	/**
	 * 	@method
	 *	The method calculates a target children container preferred size based on its content.
	 *
	 * 	@param  {Entity} target the entity to contain
	 */
	calcPreferredSize : function(target) {

	},

	/**
	 *    @method
	 *    The method orders the target children container based on specific rules the manager implements.
	 *
	 *    @param  {Entity} target the container to apply changes to.
	 */
	doLayout : function(target) {

	}
};

/**
 *    Lined layout static class
 */
var LinedLayout = {

    /**
	 * 	@method
	 *
	 *	The method calculates a target children container preferred size based on its content.
	 *
	 * 	@param  {Entity} target the entity to contain
	 */
	calcPreferredSize : function(target) {

	},

	/**
	 *    @method
	 *    The method orders the target children container based on specific rules the manager implements.
	 *
	 *    @param  {Entity} target the container to apply changes to.
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
