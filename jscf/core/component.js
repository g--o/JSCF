/****************************************************
	component.js - an entity blank component class
	Components in jscf are optional as you can use
		the hirarchy, but are more comfortable as they
		are defined as children who get their parent
		in c'tor.
*****************************************************/

const __COMPONENT_NAME = "[builtin_component]";

/**
 * Component - the empty component object used as a c'tor to extend it.
 * 			   (this method replaces inheritance to keep wide support)
 *
 * @memberof    Core
 * @param  {Core.Entity} owner parent entity
 * @return {object}       null
 * @constructor
 */
var Component = function(owner)
{
	/**
	*    component's owner ( and parent )
	*
	*    @type {Core.Entity}
	*/
	this.parent = owner;
	this.name = __COMPONENT_NAME;
	this.init = function() {};

	/**
	 *    stub update function
	 *
	 *    @method
	 */
	this.update = function() {};
};

/**
 *    the component's name
 *
 *    @type String
 */
Component.component_name = __COMPONENT_NAME;

// Additional Component utilities

/**
 *    static-like method that converts type to component name.
 *
 *    @method
 *    @param  {Type} type	the type of the component
 *    @return {String}      the component's name
 */
Component.typeToName = function(type)
{
	var name = type.component_name;
	if (!name)
		name = type.name.toLowerCase();
	return name;
};
