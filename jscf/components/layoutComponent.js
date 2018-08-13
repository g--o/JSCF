/****************************************************
	layoutComponent.js - an layout applying component class
*****************************************************/

const __LAYOUT_COMPONENT_NAME = "[builtin_layout]";

/**
 * Component - the empty component object used as a c'tor to extend it.
 * 			   (this method replaces inheritance to keep wide support)
 * @param  {Entity} owner parent entity
 * @return {object}       null
 * @constructor
 */
var LayoutComponent = function(owner)
{
	this.name = __LAYOUT_COMPONENT_NAME;
	this.parent = owner;
	this.layoutType = Layout;

	this.init = function() {};

	/**
	 *    update target's (owner) layout
	 *
	 *    @method
	 */
	this.update = function() {
		this.layoutType.doLayout(this.parent);
	};
};

/**
 *    the component's name
 *
 *    @type String
 */
LayoutComponent.component_name = __LAYOUT_COMPONENT_NAME;
