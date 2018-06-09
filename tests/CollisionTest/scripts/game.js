
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var s1, s2;

function render()
{
    game.graphics.clear();   // clear canvas
    // render square as test.
    s1.render();
    s2.render();
}

function update()
{
    // change s1
    s1.transform.pos.x = game.inputManager.getMouseX();
    s1.transform.pos.y = game.inputManager.getMouseY();
    // update changes
    s1.update();

    // check collision
    if (s1.getComponentOfType(Collider).resolver.isColliding(s2.getComponentOfType(Collider).resolver))
        s2.getChildAt(0).color = "black";
    else
        s2.getChildAt(0).color = "red";

    // render
    render();
}

function gameStart()
{
    game.setup();
    // create entities
    s1 = new Entity(game, "asd", true, 100, 100, false);
    s2 = new Entity(game, "asd1", true, 150, 150, false);

    // set sprites
    s1.insertChild(new Plane(game, 50, 40, "green"));
    s2.insertChild(new Plane(game, 100, 40, "red"));

    // set components
    s1.addComponent(Collider);
    s2.addComponent(Collider);

    game.start(update);
}
