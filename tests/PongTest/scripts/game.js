
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40

const PLAYER_SIZE = new Point2d(150, 30);
const BALL_SIDE = PLAYER_SIZE.getY()/1.5;
const SPACING_SIZE = 10;

const BOT_DIFFICULTY = 5/10;
const UNFAIRNESS_FACTOR = 1; // fair
const PLAYER_SPEED = 500; // px/sec
const BALL_SPEED = PLAYER_SPEED/Math.sqrt(2) * UNFAIRNESS_FACTOR; // px/sec

var wall_num = 0;
var WALL_SIZE = null;
var player = null;
var enemy = null;
var ball = null;
var ballSpeed = null;

function loadResources()
{
	WALL_SIZE = new Point2d(1, game.graphics.canvas.height);
	game.resourceManager.add("wall", new Plane(game, WALL_SIZE.getX(), WALL_SIZE.getY(), "white"));
	game.resourceManager.add("square", new Plane(game, BALL_SIDE, BALL_SIDE, "white"));
	game.resourceManager.add("rect", new Plane(game, PLAYER_SIZE.getX(), PLAYER_SIZE.getY(), "white"));
}

function createWall(x, y)
{
	wall_num++;
	var wall = game.getCurrentScene().createEntity("wall"+wall_num, x, y, game.resourceManager.get("wall"));
	if (!wall)
		alert("Failed creating a wall");
	wall.addComponent(Collider);
	wall.addComponent(Rigidbody);
	wall.getComponentOfType(Rigidbody).setStaticBody();
	wall.getComponentOfType(Rigidbody).cor = 1;
	return wall;
}

function loadScene()
{
	var screen_width = game.graphics.canvas.width;
	var screen_height = game.graphics.canvas.height;
	var starting_y = screen_height - PLAYER_SIZE.getY() - SPACING_SIZE;
	var starting_x = screen_width/2;

	// Create walls
	createWall(0, screen_height/2);
	createWall(screen_width, screen_height/2);

	// Create player
	player = game.getCurrentScene().createEntity("player", starting_x, starting_y, game.resourceManager.get("rect"));
	if (!player)
		alert("Failed creating player");
	player.addComponent(Collider);
	player.addComponent(Rigidbody);
	player.getComponentOfType(Rigidbody).setStaticBody();

	// Creating enemy
	enemy = game.getCurrentScene().createEntity("enemy", starting_x, screen_height - starting_y, game.resourceManager.get("rect"));
	if (!enemy)
		alert("Failed creating enemy");
	enemy.addComponent(Collider);
	enemy.addComponent(Rigidbody);
	enemy.getComponentOfType(Rigidbody).setStaticBody();

	// Create ball
	ball = game.getCurrentScene().createEntity("ball", screen_width/2, screen_height/2, game.resourceManager.get("square"));
	if (!ball)
		alert("Failed creating ball");
	ball.addComponent(Collider);
	ball.addComponent(Rigidbody);
	var ballRB = ball.getComponentOfType(Rigidbody);

	// set ball speed
	ballSpeed = new Vector2d((Math.random()-0.5)/2, (Math.random()-0.5)/2);
	ballSpeed.normalize();
	ballSpeed.x *= BALL_SPEED;
	ballSpeed.y *= BALL_SPEED;
	// apply velocity
	ballRB.applyVelocity(ballSpeed);
	ballRB.auto_gravity = false;
	ballRB.cor = 1;
}

function gameOver(state)
{
	game.renderText(game.graphics.canvas.width/2 - SPACING_SIZE, game.graphics.canvas.height/2,
										"You " + state + "!", "white", "30px ariel");
	game.stop();
}

function update()
{
	// get dt from const update mode
	var dt = (1/game.fps);

	// player's movement
	if (game.inputManager.isKeyDown(RIGHT_ARROW)) {
		player.transform.pos.x += PLAYER_SPEED * dt;
	} else if (game.inputManager.isKeyDown(LEFT_ARROW)) {
		player.transform.pos.x -= PLAYER_SPEED * dt;
	}

	// enemy's movement
	var enemyDirection = (ball.transform.pos.x - enemy.transform.pos.x);
	var enemySpeed = PLAYER_SPEED * BOT_DIFFICULTY;

	if (enemyDirection != 0) {
		enemyDirection = 1.0 * enemyDirection/Math.abs(enemyDirection);
	} else {
		enemyDirection = 0;
	}
	enemy.transform.pos.x += enemyDirection * enemySpeed * dt;

	// check win
	if (ball.transform.pos.y <= 0) {
		gameOver("win");
	}
	if (ball.transform.pos.y >= game.graphics.canvas.height) {
		gameOver("lose");
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
