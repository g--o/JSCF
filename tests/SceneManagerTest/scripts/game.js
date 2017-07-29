
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

function loadResources()
{
    game.resourceManager.add("black_square", new Plane(game, 150, 150, "black"));
}

function loadScene()
{
    // use createNewEntity() - auto-name entities and number them.
    game.getCurrentScene().createNewEntity(game.resourceManager.get("black_square"));       // link an entire sprite/rect object
    game.getCurrentScene().createNewEntity(game.resourceManager.getClone("black_square"));  // copy  sprite/rect objects
    game.getCurrentScene().createEntity("red_rect", 0, 150, new Plane(game, 150, 150, "red"));     // create an entirely new object.
    game.getCurrentScene().createManualEntity("manual", 0, 300, new Plane(game, 150, 150, "green"));     // create a manual object, shouldn't be rendered
    game.getCurrentScene().createManualEntity("manual_2", 0, 450, new Plane(game, 150, 150, "blue"));     // create a manual object, render manually


    // empty entity creation
    game.getCurrentScene().createEntity("script", 0, 0, {
        custom_action : function() {
            console.log("I can also log!");
        },
        render : function() {

        },
        update : function() {
            game.getCurrentScene().entities["entity_1"].rect.x += 3;
            game.getCurrentScene().entities["entity_2"].rect.x += 2;
            game.getCurrentScene().entities["red_rect"].rect.x += 1;
            game.getCurrentScene().entities["manual"].rect.x += 1;
        }
    });
}

function update()
{
    // global update
    game.getCurrentScene().entities["manual_2"].render();
    game.getCurrentScene().entities["script"].spr.custom_action();
}

function gameStart()
{
    game.setup();
    // load game resources
    loadResources();
    loadScene();
    game.start(update, true);
}
