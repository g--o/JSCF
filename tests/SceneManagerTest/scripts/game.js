
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);

function loadResources()
{
    game.resourceManager.add("black_square", new Plane(game, 0, 0, 150, 150, "black"));
}

function loadScene()
{
    // use createNewEntity() - auto-name entities and number them.
    game.getCurrentScene().createNewEntity(game.resourceManager.get("black_square"));       // link an entire sprite/rect object
    game.getCurrentScene().createNewEntity(game.resourceManager.getClone("black_square"));  // copy  sprite/rect objects
    game.getCurrentScene().createEntity("red_rect", new Plane(game, 400, 400, 150, 150, "red"));     // create an entirely new object.
    game.getCurrentScene().createManualEntity("manual", new Plane(game, 400, 400, 150, 150, "green"));     // create a manual object, shouldn't be rendered
    game.getCurrentScene().createManualEntity("manual_2", new Plane(game, 400, 400, 150, 150, "blue"));     // create a manual object, render manually


    // empty entity creation
    game.getCurrentScene().createEntity("script", {
        custom_action : function() {
            console.log("I can also log!");
        },
        render : function() {

        },
        update : function() {
            game.getCurrentScene().entities["entity_1"].spr.rect.x += 3;
            game.getCurrentScene().entities["entity_2"].spr.rect.x += 2;
            game.getCurrentScene().entities["red_rect"].spr.rect.x += 1;
            game.getCurrentScene().entities["manual"].spr.rect.x += 1;
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
