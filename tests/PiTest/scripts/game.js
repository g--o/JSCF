
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

const BOX_SIDE = 70;

var WALL_SIZE = null;
var FLOOR_SIZE = null;

var wall_num = 0;
var box_num = 0;

var text = null;

const ACTUAL_PI = Math.PI;
const INITIAL_MASS = 1;
var INITIAL_SPEED = -100;

var num_step = 1;
var pi_val = 0; // the reason we're all here!
var mass_ratio = 1;
var num_collisions = -1;
var left_box, right_box, wall, floor;
var last_vel = Math.sign(INITIAL_SPEED);

function loadResources()
{
	WALL_SIZE = new Point2d(10, game.graphics.canvas.height);
	FLOOR_SIZE = new Point2d(game.graphics.canvas.width, 10);
	
	game.resourceManager.add("floor", new Plane(game, FLOOR_SIZE.getX(), FLOOR_SIZE.getY(), "blue"));
	game.resourceManager.add("wall", new Plane(game, WALL_SIZE.getX(), WALL_SIZE.getY(), "blue"));
	game.resourceManager.add("square", new Plane(game, BOX_SIDE, BOX_SIDE, "white"));
}

function createWall(x, y, type)
{
	wall_num++;
	var wall = game.getCurrentScene().createEntity(type+wall_num, x, y, game.resourceManager.get(type));
	if (!wall)
		alert("Failed creating " + type);
	wall.addComponent(Collider);
	wall.addComponent(Rigidbody);
	wall.getComponentOfType(Rigidbody).setStaticBody();
	wall.getComponentOfType(Rigidbody).cor = 1;
	return wall;
}

function createBox(x, y, initial_speed)
{	
	box_num++;
	var box = game.getCurrentScene().createEntity("box"+box_num, x, y, game.resourceManager.get("square"));
	if (!box)
		alert("Failed creating box");
	box.addComponent(Collider);
	box.addComponent(Rigidbody);
	
	var boxRB = box.getComponentOfType(Rigidbody);
	boxRB.cor = 1;
	boxRB.applyVelocity(new Vector2d(initial_speed, 0));
	
	return box;
}

function updateText()
{
	text.getChildAt(0).setText("PI ~ " + pi_val + " | error rate: " + getErrorRate() + "% | collisions: " + num_collisions + " | step: " + num_step);
}

function loadScene()
{
	var screen_width = game.graphics.canvas.width;
	var screen_height = game.graphics.canvas.height;
	
	var starting_x = screen_width/4;
	var starting_y = screen_height - BOX_SIDE/2 + FLOOR_SIZE.getY();
	var spacing = BOX_SIDE * 2;

	// Create walls
	wall = createWall(0, screen_height/2, "wall");
	floor = createWall(screen_width/2, screen_height, "floor");

	// Create boxes
	left_box = createBox(starting_x, starting_y, 0);
	right_box = createBox(starting_x + spacing, starting_y, INITIAL_SPEED);

	text = game.guiManager.createLabel(screen_width/2, 100, "");
	game.getCurrentScene().addEntity(text);
}

function getErrorRate()
{
	return Math.abs(1-pi_val/ACTUAL_PI)*100.0;
}

function step()
{
	pi_val = num_collisions / (10.0**(num_step-1));
	num_step++;
	num_collisions = 0;
	mass_ratio *= 100;
	
	game.sceneManager.deleteScene(game.getCurrentScene().name);
	game.sceneManager.createScene(num_step.toString());
	game.sceneManager.setCurrentScene(num_step.toString());
	loadScene();
	right_box.getComponentOfType(Rigidbody).mass = mass_ratio;
}

function update()
{
	updateText();

	var vel = Math.sign(left_box.getComponentOfType(Rigidbody).velocity.x);
	if (last_vel != vel) {
		last_vel = vel;
		num_collisions++;
	}
	
	if (right_box.transform.pos.x > game.graphics.canvas.width)
		step();
	
	if (num_step > 3) {
		game.stop();
	}
}

function gameStart()
{
    game.setup();
	INITIAL_SPEED = -game.graphics.canvas.width / 7.0;
	
    // load game resources
    loadResources();
    loadScene();
	
	// start game
    game.start(update, true);
}
