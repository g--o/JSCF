
var game = new Game(JSCF_CANVAS_WIDTH, JSCF_CANVAS_HEIGHT, JSC_FPS, JSC_ASSETDIR);
var txt = null;

function buildPanel()
{
    var panelHeight = game.getCanvasHeight();
    var panelWidth = game.getCanvasWidth()/4;
    var HORIZONTAL_OFFSET = panelWidth/4;
    var VERTICAL_OFFSET = -panelHeight/8;

    var panel = game.guiManager.createContainer("left-panel", panelWidth/2, panelHeight/2, panelWidth, panelHeight, __GUIMANAGER_CONTAINER_COLOR);
    game.getCurrentScene().addEntity(panel);

    // build text
    txt = new Text(game, Object.keys(game.getCurrentScene().entities), "white", "15px arial");
    txt.enabled = true;
    var txtEntity = new Entity(game, "txt", true, -HORIZONTAL_OFFSET, 0, true);
    txtEntity.insertChild(txt);
    panel.insertChild(txtEntity);

    // build button
    var btn = game.guiManager.createDefaultButton(-HORIZONTAL_OFFSET, VERTICAL_OFFSET, "Toggle");
    btn.getComponentOfType(ButtonHandler).onClick = function() {
        txt.enabled = !txt.enabled;
    }
    panel.insertChild(btn);

    var createBtn = game.guiManager.createDefaultButton(HORIZONTAL_OFFSET, VERTICAL_OFFSET, "Create Entity");
    createBtn.getComponentOfType(ButtonHandler).onClick = function() {
        game.getCurrentScene().createNewEntity(game.getCurrentScene().getEntityName(), 0, 0, null);
    }
    panel.insertChild(createBtn);
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
