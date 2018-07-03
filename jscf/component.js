
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
 * @param  {Entity} owner parent entity
 * @return {object}       null
 * @constructor
 */
var Component = function(owner)
{
	this.name = __COMPONENT_NAME;
	this.parent = owner;
	this.init = function() {};
	this.update = function() {};
};

Component.component_name = __COMPONENT_NAME;

// Additional Component utilities

Component.typeToName = function(type)
{
	var name = type.component_name;
	if (!name)
		name = type.name.toLowerCase();
	return name;
};
