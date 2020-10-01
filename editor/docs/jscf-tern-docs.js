var def_jscf = {
  "!name": "jscf",
  "!define": {
    "Animation.!1": "+Sprite",
    "Effect.!0": {},
    "Effect.!0.!0": {
      "shadowBlur": {
        "!type": "number",
        "!span": "755[28:11]-765[28:21]"
      },
      "shadowColor": {
        "!type": "string",
        "!span": "783[29:11]-794[29:22]"
      }
    },
    "Effect.!1": {},
    "Effect.!1.!0": {
      "shadowBlur": {
        "!type": "number",
        "!span": "848[32:11]-858[32:21]"
      },
      "shadowColor": {
        "!type": "string",
        "!span": "875[33:11]-886[33:22]"
      }
    },
    "__get_circular_replaces.!ret": {
      "!type": "fn(key: string, value: ?)",
      "!span": "7072[283:9]-7372[294:3]"
    },
    "SceneUtils.makeFloor.!ret": "[?]",
    "SceneUtils.deleteParent.!1": {
      "setDimentions": {
        "!type": "fn()",
        "!span": "7960[258:12]-7973[258:25]"
      }
    },
    "Vector.addVector.!1": {
      "x": {
        "!type": "number",
        "!span": "8161[263:34]-8162[263:35]"
      },
      "y": {
        "!type": "number",
        "!span": "8211[264:15]-8212[264:16]"
      }
    },
    "Entity.getComponentOfType.!ret": {},
    "Entity.addChild.!1": "+Plane",
    "Entity.getDimentions.!ret": {
      "x": {
        "!type": "number",
        "!span": "8505[311:26]-8506[311:27]"
      },
      "y": {
        "!type": "number",
        "!span": "8562[312:26]-8563[312:27]"
      }
    },
    "Entity.getEntityChildren.!ret": "[?]",
    "Effect.pre_render.!0": {
      "shadowBlur": {
        "!type": "number",
        "!span": "755[28:11]-765[28:21]"
      },
      "shadowColor": {
        "!type": "string",
        "!span": "783[29:11]-794[29:22]"
      }
    },
    "Effect.post_render.!0": {
      "shadowBlur": {
        "!type": "number",
        "!span": "848[32:11]-858[32:21]"
      },
      "shadowColor": {
        "!type": "string",
        "!span": "875[33:11]-886[33:22]"
      }
    },
    "Vector2d.makeArray.!ret": "[number, number]",
    "Scene.addEntity.!0": {
      "name": {
        "!type": "string",
        "!span": "7305[242:15]-7309[242:19]"
      }
    },
    "Scene.createManualEntity.!3": {
      "parent": "+Entity"
    },
    "Scene.createEntity.!3": {
      "parent": "+Entity"
    },
    "Scene.createNewEntity.!0": {
      "parent": "+Entity"
    },
    "PhysicsEngine.detectCollisions.!ret": "[+Manifold]",
    "PhysicsEngine.detectCollisions.!ret.<i>": "+Manifold",
    "PhysicsEngine.resolveCollisions.!0": "[?]",
    "PhysicsEngine.!0": {
      "<i>": "+Entity"
    }
  },
  "AABB": {
    "!type": "fn(_x: number|+Transform, _y: number|+Transform, _width: number, _height: number)",
    "!span": "350[12:9]-354[12:13]",
    "!doc": "@class\n@classdesc   Axis-Aligned Bounding Box\n@memberof    Colliders\n\n@param       {Number} _x      x position of the AABB\n@param       {Number} _y      y position of the AABB\n@param       {Number} _width  width position of the AABB\n@param       {Number} _height height position of the AABB\n\n@constructor",
    "setTransform": {
      "!type": "fn(transform: +Transform)",
      "!span": "560[21:6]-572[21:18]",
      "!doc": "set the CircleCollider position from a transform.\n\n@method\n@param  {Core.Transform} transform the transform to get position from"
    },
    "containsPoint": {
      "!type": "fn(x: number, y: number) -> bool",
      "!span": "980[35:9]-993[35:22]",
      "!doc": "checks whether CircleCollider contains a point.\n\n@method\n@param  {Number} x the x position of the point to test.\n@param  {Number} y the y position of the point to test.\n@return {Boolean}   true if it contains the point, false otherwise."
    },
    "isColliding": {
      "!type": "fn(other: ?) -> bool",
      "!span": "1371[48:9]-1382[48:20]",
      "!doc": "checks CircleCollider collision with other CircleCollider.\n\n@method\n@param  {Colliders.CircleCollider}  other other CircleCollider to check collision against.\n@return {Boolean}         true if they collide, false otherwise."
    },
    "getPenetration": {
      "!type": "fn(other: ?) -> +Vector2d",
      "!span": "1864[68:6]-1878[68:20]",
      "!doc": "gets penetration between the entities' colliders\n\n@method\n@return {Utils.Vector2d}    the penetration vector between colliders."
    },
    "getNormal": {
      "!type": "fn(other: ?) -> Vector.addVector.!1|+Vector2d",
      "!span": "2475[89:9]-2484[89:18]",
      "!doc": "gets the normal between the entitie's colliders.\n\n@method\n@return {Utils.Vector2d}    the normal vector between colliders."
    },
    "reset": {
      "!type": "fn()",
      "!span": "2714[102:6]-2719[102:11]"
    },
    "init": {
      "!type": "fn(x: number|+Transform, y: number|+Transform, w: number, h: number)",
      "!span": "2974[112:6]-2978[112:10]",
      "!doc": "c'tor"
    },
    "xMin": {
      "!type": "number",
      "!span": "2773[105:7]-2777[105:11]"
    },
    "yMin": {
      "!type": "number",
      "!span": "2815[106:7]-2819[106:11]"
    },
    "xMax": {
      "!type": "number",
      "!span": "2892[108:7]-2896[108:11]"
    },
    "yMax": {
      "!type": "number",
      "!span": "2931[109:7]-2935[109:11]"
    },
    "type": {
      "!type": "string",
      "!span": "3079[116:7]-3083[116:11]"
    }
  },
  "CircleCollider": {
    "!type": "fn(_x: number, _y: number, _R: number)",
    "!span": "284[10:9]-298[10:23]",
    "!doc": "@class\n@classdesc   Circle collider class\n@memberof    Colliders\n\n@param       {Number} _x x coordinate of the circle (center)\n@param       {Number} _y y coordinate of the circle (center)\n@param       {Number} _R the circle radius\n@constructor"
  },
  "__BUTTON_HANDLER_NAME": {
    "!type": "string",
    "!span": "92[4:6]-113[4:27]",
    "!doc": "Button Handler component.\n*************************"
  },
  "__BUTTON_HANDLER_HOVER_SPEED": {
    "!type": "number",
    "!span": "150[5:6]-178[5:34]"
  },
  "__BUTTON_HANDLER_HOVER_MAX": {
    "!type": "number",
    "!span": "192[6:6]-218[6:32]"
  },
  "ButtonHandler": {
    "component_name": {
      "!type": "string",
      "!span": "2064[93:14]-2078[93:28]",
      "!doc": "the component name\n\n@type {String}"
    },
    "active": {
      "!type": "bool",
      "!span": "2203[100:14]-2209[100:20]",
      "!doc": "quick enabler/disabler of all button handler\n\n@type {Boolean}"
    },
    "!type": "fn(owner: +Entity, speed: number)",
    "!span": "493[17:9]-506[17:22]",
    "!doc": "@class\n@classdesc \tthe button handler component.\n@memberof    Components\n\n@param       {Core.Entity} owner the entity the component's being applied to.\n@param       {Number} speed animation speed (ticks per second).\n@constructor"
  },
  "__COLLIDER_NAME": {
    "!type": "string",
    "!span": "86[4:6]-101[4:21]",
    "!doc": "collider component.\n*************************"
  },
  "Collider": {
    "component_name": {
      "!type": "string",
      "!span": "2306[92:9]-2320[92:23]",
      "!doc": "the component name\n\n@type {String}"
    },
    "!type": "fn(owner: ?, collisionResolver: ?, potential_entities: ?)",
    "!span": "521[17:4]-529[17:12]",
    "!doc": "@class\n@classdesc \tCollider component class\n@memberof    Components\n\n@param  {Core.Entity} owner the entity the component's being applied to.\n@param  {object} collisionResolver  collider object (e.g: AABB, CircleCollider)\n@param  {Container} potential_entities container of potential entities to check against\n\t\t\t\t\t\t\t\t\t\t  (usually dictionary)\n@constructor"
  },
  "__LAYOUT_COMPONENT_NAME": {
    "!type": "string",
    "!span": "173[4:6]-196[4:29]",
    "!doc": "layoutComponent.js - an layout applying component class\n***************************************************"
  },
  "LayoutHandler": {
    "component_name": {
      "!type": "string",
      "!span": "992[47:14]-1006[47:28]",
      "!doc": "the component's name\n\n@type String"
    },
    "!type": "fn(owner: ?) -> ?",
    "!span": "546[18:4]-559[18:17]",
    "!doc": "LayoutComponent - sets owner's children position & dimentions to fit certain\n\t\t\t\t\t layout type.\n\n@note: default layout type is raw (bypass). Set layoutType to change it.\n\n@memberof    Components\n\n@param  {Core.Entity} owner parent entity\n@return {object}       null\n@constructor"
  },
  "__RECTANGLE_EDITOR_NAME": {
    "!type": "string",
    "!span": "92[4:6]-115[4:29]",
    "!doc": "Button Handler component.\n*************************"
  },
  "__RECTANGLE_DEFAULT_ACTIVE_STYLE": {
    "!type": "string",
    "!span": "146[5:6]-178[5:38]"
  },
  "__RECTANGLE_DEFAULT_PASSIVE_STYLE": {
    "!type": "string",
    "!span": "194[6:6]-227[6:39]"
  },
  "RectangleEditor": {
    "currently_selected": {
      "!type": "+Entity",
      "!span": "2442[97:18]-2460[97:36]",
      "!doc": "the currently selected object\n\n@type {Core.Entity}"
    },
    "component_name": {
      "!type": "string",
      "!span": "3413[151:16]-3427[151:30]",
      "!doc": "the component name\n\n@type {String}"
    },
    "prototype": {
      "toString": {
        "!type": "fn() -> bool",
        "!span": "3483[153:26]-3491[153:34]"
      }
    },
    "!type": "fn(owner: +Entity, style: string)",
    "!span": "489[17:9]-504[17:24]",
    "!doc": "@class\n@classdesc \tthe rectangle editor component.\n@memberof    Components\n\n@param       {Core.Entity} owner the entity the component's being applied to.\n@param       {String} \t  color of the editor\n@constructor",
    "name": {
      "!type": "string",
      "!span": "527[19:6]-531[19:10]"
    },
    "style": {
      "!type": "string",
      "!span": "587[21:6]-592[21:11]"
    },
    "update": {
      "!type": "fn()",
      "!span": "719[28:6]-725[28:12]",
      "!doc": "updates rect editor component\n\n@method"
    },
    "setDimentions": {
      "!type": "fn(width: number, height: number)",
      "!span": "1748[65:6]-1761[65:19]",
      "!doc": "set dimentions of rectangle editor\n\n@method\n@param  {Number} width  desired width\n@param  {Number} height desire height"
    },
    "isSelected": {
      "!type": "fn() -> bool",
      "!span": "2076[79:6]-2086[79:16]",
      "!doc": "gets whether or not the owner is selected\n\n@method\n@return {Boolean} True if selected; false otherwise"
    },
    "selectOwner": {
      "!type": "fn()",
      "!span": "2228[89:6]-2239[89:17]",
      "!doc": "selects the owner\n\n@method"
    },
    "deselectOwner": {
      "!type": "fn()",
      "!span": "2629[107:6]-2642[107:19]",
      "!doc": "deselects the owner\n\n@method"
    },
    "render": {
      "!type": "fn()",
      "!span": "2867[119:6]-2873[119:12]",
      "!doc": "renders scene\n\n@method\n@return {Boolean} true if rendered, false otherwise."
    },
    "init": {
      "!type": "fn()",
      "!span": "2928[124:6]-2932[124:10]"
    },
    "rectangle": {
      "!type": "+Rectangle",
      "!span": "3074[130:7]-3083[130:16]"
    },
    "bb": {
      "!type": "+AABB",
      "!span": "3144[131:7]-3146[131:9]"
    }
  },
  "__RIGIDBODY_NAME": {
    "!type": "string",
    "!span": "87[3:6]-103[3:22]",
    "!doc": "rigid body component.\n*************************"
  },
  "__RIGIDBODY_BIAS": {
    "!type": "number",
    "!span": "135[4:6]-151[4:22]"
  },
  "__RIGIDBODY_EPSILON": {
    "!type": "number",
    "!span": "167[5:6]-186[5:25]"
  },
  "__RIGIDBODY_STAIC_MASS": {
    "!type": "number",
    "!span": "244[6:6]-266[6:28]"
  },
  "Rigidbody": {
    "component_name": {
      "!type": "string",
      "!span": "5136[183:10]-5150[183:24]",
      "!doc": "the component name\n\n@type {String}"
    },
    "!type": "fn(owner: ?)",
    "!span": "483[16:4]-492[16:13]",
    "!doc": "@class\n@classdesc\trigidbody component class.\n@memberof    Components\n\n@param       {Core.Entity} owner the entity the component's being applied to.\n@constructor"
  },
  "__SCRIPT_COMPONENT_NAME": {
    "!type": "string",
    "!span": "162[4:6]-185[4:29]",
    "!doc": "script.js - an entity script component class\n***************************************************"
  },
  "Script": {
    "component_name": {
      "!type": "string",
      "!span": "691[35:7]-705[35:21]",
      "!doc": "the component's name\n\n@type String"
    },
    "!type": "fn(owner: ?) -> ?",
    "!span": "427[16:4]-433[16:10]",
    "!doc": "script component - the script component object used as a c'tor to extend it.\n\n\n@memberof    Components\n\n@param  {Core.Entity} owner parent entity\n@return {object}       null\n@constructor"
  },
  "__COMPONENT_NAME": {
    "!type": "string",
    "!span": "320[8:6]-336[8:22]",
    "!doc": "component.js - an entity blank component class\nComponents in jscf are optional as you can use\n\tthe hirarchy, but are more comfortable as they\n\tare defined as children who get their parent\n\tin c'tor.\n***************************************************"
  },
  "Component": {
    "component_name": {
      "!type": "string",
      "!span": "975[43:10]-989[43:24]",
      "!doc": "the component's name\n\n@type String"
    },
    "typeToName": {
      "!type": "fn(type: fn(owner: +Entity, style: string)) -> !0.component_name",
      "!span": "1245[54:10]-1255[54:20]",
      "!doc": "static-like method that converts type to component name.\n\n@method\n@param  {Type} type\tthe type of the component\n@return {String}      the component's name"
    },
    "!type": "fn(owner: ?) -> ?",
    "!span": "628[19:4]-637[19:13]",
    "!doc": "Component - the empty component object used as a c'tor to extend it.\n\t\t\t   (this method replaces inheritance to keep wide support)\n\n@memberof    Core\n@param  {Core.Entity} owner parent entity\n@return {object}       null\n@constructor"
  },
  "Entity": {
    "!type": "fn(game: +Game, name: string, alive: bool, x: number, y: number, automated: bool)",
    "!span": "479[12:9]-485[12:15]",
    "!doc": "Entity object of the game engine.\n@param       {Core.Game} game         the game object\n@param       {String} name       the name of the entity\n@param       {Boolean} alive     is the entity enabled or disabled?\n@param       {Number} x          the x coordinate\n@param       {Number} y          the y coordinate\n@param       {Boolean} automated should the entity be automated (in update, render, etc)\n\n@memberof    Core\n@constructor",
    "start_render": {
      "!type": "fn()",
      "!span": "657[19:9]-669[19:21]"
    },
    "end_render": {
      "!type": "fn()",
      "!span": "1063[34:9]-1073[34:19]"
    },
    "render": {
      "!type": "fn()",
      "!span": "1241[44:9]-1247[44:15]"
    },
    "update": {
      "!type": "fn()",
      "!span": "1624[59:9]-1630[59:15]"
    },
    "hasOwnChild": {
      "!type": "fn(name: string) -> !this.children.<i>",
      "!span": "2078[74:9]-2089[74:20]"
    },
    "getChild": {
      "!type": "fn(name: string) -> ?",
      "!span": "2374[86:9]-2382[86:17]"
    },
    "getChildAt": {
      "!type": "fn(i: number) -> ?",
      "!span": "2956[108:9]-2966[108:19]"
    },
    "getComponent": {
      "!type": "fn(compName: string) -> ?",
      "!span": "3270[120:9]-3282[120:21]"
    },
    "getBuiltinComponent": {
      "!type": "fn(compName: string) -> ?",
      "!span": "3657[132:9]-3676[132:28]"
    },
    "getComponentOfType": {
      "!type": "fn(type: ?) -> Entity.getComponentOfType.!ret",
      "!span": "3992[144:9]-4010[144:27]"
    },
    "hasComponentOfType": {
      "!type": "fn(type: fn(owner: +Entity, style: string)) -> bool",
      "!span": "4472[160:9]-4490[160:27]"
    },
    "addComponent": {
      "!type": "fn(comp: fn(owner: +Entity, speed: number))",
      "!span": "4807[172:9]-4819[172:21]"
    },
    "setParent": {
      "!type": "fn(entity: ?)",
      "!span": "5096[184:9]-5105[184:18]"
    },
    "clearParent": {
      "!type": "fn()",
      "!span": "5275[194:9]-5286[194:20]"
    },
    "addChild": {
      "!type": "fn(name: string, child: ?|+Plane)",
      "!span": "5561[206:9]-5569[206:17]"
    },
    "insertChild": {
      "!type": "fn(c: ?|+RectangleEditor)",
      "!span": "5919[222:9]-5930[222:20]"
    },
    "delChild": {
      "!type": "fn(childName: string) -> bool",
      "!span": "6326[238:9]-6334[238:17]"
    },
    "delComponent": {
      "!type": "fn(componentName: string) -> bool",
      "!span": "6716[254:9]-6728[254:21]"
    },
    "delComponentOfType": {
      "!type": "fn(componentType: fn(owner: +Entity, style: string)) -> bool",
      "!span": "7044[266:9]-7062[266:27]"
    },
    "getGlobalTransform": {
      "!type": "fn() -> !this.transform",
      "!span": "7407[281:9]-7425[281:27]"
    },
    "getDimentions": {
      "!type": "fn() -> Entity.getDimentions.!ret",
      "!span": "7777[294:9]-7790[294:22]",
      "!doc": "get width & height\n\n@method\n@return {Utils.Vector2d} vector2d of (width, height)"
    },
    "setDimentions": {
      "!type": "fn(w: number, h: number)",
      "!span": "8814[327:9]-8827[327:22]"
    },
    "destroy": {
      "!type": "fn()",
      "!span": "9259[343:9]-9266[343:16]"
    },
    "getChildName": {
      "!type": "fn() -> string",
      "!span": "9721[359:9]-9733[359:21]",
      "!doc": "generates child name\n\n@method\n@param  {Core.Entity} parent parent entity\n@param  {object} child  child object/entity\n@return {String}        the generated name"
    },
    "getEntityChildren": {
      "!type": "fn() -> [?]",
      "!span": "9961[370:9]-9978[370:26]"
    },
    "init": {
      "!type": "fn()",
      "!span": "10242[382:9]-10246[382:13]"
    },
    "name": {
      "!type": "string",
      "!span": "10362[389:13]-10366[389:17]"
    },
    "children": {
      "<i>": {
        "!type": "+RectangleEditor",
        "!span": "5751[213:22]-5755[213:26]"
      },
      "!span": "10486[395:13]-10494[395:21]"
    },
    "game": {
      "!type": "+Game",
      "!span": "10773[407:13]-10777[407:17]"
    },
    "auto_physics": {
      "!type": "bool",
      "!span": "10902[413:13]-10914[413:25]"
    },
    "auto_render": {
      "!type": "bool",
      "!span": "11046[419:13]-11057[419:24]"
    },
    "auto_update": {
      "!type": "bool",
      "!span": "11186[425:13]-11197[425:24]"
    },
    "alive": {
      "!type": "bool",
      "!span": "11225[427:13]-11230[427:18]"
    },
    "max_cid": {
      "!type": "number",
      "!span": "11253[428:13]-11260[428:20]"
    }
  },
  "Game": {
    "!type": "fn(canvasWidth: number, canvasHeight: number, fps: number, assetDir: string)",
    "!span": "386[11:9]-390[11:13]",
    "!doc": "@class\n@classdesc Game is the engine's game object to interface with.\n@memberof Core\n\n@param  {Number} canvasWidth  The width of the game canvas\n@param  {Number} canvasHeight The height of the game canvas\n@param  {Number} fps          The frames per second to lock to\n@param  {String} assetDir     The assets directory\n@constructor",
    "init": {
      "!type": "fn()",
      "!span": "458[14:9]-462[14:13]"
    },
    "setup": {
      "!type": "fn()",
      "!span": "1923[78:9]-1928[78:14]"
    },
    "start": {
      "!type": "fn(update: +Function, automated: bool)",
      "!span": "2627[101:9]-2632[101:14]"
    },
    "stop": {
      "!type": "fn()",
      "!span": "3176[121:9]-3180[121:13]",
      "!doc": "stop playing the loaded sound.\n\n@method"
    },
    "handler": {
      "!type": "fn()",
      "!span": "3414[130:9]-3421[130:16]"
    },
    "updateLoop": {
      "!type": "fn()",
      "!span": "3785[148:9]-3795[148:19]"
    },
    "renderLoop": {
      "!type": "fn()",
      "!span": "4276[167:9]-4286[167:19]"
    },
    "getCurrentScene": {
      "!type": "fn() -> +Scene",
      "!span": "4684[183:9]-4699[183:24]"
    },
    "getCanvasWidth": {
      "!type": "fn() -> number",
      "!span": "4919[194:9]-4933[194:23]"
    },
    "getCanvasHeight": {
      "!type": "fn() -> number",
      "!span": "5200[205:9]-5215[205:24]"
    },
    "GetAnimSpeed": {
      "!type": "fn(fps_: ?) -> number",
      "!span": "5377[212:9]-5389[212:21]"
    },
    "renderText": {
      "!type": "fn(x: number, y: number, txt: string, style: string, font: string)",
      "!span": "5881[227:9]-5891[227:19]"
    },
    "logAndStop": {
      "!type": "fn(msg: ?)",
      "!span": "6271[244:9]-6281[244:19]"
    },
    "warn": {
      "!type": "fn(msg: string)",
      "!span": "6489[256:9]-6493[256:13]"
    },
    "lastDelay": {
      "!type": "number",
      "!span": "519[17:13]-528[17:22]"
    },
    "time": {
      "!type": "+Time",
      "!span": "547[18:13]-551[18:17]"
    },
    "graphics": {
      "!type": "+Graphics",
      "!span": "690[23:13]-698[23:21]"
    },
    "update": {
      "!type": "+Function",
      "!span": "720[24:13]-726[24:19]"
    },
    "automated": {
      "!type": "bool",
      "!span": "748[25:13]-757[25:22]"
    },
    "debug": {
      "!type": "bool",
      "!span": "779[26:13]-784[26:18]"
    },
    "state": {
      "!type": "string",
      "!span": "900[33:13]-905[33:18]"
    },
    "inputManager": {
      "!type": "+InputManager",
      "!span": "1058[42:13]-1070[42:25]"
    },
    "guiManager": {
      "!type": "+GuiManager",
      "!span": "1189[48:13]-1199[48:23]"
    },
    "resourceManager": {
      "!type": "+ResourceManager",
      "!span": "1335[54:13]-1350[54:28]"
    },
    "assetManager": {
      "!type": "+AssetManager",
      "!span": "1496[60:13]-1508[60:25]"
    },
    "sceneManager": {
      "!type": "+SceneManager",
      "!span": "1655[66:13]-1667[66:25]"
    }
  },
  "Time": {
    "getTime": {
      "!type": "fn() -> number",
      "!span": "1246[70:5]-1253[70:12]",
      "!doc": "gets arbitrary time measure as accurately as possible\n\n@method\n@return {Number} the time from browser"
    },
    "!type": "fn(fps: number)",
    "!span": "178[9:9]-182[9:13]",
    "!doc": "@class\n@classdesc the time class\n@memberof Core\n\n@param {Number} fps \tfixed tick duration by fps. if negative tick isn't fixed.\n\n@constructor",
    "getTimeFromStart": {
      "!type": "fn() -> number",
      "!span": "327[17:9]-343[17:25]",
      "!doc": "get time from engine start\n\n@method\n@return {Number} time from engine start"
    },
    "getDeltaTime": {
      "!type": "fn() -> !this.dt",
      "!span": "557[28:9]-569[28:21]",
      "!doc": "gets the delta time between updates\n\n@method\n@return {Number} the delta time"
    },
    "update": {
      "!type": "fn()",
      "!span": "689[38:6]-695[38:12]",
      "!doc": "updates time & delta time\n\n@method"
    },
    "isFixedTime": {
      "!type": "fn() -> !this.fps",
      "!span": "869[48:9]-880[48:20]"
    },
    "init": {
      "!type": "fn()",
      "!span": "957[53:6]-961[53:10]"
    },
    "dt": {
      "!type": "number",
      "!span": "789[44:7]-791[44:9]"
    },
    "lastTime": {
      "!type": "number",
      "!span": "835[45:7]-843[45:15]"
    },
    "startTime": {
      "!type": "number",
      "!span": "985[55:7]-994[55:16]"
    },
    "fps": {
      "!type": "number",
      "!span": "1054[57:7]-1057[57:10]"
    }
  },
  "Transform": {
    "prototype": {
      "toString": {
        "!type": "fn() -> string",
        "!span": "1047[42:20]-1055[42:28]"
      }
    },
    "add": {
      "!type": "fn(t1: +Transform, t2: ?) -> +Transform",
      "!span": "799[32:10]-802[32:13]",
      "!doc": "adds two transforms\n\n@method\n@param  {Core.Transform} t1 a transform\n@param  {Core.Transform} t2 a transform\n@return {Core.Transform}    the joined transform"
    },
    "!type": "fn(x: number, y: number, xscale: number, yscale: number)",
    "!span": "322[11:9]-331[11:18]",
    "!doc": "@class\n@classdesc the transform class\n@memberof Core\n\n@param       {Number} x      the x coordinate\n@param       {Number} y      the y coordinate\n@param       {Number} xscale the x-axis (horizontal) scaling\n@param       {Number} yscale the y-axis (vertical) scaling\n@constructor",
    "pos": {
      "!type": "+Vector2d",
      "!span": "464[17:9]-467[17:12]",
      "!doc": "position"
    },
    "angle": {
      "!type": "number",
      "!span": "577[21:9]-582[21:14]",
      "!doc": "rotating"
    }
  },
  "t": {
    "!type": "+Transform",
    "!span": "828[34:4]-829[34:5]"
  },
  "Animation": {
    "!type": "fn(game: ?, sprite: +Sprite, frameWidth: number, frameHeight: number, speed: number)",
    "!span": "436[12:9]-445[12:18]",
    "!doc": "@class\n@classdesc Animation class\n@memberof Graphics\n\n@param       {Core.Game} game          the game object\n@param       {Graphics.Sprite} sprite      the sprite object to apply animation to\n@param       {Number} frameWidth  the sprite tile frame width\n@param       {Number} frameHeight the sprite tile frame height\n@param       {Number} speed       the animation speed (fps)\n@constructor"
  },
  "AnimFrame": {
    "!type": "fn(px: number, py: number, w: number, h: number)",
    "!span": "295[11:9]-304[11:18]",
    "!doc": "@class\n@classdesc the animation frame class\n@memberof Graphics\n\n@param       {Number} px the frame x position\n@param       {Number} py the frame y position\n@param       {Number} w  the frame width\n@param       {Number} h  the frame height\n@constructor"
  },
  "AnimSprite": {
    "!type": "fn(game: ?, width: number, height: number, url: string, frameWidth: number, frameHeight: number, animSpeed: number)",
    "!span": "508[12:9]-518[12:19]",
    "!doc": "Animated Sprite class\n@param       {Core.Game} game             the game object\n@param       {Number} width          the sprite width\n@param       {Number} height         the sprite height\n@param       {String} url            URL to the resource\n@param       {Number} frameWidth     sprite frame tile width\n@param       {Number} frameHeight    sprite frame tile height\n@param       {Number} animSpeed      animation speed - fps.\n@memberof Graphics\n@constructor"
  },
  "Circle": {
    "!type": "fn(game: ?, radius: number, color: string)",
    "!span": "251[10:9]-257[10:15]",
    "!doc": "@class\n@classdesc A circular graphic\n@memberof Graphics\n\n@param {Core.Game} game  the game object.\n@param {Number} radius   radius of the circle.\n@param {String} color    color/style of 2d context.\n@constructor"
  },
  "ctx": {
    "fillStyle": {
      "!type": "string",
      "!span": "1026[50:6]-1035[50:15]"
    },
    "strokeStyle": {
      "!type": "string",
      "!span": "1123[52:6]-1134[52:17]"
    },
    "!span": "990[48:8]-993[48:11]"
  },
  "Effect": {
    "!type": "fn(pre_render: fn(ctx: Effect.pre_render.!0), post_render: fn(ctx: Effect.post_render.!0))",
    "!span": "234[9:9]-240[9:15]",
    "!doc": "@class\n@classdesc   Effect class\n@memberof Graphics\n\n@param       {function} pre_render  pre-render function(context)\n@param       {function} post_render post-render function(context)\n@constructor",
    "pre_render": {
      "!type": "fn(ctx: Effect.pre_render.!0)",
      "!span": "274[11:6]-284[11:16]"
    },
    "post_render": {
      "!type": "fn(ctx: Effect.post_render.!0)",
      "!span": "305[12:6]-316[12:17]"
    }
  },
  "noneFx": {
    "!type": "+Effect",
    "!span": "496[20:4]-502[20:10]",
    "!doc": "an empty effect\n@param  {Context} \t\tctx\t the cnavas context\n@return {Graphics.Effect}     the effect of adding shadow to renderable object."
  },
  "ShaderStart": {
    "!type": "fn(game: ?, effect: ?)",
    "!span": "1099[43:9]-1110[43:20]",
    "!doc": "shader starter\n\n@param       {Core.Game}          the JSCF game object\n@param       {Graphics.Effect}    effect effect to apply\n@constructor"
  },
  "ShaderEnd": {
    "!type": "fn(game: ?, effect: ?)",
    "!span": "1400[56:9]-1409[56:18]",
    "!doc": "shader ender\n\n@param       {Core.Game}          the JSCF game object\n@param       {Graphics.Effect}    effect effect to apply\n@constructor"
  },
  "Graphics": {
    "!type": "fn(canvasWidth: number, canvasHeight: number)",
    "!span": "384[12:9]-392[12:17]",
    "!doc": "@class\n@classdesc graphics related management (mainly canvas)\n@memberof Graphics\n\n@param {Number} canvasWidth  the width of the canvas to be created.\n@param {Number} canvasHeight  the height of the canvas to be created.\n\n@note: If canvasWidth or canvasHeight is negative, then they get the\n       window's corresponding size.\n@constructor",
    "init": {
      "!type": "fn()",
      "!span": "445[16:9]-449[16:13]",
      "!doc": "c'tor"
    },
    "clear": {
      "!type": "fn()",
      "!span": "1234[43:9]-1239[43:14]",
      "!doc": "clear - clears the canvas\n@return  null"
    }
  },
  "Plane": {
    "!type": "fn(game: +Game, width: number, height: number, color: string)",
    "!span": "308[11:9]-313[11:14]",
    "!doc": "@class\n@classdesc A rectangular-shaped graphic\n@memberof Graphics\n\n@param {Core.Game} game  the game object.\n@param {Number} width    width of the plane.\n@param {Number} height   height of the plane.\n@param {String} color    color/style of 2d context.\n@constructor",
    "width": {
      "!type": "number",
      "!span": "353[13:9]-358[13:14]"
    },
    "height": {
      "!type": "number",
      "!span": "377[14:9]-383[14:15]"
    },
    "color": {
      "!type": "string",
      "!span": "403[15:9]-408[15:14]"
    },
    "setDimentions": {
      "!type": "fn(w: number, h: number)",
      "!span": "608[25:9]-621[25:22]"
    },
    "getDimentions": {
      "!type": "fn() -> +Vector2d",
      "!span": "890[39:9]-903[39:22]"
    },
    "render": {
      "!type": "fn()",
      "!span": "1063[49:9]-1069[49:15]"
    }
  },
  "Rectangle": {
    "!type": "fn(game: ?, width: number, height: number, color: string)",
    "!span": "314[11:9]-323[11:18]",
    "!doc": "@class\n@classdesc A rectangular wire graphic\n@memberof Graphics\n\n@param {Core.Game} game  the game object.\n@param {Number} width    width of the rectangle.\n@param {Number} height   height of the rectangle.\n@param {String} color    color/style of 2d context.\n@constructor",
    "width": {
      "!type": "number",
      "!span": "363[13:9]-368[13:14]"
    },
    "height": {
      "!type": "number",
      "!span": "387[14:9]-393[14:15]"
    },
    "color": {
      "!type": "string",
      "!span": "413[15:9]-418[15:14]"
    },
    "setDimentions": {
      "!type": "fn(w: number, h: number)",
      "!span": "594[24:9]-607[24:22]",
      "!doc": "sets width & height\n\n@method\n@param  {Number} w width to set\n@param  {Number} h height to set"
    },
    "getDimentions": {
      "!type": "fn() -> Vector.addVector.!1",
      "!span": "876[38:9]-889[38:22]",
      "!doc": "get width & height\n\n@method\n@return {Utils.Vector2d} vector2d of (width, height)"
    },
    "render": {
      "!type": "fn()",
      "!span": "1053[48:9]-1059[48:15]",
      "!doc": "renders the rectangle\n\n@method"
    }
  },
  "Sprite": {
    "!type": "fn(game: ?, width: number, height: number, url: string)",
    "!span": "333[11:9]-339[11:15]",
    "!doc": "@class\n@classdesc sprite graphic class\n@memberof Graphics\n\n@param       {Core.Game} game       the game object\n@param       {Number} width    width of the sprite.\n@param       {Number} height   height of the sprite.\n@param       {String} url      the URL of the sprite graphic\n@constructor",
    "width": {
      "!type": "number",
      "!span": "441[18:9]-446[18:14]",
      "!doc": "width\n\n@type {Number}"
    },
    "height": {
      "!type": "number",
      "!span": "530[24:9]-536[24:15]",
      "!doc": "height\n\n@type {Number}"
    },
    "render": {
      "!type": "fn()",
      "!span": "688[34:9]-694[34:15]",
      "!doc": "renders the sprite\n\n@method"
    },
    "setImageSrcFromAsset": {
      "!type": "fn(asset: string)",
      "!span": "1108[46:9]-1128[46:29]",
      "!doc": "gets the resource URL from asset manager by itself. (assumes default path)\n\n@method\n@param  {String} asset asset file name"
    }
  },
  "InputManager": {
    "droppedFileCallback": {
      "!type": "fn()",
      "!span": "5670[230:13]-5689[230:32]"
    },
    "!type": "fn(canvas: ?)",
    "!span": "211[9:9]-223[9:21]",
    "!doc": "@class\n@classdesc the input manager of the engine's game object.\n@memberof Input\n\n@param {Canvas} canvas   the canvas object (usually from the Graphics module).\n\n@constructor",
    "isKeyDownChar": {
      "!type": "fn(c: string) -> bool",
      "!span": "563[23:9]-576[23:22]",
      "!doc": "checks if a certain key is down (currently pressed)\n\n@method\n@param  {String} c key character\n@return {Boolean}  true if key is pressed; false otherwise."
    },
    "isKeyDown": {
      "!type": "fn(code: number) -> bool",
      "!span": "883[34:9]-892[34:18]",
      "!doc": "*    checks if a certain key is down (currently pressed)\n *\n *    @method\n *    @param  {Number} code key code (number)\n *    @return {Boolean}  true if key is pressed; false otherwise."
    },
    "getMouseX": {
      "!type": "fn() -> number",
      "!span": "1072[44:9]-1081[44:18]",
      "!doc": "get mouse x position\n\n@method\n@return {Number} mouse x position"
    },
    "getMouseY": {
      "!type": "fn() -> number",
      "!span": "1256[55:9]-1265[55:18]",
      "!doc": "get mouse y position\n\n@method\n@return {Number} mouse y position"
    },
    "isMouseDown": {
      "!type": "fn() -> bool",
      "!span": "1503[66:9]-1514[66:20]",
      "!doc": "checks if mouse is down (mouse button is pressed)\n\n@method\n@return {Boolean} true if mouse button is pressed; false otherwise."
    },
    "isLMBDown": {
      "!type": "fn() -> bool",
      "!span": "1725[77:9]-1734[77:18]",
      "!doc": "checks if left mouse button is down\n\n@method\n@return {Boolean} true if pressed; false otherwise"
    },
    "isRMBDown": {
      "!type": "fn() -> bool",
      "!span": "1974[88:9]-1983[88:18]",
      "!doc": "checks if right mouse button is down\n\n@method\n@return {Boolean} true if pressed; false otherwise"
    },
    "getMouseEvent": {
      "!type": "fn() -> number",
      "!span": "2193[99:9]-2206[99:22]",
      "!doc": "get last mouse event\n\n@method\n@return {MouseEvent} the mouse event"
    },
    "setOnMouseUp": {
      "!type": "fn(callback: +Function)",
      "!span": "2446[110:9]-2458[110:21]",
      "!doc": "register callback to mouse up\n\n@method\n@param  {Function} callback callback function(e) to be called when mouseup is fired."
    },
    "setOnMouseDown": {
      "!type": "fn(callback: +Function)",
      "!span": "2739[121:9]-2753[121:23]",
      "!doc": "register callback to mouse down\n\n@method\n@param  {Function} callback callback function(e) to be called when mousedown is fired."
    },
    "setOnKeyUp": {
      "!type": "fn(callback: +Function)",
      "!span": "3031[132:9]-3041[132:19]",
      "!doc": "register callback to key up\n\n@method\n@param  {Function} callback callback function(event) to be called when keyup is fired"
    },
    "setOnKeyUpSpec": {
      "!type": "fn(key: number, callback: +Function)",
      "!span": "3424[144:9]-3438[144:23]",
      "!doc": "register callback to key up for specific key\n\n@method\n@param  {Number}   key      the key code of the key that fires the event\n@param  {Function} callback callback function(event) to be called when keyup is fired with key"
    },
    "readTextFile": {
      "!type": "fn(file: string)",
      "!span": "3706[157:9]-3718[157:21]",
      "!doc": "read text file\n@param  {String} file the file path\n@return file text"
    }
  },
  "Manifold": {
    "!type": "fn(e1: +Entity|Scene.addEntity.!0, e2: ?)",
    "!span": "217[9:9]-225[9:17]",
    "!doc": "@class\n@classdesc the collision manifold.\n@memberof Physics\n\n@param {Core.Entity} e1   one entity that collided.\n@param {Core.Entity} e2   other entity that collided.\n@constructor",
    "getPenetration": {
      "!type": "fn() -> Vector.addVector.!1",
      "!span": "805[29:6]-819[29:20]"
    },
    "getNormal": {
      "!type": "fn() -> Vector.addVector.!1",
      "!span": "1096[40:6]-1105[40:15]"
    }
  },
  "PhysicsEngine": {
    "!type": "fn(entities: Scene.entities)",
    "!span": "188[9:9]-201[9:22]",
    "!doc": "@class\n@classdesc the physics engine of JSCF.\n@memberof Physics\n\n@param {Container} entities   container of entities (usually dictionary)\n\n@constructor",
    "pixelMeterRatio": {
      "!type": "number",
      "!span": "311[16:6]-326[16:21]"
    },
    "numIterations": {
      "!type": "number",
      "!span": "448[22:6]-461[22:19]"
    },
    "simSpeed": {
      "!type": "number",
      "!span": "544[28:6]-552[28:14]"
    },
    "tickDuration": {
      "!type": "number",
      "!span": "732[34:6]-744[34:18]"
    },
    "applyNaturalForces": {
      "!type": "fn(rigidbody: Entity.getComponentOfType.!ret)",
      "!span": "1417[56:6]-1435[56:24]"
    },
    "applyCollision": {
      "!type": "fn(manifold: ?)",
      "!span": "1753[69:6]-1767[69:20]"
    },
    "fixPenetration": {
      "!type": "fn(manifold: ?)",
      "!span": "2112[83:6]-2126[83:20]"
    },
    "detectCollisions": {
      "!type": "fn() -> [+Manifold]",
      "!span": "2426[97:6]-2442[97:22]"
    },
    "resolveNaturalForces": {
      "!type": "fn()",
      "!span": "3731[149:6]-3751[149:26]"
    },
    "resolveCollisions": {
      "!type": "fn(manifolds: [?])",
      "!span": "4340[175:6]-4357[175:23]"
    },
    "update": {
      "!type": "fn(tick_duration: number)",
      "!span": "4771[192:6]-4777[192:12]"
    }
  },
  "AssetManager": {
    "!type": "fn(assetsDir: string)",
    "!span": "148[7:9]-160[7:21]",
    "!doc": "Asset management class\n@param       {String} assetsDir path to the asset directory\n\n@memberof Resources\n@constructor",
    "rules": {
      "<i>": {
        "!type": "string",
        "!span": "1570[67:19]-1573[67:22]"
      },
      "!span": "183[9:9]-188[9:14]"
    },
    "getExtention": {
      "!type": "fn(name: string) -> string",
      "!span": "388[18:9]-400[18:21]",
      "!doc": "get file extention from it's name/URL.\n\n@method\n@param  {String} name file name\n@return {String}      the file extention"
    },
    "getAssetPath": {
      "!type": "fn(name: string) -> string",
      "!span": "708[30:9]-720[30:21]",
      "!doc": "gets the default path for an asset (by file name)\n\n@method\n@param  {String} name asset file name\n@return {String}      asset default path"
    },
    "getAssetDir": {
      "!type": "fn() -> string",
      "!span": "938[41:9]-949[41:20]",
      "!doc": "gets the assets default directory\n\n@method\n@return {String} assets default directory"
    },
    "getRule": {
      "!type": "fn(ext: string) -> !this.rules.<i>",
      "!span": "1223[53:9]-1230[53:16]",
      "!doc": "gets default path for file extention saved as a rule\n\n@method\n@param  {String} ext asset file extention\n@return {String}     default asset directory"
    },
    "setRule": {
      "!type": "fn(ext: string, dir: string)",
      "!span": "1516[65:9]-1523[65:16]",
      "!doc": "sets the rule for default asset path (by extention)\n\n@method\n@param  {String} ext file extention\n@param  {String} dir directory to set default path to."
    }
  },
  "_clone": {
    "!type": "fn(item: ?) -> ?",
    "!span": "10[1:9]-16[1:15]"
  },
  "ResourceManager": {
    "!type": "fn()",
    "!span": "1855[58:9]-1870[58:24]",
    "!doc": "The resource manager. Handles URL resources as well as objects.\n\n@memberof Resources\n@constructor",
    "resources": {
      "!span": "1884[60:9]-1893[60:18]"
    },
    "getResourceName": {
      "!type": "fn(resource: ?)",
      "!span": "2069[68:9]-2084[68:24]",
      "!doc": "get resource name by resource object\n\n@method\n@param  {object} resource resource data (URL or object/blob)"
    },
    "get": {
      "!type": "fn(key: ?) -> !this.resources.<i>",
      "!span": "2515[83:9]-2518[83:12]",
      "!doc": "get resource by key\n\n@method\n@param  {object} key key to resource\n@return {object}     the resource desired or null if not found"
    },
    "getClone": {
      "!type": "fn(key: ?) -> ?",
      "!span": "2977[100:9]-2985[100:17]",
      "!doc": "get resource clone by key (CANT BE SELF-REFERENCING!)\n\n@method\n@param  {object} key key to resource\n@return {object}     copy of the resource or null if not found"
    },
    "add": {
      "!type": "fn(key: ?, resource: ?) -> bool",
      "!span": "3571[123:9]-3574[123:12]",
      "!doc": "add resource with key\n\n@method\n@param  {object} key      key to the resource\n@param  {object} resource the resource object\n@return {Boolean}         true if saved, false otherwise."
    },
    "remove": {
      "!type": "fn(key: ?) -> bool",
      "!span": "4163[144:9]-4169[144:15]",
      "!doc": "remove resource\n\n@method\n@param  {object} key key to resource to remove.\n@return {Boolean}    true if removed; false otherwise."
    },
    "removeByValue": {
      "!type": "fn(resource: ?) -> bool",
      "!span": "4646[160:9]-4659[160:22]",
      "!doc": "removes resource by resource object.\n\n@method\n@param  {object} resource the resource object to remove\n@return {Boolean}         true if removed; false otherwise."
    }
  },
  "Scene": {
    "!type": "fn(game: +Game)",
    "!span": "160[7:9]-165[7:14]",
    "!doc": "Scene class. (World class in other engines)\n@param       {Core.Game} game          the game object\n\n@memberof Scene\n@constructor",
    "paused": {
      "!type": "bool",
      "!span": "259[15:9]-265[15:15]"
    },
    "physicsEngine": {
      "!type": "+PhysicsEngine",
      "!span": "380[21:9]-393[21:22]"
    },
    "pause": {
      "!type": "fn()",
      "!span": "502[28:9]-507[28:14]"
    },
    "resume": {
      "!type": "fn()",
      "!span": "636[38:9]-642[38:15]"
    },
    "update": {
      "!type": "fn() -> bool",
      "!span": "824[49:9]-830[49:15]"
    },
    "render": {
      "!type": "fn() -> bool",
      "!span": "1494[75:9]-1500[75:15]"
    },
    "getEntity": {
      "!type": "fn(name: string) -> +Entity|Scene.addEntity.!0",
      "!span": "2068[98:9]-2077[98:18]"
    },
    "addEntity": {
      "!type": "fn(entity: Scene.addEntity.!0) -> !0",
      "!span": "2735[121:9]-2744[121:18]"
    },
    "delEntity": {
      "!type": "fn(entityName: string) -> bool",
      "!span": "3226[139:9]-3235[139:18]"
    },
    "createManualEntity": {
      "!type": "fn(name: string, x: number, y: number, firstChild: Scene.createManualEntity.!3) -> +Entity",
      "!span": "3947[160:9]-3965[160:27]"
    },
    "createEntity": {
      "!type": "fn(name: string, x: number, y: number, firstChild: Scene.createEntity.!3) -> +Entity",
      "!span": "4528[176:9]-4540[176:21]"
    },
    "createNewEntity": {
      "!type": "fn(firstChild: Scene.createNewEntity.!0) -> +Entity",
      "!span": "4954[190:9]-4969[190:24]"
    },
    "getChildName": {
      "!type": "fn(parent: +Entity, child: ?) -> !1.name",
      "!span": "5422[205:9]-5434[205:21]"
    },
    "getEntityName": {
      "!type": "fn() -> string",
      "!span": "5697[218:9]-5710[218:22]"
    },
    "serialize": {
      "!type": "fn() -> string|?",
      "!span": "5946[230:9]-5955[230:18]"
    },
    "deserialize": {
      "!type": "fn(data: ?)",
      "!span": "6261[245:9]-6272[245:20]"
    },
    "onFileDrop": {
      "!type": "fn(file: string)",
      "!span": "6531[258:9]-6541[258:19]"
    },
    "init": {
      "!type": "fn()",
      "!span": "6642[264:9]-6646[264:13]"
    },
    "entities_keys": {
      "!type": "[string]",
      "!span": "3349[144:13]-3362[144:26]"
    },
    "entities": {
      "!span": "6331[248:13]-6339[248:21]",
      "<i>": "+Entity"
    },
    "max_euid": {
      "!type": "number",
      "!span": "6704[267:13]-6712[267:21]"
    }
  },
  "__delete_array_element": {
    "!type": "fn(arr: [string], value: string) -> [string]",
    "!span": "6887[276:9]-6909[276:31]"
  },
  "__get_circular_replaces": {
    "!type": "fn() -> fn(key: string, value: ?)",
    "!span": "6999[281:6]-7022[281:29]"
  },
  "__func_reviver": {
    "!type": "fn(key: string, value: ?) -> fn()",
    "!span": "7384[297:6]-7398[297:20]"
  },
  "SceneManager": {
    "!type": "fn(game: +Game)",
    "!span": "134[7:9]-146[7:21]",
    "!doc": "Scene manager.\n@param       {Core.Game} game             the game object\n\n@memberof Scene\n@constructor",
    "scenes": {
      "!span": "164[9:9]-170[9:15]",
      "<i>": "+Scene",
      "splash": "+Scene"
    },
    "cur_scene": {
      "!type": "+Scene",
      "!span": "213[10:9]-222[10:18]"
    },
    "update": {
      "!type": "fn() -> bool",
      "!span": "402[18:9]-408[18:15]",
      "!doc": "update scene manager (current scene)\n\n@method\n@return {Boolean} scene's update return value"
    },
    "render": {
      "!type": "fn() -> bool",
      "!span": "629[29:9]-635[29:15]",
      "!doc": "render scene manager (current scene)\n\n@method\n@return {Boolean} scene's render return value"
    },
    "getCurrentScene": {
      "!type": "fn() -> !this.cur_scene",
      "!span": "836[40:9]-851[40:24]",
      "!doc": "gets the current scene\n\n@method\n@return {Scene.Scene} the current scene"
    },
    "setCurrentScene": {
      "!type": "fn(scene: ?) -> bool",
      "!span": "1108[52:9]-1123[52:24]",
      "!doc": "sets current scene\n\n@method\n@param  {Scene.Scene} scene a scene to set\n@return {Boolean}     true if was set; false otherwise."
    },
    "createScene": {
      "!type": "fn(sceneName: string) -> bool",
      "!span": "1572[69:9]-1583[69:20]",
      "!doc": "creates a scene\n\n@method\n@param  {String} sceneName scene name\n@return {Boolean}          true if created; false otherwise"
    },
    "deleteScene": {
      "!type": "fn(sceneName: string) -> bool",
      "!span": "2210[89:9]-2221[89:20]",
      "!doc": "deltes scene by name\n\n@method\n@param  {String} sceneName the scene name for deletetion\n@return {Boolean}          true if deleted; false otherwise."
    }
  },
  "SceneUtils": {
    "makeFloor": {
      "!type": "fn(game: ?, x: number, y: number, floor_width: number, tile_side: number, type: ?) -> [?]",
      "!span": "628[21:4]-637[21:13]",
      "!doc": "makes a sprite floor inefficently\n\n@method\n@param  {Core.Game} game        the game object\n@param  {Number} x           the initial x position\n@param  {Number} y           the initial y position\n@param  {Number} floor_width the floor's width\n@param  {Number} tile_side   the sprite tile's side (assumes square)\n@return {Array}              array of platforms"
    },
    "deleteParent": {
      "!type": "fn(game: +Game, entity: SceneUtils.deleteParent.!1)",
      "!span": "1304[38:4]-1316[38:16]",
      "!doc": "deletes a parent (along with object)\n\n@method\n@param  {Core.Game}   game   the jscf game object\n@param  {Core.Entity} entity the entity whose parent will be deleted."
    },
    "saveToFile": {
      "!type": "fn(data: ?, filename: ?, type: ?)",
      "!span": "1701[53:4]-1711[53:14]",
      "!doc": "Function to download data to a file\n\n   @method\n   @param  {Object} data the data to save"
    },
    "!span": "147[8:4]-157[8:14]",
    "!doc": "Scene utilities - serves as a static-like class to access scene utils.\n\n@memberof Scene"
  },
  "SoundPlayer": {
    "!type": "fn(src: string)",
    "!span": "149[8:9]-160[8:20]",
    "!doc": "@class\n@classdesc sound player class.\n@memberof Sound\n\n@param       {String} src URL to sound to play\n@constructor"
  },
  "__GUIMANAGER_DEBUG_PANEL_NAME": {
    "!type": "string",
    "!span": "22[1:6]-51[1:35]",
    "!doc": "Panel consts"
  },
  "__GUIMANAGER_WINDOW_NAME": {
    "!type": "string",
    "!span": "94[4:6]-118[4:30]",
    "!doc": "Widget consts"
  },
  "__GUIMANAGER_CONTAINER_NAME": {
    "!type": "string",
    "!span": "140[5:6]-167[5:33]"
  },
  "__GUIMANAGER_X_SUFFIX": {
    "!type": "string",
    "!span": "185[6:6]-206[6:27]"
  },
  "__GUIMANAGER_BG_NAME": {
    "!type": "string",
    "!span": "228[7:6]-248[7:26]"
  },
  "__GUIMANAGER_BTN_NAME": {
    "!type": "string",
    "!span": "267[8:6]-288[8:27]"
  },
  "__GUIMANAGER_TXT_NAME": {
    "!type": "string",
    "!span": "307[9:6]-328[9:27]"
  },
  "__GUIMANAGER_TXTBOX_NAME": {
    "!type": "string",
    "!span": "347[10:6]-371[10:30]"
  },
  "GuiManager": {
    "!type": "fn(game: +Game, utheme: ?)",
    "!span": "621[22:9]-631[22:19]",
    "!doc": "@class\n@classdesc the graphical interface manager of the engine's game object.\n@memberof UI\n\n@param {Core.Game} game   the JSCF game object.\n@param {Object}\t  utheme a UI theme object.\n\n@constructor",
    "isFocusConsumed": {
      "!type": "bool",
      "!span": "654[24:6]-669[24:21]"
    },
    "eleNum": {
      "!type": "number",
      "!span": "685[25:6]-691[25:12]"
    },
    "setTheme": {
      "!type": "fn(themeSettings: ?)",
      "!span": "998[36:6]-1006[36:14]",
      "!doc": "Sets theme via json / object settings (not override).\n\n@method\n@param  {Object} themeSettings the theme settings json / object."
    },
    "getTheme": {
      "!type": "fn() -> !this.theme",
      "!span": "1330[54:6]-1338[54:14]",
      "!doc": "get current theme\n\n@method\n@return {UI.Theme} the current theme"
    },
    "createContainer": {
      "!type": "fn(name: string, x: number, y: number, w: number, h: number, bgcolor: string) -> +Entity",
      "!span": "1872[70:6]-1887[70:21]",
      "!doc": "creates rectangular container with background\n\n@method\n@param  {String} name    container entity name\n@param  {Number} x       x position\n@param  {Number} y       y position\n@param  {Number} w       container width\n@param  {Number} h       container height\n@param  {String} bgcolor background color (2d context descriptor)\n@return {Core.Entity}         gui container entity"
    },
    "createDefaultContainer": {
      "!type": "fn(x: number, y: number) -> +Entity",
      "!span": "2408[89:6]-2430[89:28]",
      "!doc": "creates default rectangular container\n\n@method\n@param  {Number} x       x position\n@param  {Number} y       y position\n@return {Core.Entity}    default gui container entity"
    },
    "createButton": {
      "!type": "fn(name: string, x: number, y: number, w: number, h: number, bgcolor: string, txt: string, txtstyle: string, font: string) -> +Entity",
      "!span": "3414[113:6]-3426[113:18]",
      "!doc": "creates rectangular button\n\n@method\n@param  {String} name     button entity name\n@param  {Number} x        x position\n@param  {Number} y        y position\n@param  {Number} w        button width\n@param  {Number} h        button height\n@param  {String} bgcolor  background color (2d context descriptor)\n@param  {String} txt      the text to display on button\n@param  {String} txtstyle text 2d context styling (can be just color)\n@param  {String} font     2d cotext font description\n@return {Core.Entity}     gui button entity"
    },
    "createDefaultButton": {
      "!type": "fn(x: number, y: number, txt: string, onclick_fn: +Function) -> +Entity",
      "!span": "4310[142:6]-4329[142:25]",
      "!doc": "creates default gui button\n\n@method\n@param  {Number}\t\tx        \tx position\n@param  {Number}\t\ty        \ty position\n@param  {String}\t\ttxt      \tthe text to display on button\n@param  {Function}\tonclick_fn\tonclick function\n@return {Core.Entity}     \t\tdefault gui button entity"
    },
    "createTextBox": {
      "!type": "fn(name: string, x: number, y: number, w: number, h: number, txt: string, effect: +Effect) -> +Entity",
      "!span": "5407[172:6]-5420[172:19]",
      "!doc": "creates gui rectangular textbox\n\n@method\n@param  {String} name     textbox entity name\n@param  {Number} x        x position\n@param  {Number} y        y position\n@param  {Number} w        textbox width\n@param  {Number} h        textbox height\n@param  {String} bgcolor  background color (2d context descriptor)\n@param  {String} txt      the text to display on textbox\n@param  {Effect} effect \tthe effect to render with textbox\n@return {Core.Entity}     gui textbox entity"
    },
    "createDefaultTextBox": {
      "!type": "fn(x: number, y: number, txt: string) -> +Entity",
      "!span": "5980[195:6]-6000[195:26]",
      "!doc": "creates default gui textbox\n\n@method\n@param  {Number} x        x position\n@param  {Number} y        y position\n@param  {String} txt \t\ttext to set in textbox\n@return {Core.Entity}     default gui textbox entity"
    },
    "createLabel": {
      "!type": "fn(x: number, y: number, txt: string) -> +Entity",
      "!span": "6619[216:6]-6630[216:17]",
      "!doc": "creates label (text gui entity)\n\n@method\n@param  {Number} x        x position\n@param  {Number} y        y position\n@param  {String} txt      the text to display\n@return {Core.Entity}     the gui label entity"
    },
    "createDefaultWindow": {
      "!type": "fn(x: number, y: number) -> Scene.addEntity.!0",
      "!span": "7171[237:9]-7190[237:28]",
      "!doc": "creates default window\n\n@method\n@param  {Number} x      x coordinate\n@param  {Number} y      y coordinate\n@return {Core.Entity}   the window entity"
    },
    "createRectEditor": {
      "!type": "fn(x: number, y: number, style: string) -> +Entity",
      "!span": "8581[281:9]-8597[281:25]",
      "!doc": "create rect editor\n\n@method\n@param  {Number} x     x coordinate\n@param  {Number} y     y coordinate\n@param  {String} style context styling"
    },
    "errorPopup": {
      "!type": "fn(errMsg: string)",
      "!span": "8917[295:9]-8927[295:19]",
      "!doc": "inserts an error popup to scene\n\n@method\n@param  {String} errMsg message to show"
    },
    "insertRectangleEditor": {
      "!type": "fn()",
      "!span": "9268[307:9]-9289[307:30]",
      "!doc": "inserts rectangle editor to all editable entities\n\n@method"
    },
    "delRectangleEditor": {
      "!type": "fn()",
      "!span": "9739[321:9]-9757[321:27]"
    },
    "beautifyObjectString": {
      "!type": "fn(o: ?) -> string",
      "!span": "10275[340:7]-10295[340:27]",
      "!doc": "beautify child representation\n@method\n@param {object}\to an object\n@return {String}\ta name & type string representation"
    },
    "buildString": {
      "!type": "fn(e: ?, f: string) -> string",
      "!span": "10825[361:6]-10836[361:17]",
      "!doc": "builds string description of an object hirarchy\n\n@method\n@param  {object} e an object (entity, component, other object...)\n@param  {String} f filter string\n@return {String}   a nice string representation"
    },
    "generateUIName": {
      "!type": "fn(base: string) -> string",
      "!span": "11836[401:6]-11850[401:20]",
      "!doc": "[description]\n\n@method\n@param  {String} base the base name"
    },
    "focus": {
      "!type": "fn() -> bool",
      "!span": "11976[411:6]-11981[411:11]",
      "!doc": "consumes focus (lock-like)\n\n@method"
    },
    "resetFocus": {
      "!type": "fn()",
      "!span": "12273[427:6]-12283[427:16]",
      "!doc": "resets focus (do not call unless absolutely certain)\n\n@method"
    }
  },
  "Layout": {
    "calcPreferredSize": {
      "!type": "fn(target: ?)",
      "!span": "377[16:1]-394[16:18]",
      "!doc": "\t *\tThe method calculates a target children container preferred size based on its content.\n\t *\n     * \t@method\n\t * \t@param  {Core.Entity} target the entity to contain"
    },
    "doLayout": {
      "!type": "fn(target: ?)",
      "!span": "629[26:1]-637[26:9]",
      "!doc": "\t *    The method orders the target children container based on specific rules the manager implements.\n\t *\n     *    @method\n\t *    @param  {Core.Entity} target the container to apply changes to."
    },
    "!span": "187[8:4]-193[8:10]",
    "!doc": "Raw layout static class\n@namespace\n@memberof UI"
  },
  "LinedLayout": {
    "calcPreferredSize": {
      "!type": "fn(target: ?)",
      "!span": "945[44:1]-962[44:18]",
      "!doc": "\t *\tThe method calculates a target children container preferred size based on its content.\n\t *\n     * \t@method\n\t * \t@param  {Core.Entity} target the entity to contain"
    },
    "doLayout": {
      "!type": "fn(target: ?)",
      "!span": "1197[54:1]-1205[54:9]",
      "!doc": "\t *    The method orders the target children container based on specific rules the manager implements.\n\t *\n     *    @method\n\t *    @param  {Core.Entity} target the container to apply changes to."
    },
    "!span": "747[36:4]-758[36:15]",
    "!doc": "Lined layout static class\n@namespace\n@memberof UI"
  },
  "FitLayout": {
    "calcPreferredSize": {
      "!type": "fn(target: ?)",
      "!span": "2221[94:1]-2238[94:18]",
      "!doc": "\t *\tThe method calculates a target children container preferred size based on its content.\n\t *\n     * \t@method\n\t * \t@param  {Core.Entity} target the entity to contain"
    },
    "doLayout": {
      "!type": "fn(target: ?)",
      "!span": "2473[104:1]-2481[104:9]",
      "!doc": "\t *    The method orders the target children container based on specific rules the manager implements.\n\t *\n     *    @method\n\t *    @param  {Core.Entity} target the container to apply changes to."
    },
    "!span": "2029[87:4]-2038[87:13]",
    "!doc": "Fit layout static class\n\n@namespace\n@memberof UI"
  },
  "Textbox": {
    "!type": "fn(parent: +Entity, w: number, h: number, txt: string)",
    "!span": "319[12:9]-326[12:16]",
    "!doc": "@class\n@classdsc textbox graphic class\n@memberof UI\n\n@param       {Core.Entity}   parent entity to attach to\n@param       {Number} w      the width\n@param       {Number} h      the height\n@param       {String} txt    the default text to display (defaults to \"\")\n@constructor"
  },
  "Text": {
    "!type": "fn(game: +Game, txt: string, style: string, font: string)",
    "!span": "364[12:9]-368[12:13]",
    "!doc": "@class\n@classdesc text graphic class\n@memberof UI\n\n@param       {Core.Game} game    the game object\n@param       {String} txt        the text itself (destined to be rendered)\n@param       {String} style      2d context styling (can be just color)\n@param       {String} font       2d cotext font description\n@constructor"
  },
  "__UI_LIGHT_THEME": {
    "panel": {
      "width": {
        "!type": "string",
        "!span": "152[10:2]-159[10:9]"
      },
      "height": {
        "!type": "string",
        "!span": "172[11:2]-180[11:10]"
      },
      "margin": {
        "!type": "string",
        "!span": "193[12:2]-201[12:10]"
      },
      "!span": "138[9:1]-145[9:8]"
    },
    "button": {
      "color": {
        "!type": "string",
        "!span": "231[15:2]-238[15:9]"
      },
      "width": {
        "!type": "string",
        "!span": "255[16:2]-262[16:9]"
      },
      "height": {
        "!type": "string",
        "!span": "276[17:2]-284[17:10]"
      },
      "font_color": {
        "!type": "string",
        "!span": "297[18:2]-309[18:14]"
      },
      "font_size": {
        "!type": "string",
        "!span": "321[19:2]-332[19:13]"
      },
      "font": {
        "!type": "string",
        "!span": "370[20:2]-376[20:8]"
      },
      "!span": "216[14:1]-224[14:9]"
    },
    "container": {
      "color": {
        "!type": "string",
        "!span": "412[23:2]-419[23:9]"
      },
      "width": {
        "!type": "string",
        "!span": "438[24:2]-445[24:9]"
      },
      "height": {
        "!type": "string",
        "!span": "472[25:2]-480[25:10]"
      },
      "font": {
        "!type": "string",
        "!span": "506[26:2]-512[26:8]"
      },
      "!span": "394[22:1]-405[22:12]",
      "effect": "+Effect"
    },
    "textbox": {
      "width": {
        "!type": "string",
        "!span": "569[30:2]-576[30:9]"
      },
      "height": {
        "!type": "string",
        "!span": "591[31:2]-599[31:10]"
      },
      "!span": "553[29:1]-562[29:10]"
    },
    "label": {
      "font_color": {
        "!type": "string",
        "!span": "629[34:2]-641[34:14]"
      },
      "font_size": {
        "!type": "string",
        "!span": "654[35:2]-665[35:13]"
      },
      "font": {
        "!type": "string",
        "!span": "678[36:2]-684[36:8]"
      },
      "!span": "615[33:1]-622[33:8]"
    },
    "window": {
      "ctl_size": {
        "!type": "string",
        "!span": "717[39:2]-727[39:12]"
      },
      "!span": "702[38:1]-710[38:9]"
    },
    "!span": "116[8:6]-132[8:22]",
    "!doc": "A built-in theme for ui\n@namespace\n@memberof UI"
  },
  "__UI_DARK_THEME": {
    "panel": {
      "width": {
        "!type": "string",
        "!span": "785[45:2]-792[45:9]"
      },
      "height": {
        "!type": "string",
        "!span": "805[46:2]-813[46:10]"
      },
      "margin": {
        "!type": "string",
        "!span": "826[47:2]-834[47:10]"
      },
      "!span": "771[44:1]-778[44:8]"
    },
    "button": {
      "color": {
        "!type": "string",
        "!span": "864[50:2]-871[50:9]"
      },
      "width": {
        "!type": "string",
        "!span": "885[51:2]-892[51:9]"
      },
      "height": {
        "!type": "string",
        "!span": "906[52:2]-914[52:10]"
      },
      "font_color": {
        "!type": "string",
        "!span": "927[53:2]-939[53:14]"
      },
      "font_size": {
        "!type": "string",
        "!span": "951[54:2]-962[54:13]"
      },
      "font": {
        "!type": "string",
        "!span": "1000[55:2]-1006[55:8]"
      },
      "!span": "849[49:1]-857[49:9]"
    },
    "container": {
      "color": {
        "!type": "string",
        "!span": "1042[58:2]-1049[58:9]"
      },
      "width": {
        "!type": "string",
        "!span": "1068[59:2]-1075[59:9]"
      },
      "height": {
        "!type": "string",
        "!span": "1102[60:2]-1110[60:10]"
      },
      "font": {
        "!type": "string",
        "!span": "1136[61:2]-1142[61:8]"
      },
      "!span": "1024[57:1]-1035[57:12]",
      "effect": "+Effect"
    },
    "textbox": {
      "width": {
        "!type": "string",
        "!span": "1197[65:2]-1204[65:9]"
      },
      "height": {
        "!type": "string",
        "!span": "1219[66:2]-1227[66:10]"
      },
      "!span": "1181[64:1]-1190[64:10]",
      "effect": "+Effect"
    },
    "label": {
      "font_color": {
        "!type": "string",
        "!span": "1278[70:2]-1290[70:14]"
      },
      "font_size": {
        "!type": "string",
        "!span": "1303[71:2]-1314[71:13]"
      },
      "font": {
        "!type": "string",
        "!span": "1327[72:2]-1333[72:8]"
      },
      "!span": "1264[69:1]-1271[69:8]"
    },
    "window": {
      "ctl_size": {
        "!type": "string",
        "!span": "1366[75:2]-1376[75:12]"
      },
      "!span": "1351[74:1]-1359[74:9]"
    },
    "!span": "750[43:6]-765[43:21]"
  },
  "__UI_SIZE": {
    "!type": "fn(str: string, maxSize: number) -> !0",
    "!span": "1812[91:9]-1821[91:18]",
    "!doc": "convert string to int, css-like\n\n@method      __UI_SIZE\n@param       {String}           str          \tthe string to convert\n@param       {Number}           maxSize\t \tthe max size (usually canvas dimentions) in px\n@return      {Number}                        the desired length in px."
  },
  "__UI_FONT": {
    "!type": "fn(theme: ?) -> string",
    "!span": "2472[126:9]-2481[126:18]",
    "!doc": "__UI_FONT\n\n@method      __UI_FONT\n@param       {UI.Theme}  theme theme object\n@constructor\n@return      {String}\t\t\t font descriptor"
  },
  "Theme": {
    "!type": "fn(settings: __UI_DARK_THEME, canvasWidth: number, canvasHeight: number)",
    "!span": "2881[142:9]-2886[142:14]",
    "!doc": "@class\n@classdesc   Theme wrapper\n@memberof    UI\n\n@param       {Object} settings     theme settings JSON\n@param       {Number} canvasWidth  canvas width\n@param       {Number} canvasHeight canvas height\n@constructor"
  },
  "__EPSILON": {
    "!type": "number",
    "!span": "120[7:6]-129[7:15]",
    "!doc": "an epsilon to consider when using float calculations\n@memberof Utils\n\n@type {Number}"
  },
  "MathUtils": {
    "toRad": {
      "!type": "fn(deg: number) -> number",
      "!span": "469[23:4]-474[23:9]",
      "!doc": "converts degrees to radians\n\n@method\n@param  {Number} deg the angle in degrees\n@return {Number}     the corresponding radians to the angle."
    },
    "square": {
      "!type": "fn(n: number) -> number",
      "!span": "709[35:4]-715[35:10]",
      "!doc": "squares a number\n\n@method\n@param  {Number} n the number to square\n@return {Number}   the squared number"
    },
    "greaterThan": {
      "!type": "fn(a: number, b: number) -> bool",
      "!span": "1058[48:4]-1069[48:15]",
      "!doc": "floating point \">=\" checking against _EPSILON (see: _EPSILON)\n\n@method\n@param  {Number} a floating point number\n@param  {Number} b floating point number\n@return {Boolean}  true if abs(a-b) >= _EPSILON; false otherwise"
    },
    "lesserThan": {
      "!type": "fn(a: number, b: number) -> bool",
      "!span": "1434[61:4]-1444[61:14]",
      "!doc": "floating point \"<\" checking against _EPSILON (see: _EPSILON)\n\n@method\n@param  {Number} a floating point number\n@param  {Number} b floating point number\n@return {Boolean}  true if abs(a-b) < _EPSILON; false otherwise"
    },
    "sign": {
      "!type": "fn(n: number) -> number",
      "!span": "1696[73:4]-1700[73:8]",
      "!doc": "gets number sign\n\n@method\n@param  {Number} n the number\n@return {Number}   0 if n is 0; 1 if n > 0; -1 otherwise"
    },
    "!span": "248[14:4]-257[14:13]",
    "!doc": "An object that is used as a static class for math utilities.\n@namespace\n@memberof Utils"
  },
  "Point2d": {
    "!type": "fn(_x0: number, _y0: number)",
    "!span": "159[9:9]-166[9:16]",
    "!doc": "Point2d\n@memberof Utils\n\n@param       {Number} _x0 the x coordinate\n@param       {Number} _y0 the y coordinate\n@constructor"
  },
  "Vector2d": {
    "prototype": {
      "toString": {
        "!type": "fn() -> string",
        "!span": "5367[238:19]-5375[238:27]"
      }
    },
    "!type": "fn(x: number, y: number)",
    "!span": "226[10:9]-234[10:17]",
    "!doc": "@class\n@classdesc the vector handling class\n@memberof Utils\n\n@param       {Number} x the x coordinate (defaults to 0)\n@param       {Number} y the y coordinate (defaults to 0)\n@constructor",
    "x": {
      "!type": "number",
      "!span": "252[12:9]-253[12:10]"
    },
    "y": {
      "!type": "number",
      "!span": "276[13:9]-277[13:10]"
    },
    "add": {
      "!type": "fn(ax: number, ay: number) -> !this",
      "!span": "561[25:9]-564[25:12]",
      "!doc": "adds by scalars\n\n@method\n@param  {Number} ax scalar to add to x component\n@param  {Number} ay scalar to add to y component\n@return {Utils.Vector2d}  the updated vector"
    },
    "sub": {
      "!type": "fn(ax: number, ay: number) -> +Vector2d",
      "!span": "914[42:9]-917[42:12]",
      "!doc": "subs by scalars\n\n@method\n@param  {Number} ax scalar to sub to x component\n@param  {Number} ay scalar to sub to y component\n@return {Utils.Vector2d}  the updated vector"
    },
    "scalarAdd": {
      "!type": "fn(d: number) -> +Vector2d",
      "!span": "1205[57:9]-1214[57:18]",
      "!doc": "adds a scalar to both components.\n\n@method\n@param  {Number} d    scalar to add\n@return {Utils.Vector2d}    the updated vector"
    },
    "scalarSub": {
      "!type": "fn(d: number) -> +Vector2d",
      "!span": "1481[69:9]-1490[69:18]",
      "!doc": "subtracts a scalar to both components.\n\n@method\n@param  {Number} d    scalar to subtract\n@return {Utils.Vector2d}    the updated vector"
    },
    "scalarMul": {
      "!type": "fn(scalar: number) -> Vector.addVector.!1",
      "!span": "1750[81:9]-1759[81:18]",
      "!doc": "multiplies by scalar\n\n@method\n@param  {Number} scalar   scalar to multiply by\n@return {Utils.Vector2d}        the updated vector"
    },
    "scalarDiv": {
      "!type": "fn(scalar: number) -> Vector.addVector.!1",
      "!span": "2040[94:9]-2049[94:18]",
      "!doc": "divides by scalar\n\n@method\n@param  {Number} scalar   scalar to divide by\n@return {Utils.Vector2d}        the updated vector"
    },
    "addVector": {
      "!type": "fn(vec: Vector.addVector.!1) -> +Vector2d",
      "!span": "2424[111:9]-2433[111:18]",
      "!doc": "adds another vector\n\n@method\n@param  {Utils.Vector2d} vec vector to add to this vector\n@return {Utils.Vector2d}        the updated vector"
    },
    "subVector": {
      "!type": "fn(vec: +Vector2d) -> +Vector2d",
      "!span": "2722[123:9]-2731[123:18]",
      "!doc": "subtracts another vector\n\n@method\n@param  {Utils.Vector2d} vec    vector to sub from this vector\n@return {Utils.Vector2d}        the updated vector"
    },
    "dotProduct": {
      "!type": "fn(vec: +Vector2d) -> number",
      "!span": "3012[135:9]-3022[135:19]",
      "!doc": "dot product by another vector\n\n@method\n@param  {Vector2d} vec    another vector to dot product by\n@return {Number}          the dot product"
    },
    "length": {
      "!type": "fn() -> number",
      "!span": "3275[148:9]-3281[148:15]",
      "!doc": "get the length of this vector\n\n@method\n@return {Number} the length of the vector"
    },
    "getNormal": {
      "!type": "fn() -> +Vector2d",
      "!span": "3546[159:9]-3555[159:18]",
      "!doc": "gets the normalized vector as new vector\n\n@method\n@return {Utils.Vector2d} the normalized vector"
    },
    "normalize": {
      "!type": "fn()",
      "!span": "3843[173:9]-3852[173:18]",
      "!doc": "normalize the vector\n\n@method"
    },
    "makeArray": {
      "!type": "fn() -> [!this.x]",
      "!span": "4210[190:9]-4219[190:18]",
      "!doc": "converts the vector to an array of components\n\n@method\n@return {Array} array of the vector's components"
    },
    "clone": {
      "!type": "fn() -> +Vector2d",
      "!span": "4412[201:9]-4417[201:14]",
      "!doc": "clones the vector\n\n@method\n@return {Utils.Vector2d} copy of the vector"
    }
  },
  "Vector": {
    "addVector": {
      "!type": "fn(vec1: +Vector2d, vec2: Vector.addVector.!1) -> +Vector2d",
      "!span": "4856[219:4]-4865[219:13]",
      "!doc": "adds two vectors and returns the sum in new vector\n\n@method\n@param  {Utils.Vector2d} vec1 a vector to add\n@param  {Utils.Vector2d} vec2 a vector to add\n@return {Utils.Vector2d}      new summed vector"
    },
    "subVector": {
      "!type": "fn(vec1: number|+Vector2d, vec2: +Vector2d) -> +Vector2d",
      "!span": "5254[232:4]-5263[232:13]",
      "!doc": "subtracts first vector from second and returns the subtracted in new vector\n\n@method\n@param  {Utils.Vector2d} vec1 vector to sub from\n@param  {Utils.Vector2d} vec2 vector to sub\n@return {Utils.Vector2d}      new subtracted vector"
    },
    "!span": "4568[209:6]-4574[209:12]",
    "!doc": "Vector static-like class to allow access to vector utilities."
  },
  "shadowFx": "+Effect",
  "__UI_DEFAULT_THEME": "__UI_DARK_THEME"
};
