
/**
 * @class
 * @classdesc   Effect class
 * @param       {function} pre_render  pre-render function(context)
 * @param       {function} post_render post-render function(context)
 * @constructor
 */
function Effect(pre_render, post_render)
{
	this.pre_render = pre_render;
	this.post_render = post_render;
}

/**
 * shadowFx
 * @param  {Context} ctx the cnavas context
 * @return {Effect}     the effect of adding shadow to renderable object.
 */
var shadowFx = new Effect(function(ctx) {
							ctx.shadowBlur = 10;
							ctx.shadowColor = "black";
						},
						function(ctx) {
							ctx.shadowBlur = 0;
							ctx.shadowColor = "transparent";
						});
