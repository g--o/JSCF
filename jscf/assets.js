
function AssetManager(assetsDir)
{

    this.rules = {};

    function getExtention(name)
    {
        //TODO: todo!
    }

    this.getAssetPath = function(name)
    {
        return assetsDir + "\\" + name;
    };

    this.getAssetDir = function()
    {
        return assetsDir;
    };

    this.getRule = function(ext)
    {
        return this.rules[ext];
    };

    this.setRule = function(ext, dir)
    {
        this.rules[ext] = dir;
    };
}
