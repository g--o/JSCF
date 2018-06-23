
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var txt = null;

function buildPanel()
{
    var panelHeight = game.getCanvasHeight();
    var panelWidth = game.getCanvasWidth()/4;
    var panel = game.guiManager.createContainer("left-panel", panelWidth/2, panelHeight/2, panelWidth, panelHeight, __GUIMANAGER_CONTAINER_COLOR);
    game.getCurrentScene().addEntity(panel);

    // build text
    txt = new Text(game, Object.keys(game.getCurrentScene().entities), "white", "15px arial");
    txt.enabled = true;
    panel.insertChild(txt);

    // build button
    var btn = game.guiManager.createDefaultButton(100, 100, "Toggle");
    btn.getComponentOfType(ButtonHandler).onClick = function() {
        txt.enabled = !txt.enabled;
    }
    game.getCurrentScene().addEntity(btn);

    var createBtn = game.guiManager.createDefaultButton(300, 100, "Create Entity");
    createBtn.getComponentOfType(ButtonHandler).onClick = function() {
        game.getCurrentScene().createNewEntity(game.getCurrentScene().getEntityName(), 0, 0, null);
    }
    game.getCurrentScene().addEntity(createBtn);
}

function loadResources()
{

}

function loadScene()
{
    buildPanel();
}

function update()
{
    if (txt.enabled) {
        var entities = Object.keys(game.getCurrentScene().entities);
        var finalText = "";
        for (var i = 0; i < entities.length; i++) {
            finalText += "- " + entities[i];
            finalText += "\n\t\t\t";
            finalText += Object.keys(game.getCurrentScene().getEntity(entities[i]).children)
            finalText += "\n";
        }

        txt.txt = finalText;
    } else {
        txt.txt = "";
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
