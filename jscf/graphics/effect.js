/**
 * @class
 * @classdesc   Effect class
 * @memberof Graphics
 *
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
 * @return {Graphics.Effect}     the effect of adding shadow to renderable object.
 */
var shadowFx = new Effect(function(ctx) {
							ctx.shadowBlur = 10;
							ctx.shadowColor = "black";
						},
						function(ctx) {
							ctx.shadowBlur = 0;
							ctx.shadowColor = "transparent";
						});

/**
 *    shader starter
 *
 *    @param       {Core.Game}          the JSCF game object
 *    @param       {Graphics.Effect}    effect effect to apply
 *    @constructor
 */
function ShaderStart(game, effect) {
    this.render = function() {
        effect.pre_render(game.graphics.context);
    };
}

/**
 *    shader ender
 *
 *    @param       {Core.Game}          the JSCF game object
 *    @param       {Graphics.Effect}    effect effect to apply
 *    @constructor
 */
function ShaderEnd(game, effect) {
    this.render = function() {
        effect.post_render(game.graphics.context);
    };
}
