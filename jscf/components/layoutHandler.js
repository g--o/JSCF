/****************************************************
	layoutComponent.js - an layout applying component class
*****************************************************/

const __LAYOUT_COMPONENT_NAME = "[builtin_layout_handler]";

/**
 * LayoutComponent - sets owner's children position & dimentions to fit certain
 * 					 layout type.
 *
 * @note: default layout type is raw (bypass). Set layoutType to change it.
 *
 * @memberof    Components
 *
 * @param  {Core.Entity} owner parent entity
 * @return {object}       null
 * @constructor
 */
var LayoutHandler = function(owner)
{
	/**
	 *    layout type
	 *
	 *    @type {UI.Layout}
	 */
	this.layoutType = Layout;
	this.name = __LAYOUT_COMPONENT_NAME;
	this.parent = owner;

	this.init = function() {};

	/**
	 *    update target's (owner) layout
	 *
	 *    @method
	 */
	this.update = function() {
		this.layoutType.doLayout(this.parent);
		this.update = null;
	};
};

/**
 *    the component's name
 *
 *    @type String
 */
LayoutHandler.component_name = __LAYOUT_COMPONENT_NAME;
