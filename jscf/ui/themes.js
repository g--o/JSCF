
///////////// THEME SETTINGS /////////////

/**
 * A built-in theme for ui
 * @namespace
 * @memberof UI
 */
const __UI_LIGHT_THEME = {
	"panel"	: {
		"width" 	: "25%",
		"height"	: "100%",
		"margin"	: "50px"
	},
	"button" : {
		"color" 	: "#bebebe",
		"width"		: "50px",
		"height"	: "50px",
		"font_color": "#000",
		"font_size"	: "15px",	// = button.height * 0.3
		"font"		: "arial",
	},
	"container" : {
		"color" 	: "#a6a6a6cc",
		"width"		: "250px",	// = height
		"height" 	: "250px",	// = width
		"font"		: "arial",
		"effect"	: shadowFx,
	},
	"textbox" : {
		"width" 	: "100px",
		"height"	: "23px",
	},
	"label" : {
		"font_color": "white",
		"font_size"	: "15px",
		"font"		: "arial",
	},
	"window" : {
		"ctl_size"	: "17%",
	}
};

const __UI_DARK_THEME = {
	"panel"	: {
		"width" 	: "25%",
		"height"	: "100%",
		"margin"	: "50px"
	},
	"button" : {
		"color" 	: "#333",
		"width"		: "50px",
		"height"	: "50px",
		"font_color": "#eee",
		"font_size"	: "15px",	// = button.height * 0.3
		"font"		: "arial",
	},
	"container" : {
		"color" 	: "#555555cc",
		"width"		: "250px",	// = height
		"height" 	: "250px",	// = width
		"font"		: "arial",
		"effect"	: noneFx,
	},
	"textbox" : {
		"width" 	: "100px",
		"height"	: "23px",
		"effect"	: noneFx,
	},
	"label" : {
		"font_color": "white",
		"font_size"	: "15px",
		"font"		: "arial",
	},
	"window" : {
		"ctl_size"	: "17%",
	}
};

const __UI_DEFAULT_THEME = __UI_DARK_THEME;

///////////// THEME UTILS /////////////

/**
 *    convert string to int, css-like
 *
 *    @method      __UI_SIZE
 *    @param       {String}           str          	the string to convert
 *    @param       {Number}           maxSize	 	the max size (usually canvas dimentions) in px
 *    @return      {Number}                        the desired length in px.
 */
function __UI_SIZE(str, maxSize)
{
	var num = str;
	var factor = 1.0;

	if (num.endsWith('%')) {
		num = num.replace("%", "");

		if (isNaN(maxSize)) {
			console.warn("max size isn't numeric! Assuming fraction!")
			factor = 1.0/100.0;
		} else {
			factor = maxSize/100.0;
		}

	} else if (num.endsWith("px")) {
		num = num.replace("px", "");
	}

	if (isNaN(num)) {
		console.warn("[__UI_STRING_TO_INT] string size isn't numeric!");
		return num;
	}

	return parseInt(num) * factor;
}

/**
 *    __UI_FONT
 *
 *    @method      __UI_FONT
 *    @param       {UI.Theme}  theme theme object
 *    @constructor
 *    @return      {String}			 font descriptor
 */
function __UI_FONT(theme) {
	return theme.font_color + " " + theme.font_size + " " + theme.font;
}

///////////// THEME CLASS /////////////

/**
 *    @class       Theme
 *    @classdesc   Theme wrapper
 *    @memberof    UI
 *
 *    @param       {Object} settings     theme settings JSON
 *    @param       {Number} canvasWidth  canvas width
 *    @param       {Number} canvasHeight canvas height
 *    @constructor
 */
function Theme(settings, canvasWidth, canvasHeight) {

	this.canvasWidth	= canvasWidth;
	this.canvasHeight	= canvasHeight;
	this.settings 		= settings;

	/**
	 *    Standard size getter
	 *
	 *    @param  {String} name   	the requested object
	 *    @param  {String} property the property
	 *    @return {Number}      	the requested size
	 *
	 *    @method
	 */
	this.getSize = function(name, property)
	{
		var propertyStr = this.settings[name][property];
		var num = 0;

		if (property == "width") {
			num = __UI_SIZE(propertyStr, canvasWidth);
		} else if (property == "height") {
			num = __UI_SIZE(propertyStr, canvasHeight);
		} else {
			num = __UI_SIZE(propertyStr);
		}

		return num;
	};

	/**
	 *    UI font descriptor getter
	 *
	 *    @param  {String} name   	the requested object
	 *    @return {String}      	the built font string.
	 *
	 *    @method
	 */
	this.getFontDesc = function(name)
	{
		var fontString = "";
		var font_color = this.settings[name].font_color;
		var font_size = this.settings[name].font_size;
		var font = this.settings[name].font;

		/*if (font_color)
			fontString += font_color;*/
		if (font_size)
			fontString += " " + font_size;
		if (font)
			fontString += " " + font;

		return fontString;
	};

	/**
	 *    Standard property getter
	 *
	 *    @param  {String} name   	the requested object
	 *    @param  {String} property the property
	 *    @return {Object}      	the requested property
	 *    
	 *    @method
	 */
	this.getProperty = function(name, property)
	{
		return this.settings[name][property];
	};

}
