
/****************************************************
	component.js - an entity blank component class
	Components in jscf are optional as you can use
		the hirarchy, but are more comfortable as they
		are defined as children who get their parent
		in c'tor.
*****************************************************/

// blank component
var component = function(owner)
{
	this.name = "[builtin_component]";
	this.parent = owner;
	this.init = function() {};
	this.update = function() {};
};
