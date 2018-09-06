const VELOCITY = 100;
const COR = 0.5;

var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var box_num = 0;

function loadResources()
{
	game.resourceManager.add("white-rect", new Plane(game, 100, 50, "white"));
	game.resourceManager.add("green-rect", new Plane(game, 105, 55, "green"));
	game.resourceManager.add("floor", new Plane(game, game.graphics.canvas.width*0.8, 50, "blue"));
}

function getBoxName()
{
	return "box"+box_num;
}

function createBox(x, y)
{
	box_num++;
	var box = game.getCurrentScene().createEntity(getBoxName(), x, y, game.resourceManager.get("green-rect"));
	box.insertChild(game.resourceManager.get("white-rect"));
	box.addComponent(Collider);
	box.addComponent(Rigidbody);
	box.getComponentOfType(Rigidbody).cor = COR;

	return box;
}

function loadScene()
{
	createBox(800, 400);
	createBox(500, 100);
	var box = createBox(100, 100);
	box.getBuiltinComponent("rigidbody").applyVelocity(new Vector2d(VELOCITY,0));

	var floor = game.getCurrentScene().createEntity("floor", game.graphics.canvas.width/2, game.graphics.canvas.height, game.resourceManager.getClone("floor"));
	floor.addComponent(Collider);
	floor.addComponent(Rigidbody);
	// Set floor as static body
	var rb = floor.getComponentOfType(Rigidbody);
	rb.setStaticBody();
	rb.cor = COR;
}

function update()
{
	if (game.inputManager.isMouseDown()) {
		var mousePos = new Vector2d(game.inputManager.getMouseX(), game.inputManager.getMouseY());
		if (game.inputManager.getMouseEvent().which == 3) { // right click
			var entity = game.getCurrentScene().getEntity(getBoxName());
			var direction = Vector.subVector(mousePos, entity.transform.pos);
			var vel = direction.getNormal();
			vel.scalarMul(VELOCITY);
			entity.getComponentOfType(Rigidbody).applyVelocity(vel);
		} else {
			createBox(mousePos.x, mousePos.y);
		}
	}
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
