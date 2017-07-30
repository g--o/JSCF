
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var s1, s2;

function render()
{
    game.graphics.clear();   // clear canvas
    // render square as test.
    s2.render();
    s1.render();
}

function update()
{
    s1.rect.x = game.inputManager.getMouseX();
    s1.rect.y = game.inputManager.getMouseY();
    if (s1.rect.isColliding(s2.rect))
        s2.spr.color = "black";
    else
        s2.spr.color = "red";
    render();
}

function gameStart()
{
    game.setup();
    s1 = new Entity("asd", true, 100, 100, new Plane(game, 100, 40, "green"));
    s2 = new Entity("asd1", true, 150, 150, new Plane(game, 40, 40, "red"));
    game.start(update);
}