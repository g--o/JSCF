
/**
 * Asset management class
 * @param       {String} assetsDir path to the asset directory
 * @constructor
 */
function AssetManager(assetsDir)
{
    this.rules = {};

    /**
     *    get file extention from it's name/URL.
     *
     *    @method
     *    @param  {String} name file name
     *    @return {String}      the file extention
     */
    this.getExtention = function(name)
    {
        return name.substring(name.lastIndexOf("."), name.length);
    };

    /**
     *    gets the default path for an asset (by file name)
     *
     *    @method
     *    @param  {String} name asset file name
     *    @return {String}      asset default path
     */
    this.getAssetPath = function(name)
    {
        return assetsDir + "\\" + name;
    };

    /**
     *    gets the assets default directory
     *
     *    @method
     *    @return {String} assets default directory
     */
    this.getAssetDir = function()
    {
        return assetsDir;
    };

    /**
     *    gets default path for file extention saved as a rule
     *
     *    @method
     *    @param  {String} ext asset file extention
     *    @return {String}     default asset directory
     */
    this.getRule = function(ext)
    {
        return this.rules[ext];
    };

    /**
     *    sets the rule for default asset path (by extention)
     *
     *    @method
     *    @param  {String} ext file extention
     *    @param  {String} dir directory to set default path to.
     */
    this.setRule = function(ext, dir)
    {
        this.rules[ext] = dir;
    };
}
