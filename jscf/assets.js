
function AssetManager(assetsDir)
{

    this.rules = {};

    this.getExtention = function(name)
    {
        return name.substring(name.lastIndexOf("."), name.length);
    };

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
