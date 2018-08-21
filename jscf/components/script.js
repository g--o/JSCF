/****************************************************
	script.js - an entity script component class
*****************************************************/

const __SCRIPT_COMPONENT_NAME = "[builtin_script]";

/**
 * script component - the script component object used as a c'tor to extend it.

 *
 * @memberof    Components
 *
 * @param  {Core.Entity} owner parent entity
 * @return {object}       null
 * @constructor
 */
var Script = function(owner)
{
	this.name = __COMPONENT_NAME;
	this.parent = owner;
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
Script.component_name = __SCRIPT_COMPONENT_NAME;
