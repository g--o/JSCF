
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
        const MARGIN = 30;
        const SCALING = .6;
        var shape = target.getShapeByChild();
        var children = target.getEntityChildren();

        var lineWidth = shape.x - MARGIN;
        var lineHeight = shape.y/children.length * SCALING;
        var curLine = 0;

        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.transform) {
                child.transform.pos = new Vector2d(0, (-shape.y/2) + (lineHeight * curLine));
                if (child.getChildAt(0).textBox)
                    child.getChildAt(0).textBox.width(lineWidth);
                else {
                    ; // scale
                }
            }

            curLine++;
        }
	}
};
