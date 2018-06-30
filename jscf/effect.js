
function Effect(pre_render, post_render)
{
	this.pre_render = pre_render;
	this.post_render = post_render;
}

var shadowFx = new Effect(function(ctx) {
							ctx.shadowBlur = 10;
							ctx.shadowColor = "black";
						},
						function(ctx) {
							ctx.shadowBlur = 0;
							ctx.shadowColor = "transparent";
						});
