
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

function loadResources()
{
	game.resourceManager.add("rect", new Plane(game, 100, 50, "white"));
	game.resourceManager.add("floor", new Plane(game, game.graphics.canvas.width, 50, "blue"));
}

function loadScene()
{
    var box = game.getCurrentScene().createEntity("box", 100, 100, game.resourceManager.get("rect"));
	box.rect = box.getDefaultRect();
    box.AddComponent(Collider);
    box.AddComponent(Rigidbody);

	var box2 = game.getCurrentScene().createEntity("box2", 500, 100, game.resourceManager.getClone("rect"));
	box2.rect = box2.getDefaultRect();
	box2.AddComponent(Collider);
    box2.AddComponent(Rigidbody);

	box.getChild("[builtin_rigidbody]").applyVelocity(new Vector2d(10,0));

	var box3 = game.getCurrentScene().createEntity("box3", 800, 400, game.resourceManager.getClone("rect_clone"));
	box3.rect = box3.getDefaultRect();
	box3.AddComponent(Collider);
    box3.AddComponent(Rigidbody);

	var floor = game.getCurrentScene().createEntity("floor", game.graphics.canvas.width/2, 500, game.resourceManager.getClone("floor"));
	floor.rect = floor.getDefaultRect();
	floor.AddComponent(Collider);
	floor.AddComponent(Rigidbody);
	var floorRB = floor.getChild("[builtin_rigidbody]");
	floorRB.auto_gravity = false;
	floorRB.static = true;
}

function update()
{

}

function gameStart()
{
    game.setup();
    // load game resources
    loadResources();
    loadScene();
	// start game
    game.start(update, true);
}
