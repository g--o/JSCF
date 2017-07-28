
function _clone(item) {
    if (!item) { return item; } // null, undefined values check

    var types = [ Number, String, Boolean ],
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function(type) {
        if (item instanceof type) {
            result = type( item );
        }
    });

    if (typeof result == "undefined") {
        if (Object.prototype.toString.call( item ) === "[object Array]") {
            result = [];
            item.forEach(function(child, index, array) {
                result[index] = clone( child );
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                var result = item.cloneNode( true );
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = _clone( item[i] );
                    }
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }

    return result;
}

function ResourceManager()
{
    this.resources = {};

    this.getResourceName = function(resource) {
        for (var i = 0, len = this.resources.length; i < len; i++) {
            if (resource == this.resources.data[i]) {
                return this.resources.data[i].name;
            }
        }
    };

    this.get = function(key)
    {
        if (!key || !this.resources[key]) {
            console.warn("[JSCF] resrouce manager get() - got invalid key.");
            return null;
        }

        return this.resources[key];
    };

    this.getClone = function(key) {
        var original = this.get(key);
        var clone = _clone(original);

        // don't deep copy the game.
        if (clone["game"]) {
            clone["game"] = original["game"];
        }

        if (this.add(key + "_clone", clone))
            return clone;

        return original;
    };

    this.add = function(key, resource) {
        if (!key) {
            console.warn("[JSCF] resource manager set() - got invalid key.");
            return false;
        }
        if (this.resources[key]) {
            console.warn("[JSCF] resource manager set() - resource already exists!");
            return false;
        }

        this.resources[key] = resource;
        return true;
    };

    this.remove = function(key) {
        if (!key || !this.resources[key]) {
            console.warn("[JSCF] resrouce manager remove() - got invalid key.");
            return null;
        }
        this.resources[key] = null;
        return true;
    };

    this.removeByValue = function(resource) {
        var name = this.getResourceName(resource);
        if (!name)
            return false;
        return this.remove(name);
    };



}
