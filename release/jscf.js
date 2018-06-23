function AABB(t,i,e,n){this.setTransform=function(t){this.pos=t.pos,this.reset()},this.containsPoint=function(t,i){return t>this.xMin&&t<this.xMax&&i<this.yMax&&i>this.yMin},this.isColliding=function(t){return this.xMin<t.xMax&&this.xMax>t.xMin&&this.yMin<t.yMax&&this.yMax>t.yMin},this.getPenetration=function(t){var i=this.pos.clone();i.subVector(t.pos);var e=Math.abs(Math.abs(i.x)-(this.dims.x+t.dims.x)/2),n=Math.abs(Math.abs(i.y)-(this.dims.y+t.dims.y)/2);return e<n?new Vector2d(i.x>0?e:-e,0):new Vector2d(0,i.y>0?n:-n)},this.getNormal=function(t){var i=this.getPenetration(t);return i.normalize(),i},this.reset=function(){this.xMin=this.pos.x-this.dims.x/2,this.yMin=this.pos.y-this.dims.y/2,this.xMax=this.xMin+this.dims.x,this.yMax=this.yMin+this.dims.y},this.init=function(t,i,e,n){this.pos=new Vector2d(t,i),this.dims=new Vector2d(e,n),this.type="aabb",this.reset()},this.init(t,i,e,n)}function Animation(t,i,e,n,s){this.spr=i,this.frame=new AnimFrame(0,0,e,n),this.frameCounter=0,this.setAnimationIndex=function(t){this.frame.setAnimationIndex(t,this.spr.image.height)},this.setFrameIndex=function(t){this.frame.setFrameIndex(t,this.spr.image.width)},this.nextAnimation=function(){this.frame.nextAnimation(this.spr.image.height)},this.nextFrame=function(){this.frame.nextFrame(this.spr.image.width)},this.updateFrame=function(){this.frameCounter=(this.frameCounter+1)%Math.floor(t.fps/s),0==this.frameCounter&&this.nextFrame()},this.render=function(){t.graphics.context.drawImage(this.spr.image,this.frame.px,this.frame.py,this.frame.w,this.frame.h,this.spr.width/-2,this.spr.height/-2,this.spr.width,this.spr.height)}}function AnimFrame(t,i,e,n){this.px=t,this.py=i,this.w=e,this.h=n,this.getAnimationIndex=function(){return this.px/this.w},this.getFrameIndex=function(){return this.py/this.h},this.setAnimationIndex=function(t,i){this.py=(this.py+this.h*t)%i},this.setFrameIndex=function(t,i){this.px=t*this.w%i},this.nextAnimation=function(t){this.py=(this.py+this.h)%t},this.nextFrame=function(t){this.px=(this.px+this.w)%t}}function AnimSprite(t,i,e,n,s,r,o){this.spr=new Sprite(t,i,e,n),this.anim=new Animation(t,this.spr,s,r,o),this.interval=null,this.startAnimation=function(){var t=this;null==this.interval?this.interval=setInterval(function(){t.anim.nextFrame()},1/o*1e3):console.warn("JSCF: [startAnimation] animation already started!")},this.stopAnimation=function(){this.interval&&(clearInterval(this.interval),this.interval=null)},this.updateAnim=function(){this.anim.updateFrame()},this.render=function(){this.anim.render()},this.staticRender=function(){this.spr.render()}}function AssetManager(t){this.rules={},this.getExtention=function(t){return t.substring(t.lastIndexOf("."),t.length)},this.getAssetPath=function(i){return t+"\\"+i},this.getAssetDir=function(){return t},this.getRule=function(t){return this.rules[t]},this.setRule=function(t,i){this.rules[t]=i}}function CircleCollider(t,i,e){this.setTransform=function(t){this.pos=t.pos},this.containsPoint=function(t,i){var e=new Point2d(this.pos.x,this.pos.y),n=new Point2d(t,i);return e.distanceTo(n)<=this.R},this.isColliding=function(t){return Vector.subVector(this.pos-t.pos).length()<=this.R+t.R},this.getPenetration=function(t){var i=this.pos.clone();i.subVector(t.pos);var e=Math.abs(Math.abs(i.x)-(this.R+t.R)/2),n=Math.abs(Math.abs(i.y)-(this.R+t.R)/2);return new Vector2d(i.x>0?e:-e,i.y>0?n:-n)},this.getNormal=function(t){var i=this.getPenetration(t);return i.normalize(),i},this.init=function(t,i,e){this.pos=new Vector2d(t,i),this.R=e,this.type="circle",this.reset()},this.init(t,i,e)}function ButtonHandler(t,i){this.name=__BUTTON_HANDLER_NAME,this.parent=t,this.hover_speed=i?i:__BUTTON_HANDLER_HOVER_SPEED,this.pressed=!1;var e=t.getShapeByChild();this.bb=new AABB(t.transform.x,t.transform.y,e.x,e.y),this.update=function(){this.bb.setTransform(t.transform);var i=t.game.inputManager.getMouseX(),e=t.game.inputManager.getMouseY(),n=t.game.inputManager.IsMouseDown();this.bb.containsPoint(i,e)?(t.transform.scale.length()<__BUTTON_HANDLER_HOVER_MAX&&t.transform.scale.scalarMul(this.hover_speed),n&&(this.pressed=!0)):t.transform.scale=new Vector2d(1,1),this.pressed&&!n&&(this.pressed=!1,this.onClick())},this.onClick=function(){console.log("[JSCF][ButtonHandler] button press")}}function Entity(t,i,e,n,s,r){this.start_render=function(){var i=t.graphics.context;i.save(),i.translate(this.transform.pos.x,this.transform.pos.y),i.rotate(this.transform.angle),i.scale(this.transform.scale.x,this.transform.scale.y)},this.end_update=function(){t.graphics.context.restore()},this.render=function(){this.start_render();for(var t in this.children)this.children[t]&&this.children[t].render&&this.children[t].render();this.end_update()},this.update=function(){for(var t in this.children)this.children[t]&&this.children[t].update&&this.children[t].update()},this.hasOwnChild=function(t){return this.children[t]},this.getChild=function(t){var i=this.hasOwnChild(t);if(i)return i;for(var e in this.children)if(this.children.hasOwnProperty(e)&&this.children[e].getChild){var n=this.children[e].getChild(t);if(n)return n}},this.getChildAt=function(t){return Object.values(this.children)[t]},this.getComponent=function(t){return this.getChild("["+t+"]")},this.getBuiltinComponent=function(t){return this.getComponent("builtin_"+t)},this.getComponentOfType=function(t){var i=Component.typeToName(t),e=this.getChild(i);return e||(e=this.getBuiltinComponent(i)),e},this.hasComponentOfType=function(t){var i=Component.typeToName(t);return this.hasOwnChild(i)||this.hasOwnChild("[builtin_"+i+"]")},this.addComponent=function(t){var i=new t(this);this.children[i.name]=i},this.addChild=function(t,i){this.children[t]=i},this.insertChild=function(t){this.children[this.getChildName()]=t},this.getShapeByChild=function(){var t=null;for(var i in this.children)if(this.children.hasOwnProperty(i)&&this.children[i]){var e=this.children[i];if(e.width&&e.height){t=new Vector2d(e.width,e.height);break}}return null!=t?t:new Vector2d(this.transform.scale.x,this.transform.scale.y)},this.getChildName=function(){return this.name+"."+this.max_cid++},this.init=function(){this.name=i,this.alive=e,this.max_cid=0,this.children={},this.transform=new Transform(n,s),this.auto_physics=r,this.auto_render=r,this.auto_update=r,this.game=t},this.init()}function Graphics(t,i){this.init=function(){null==document.body&&alert("JSCF: Fatal error!\nCan't initialize graphics before body is loaded!"),this.canvas=document.createElement("canvas"),this.canvas.id="GameCanvas",t<0?this.canvas.width=window.innerWidth-50:this.canvas.width=t,i<0?this.canvas.height=window.innerHeight-50:this.canvas.height=i,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0])},this.init(),this.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}}function GuiManager(t){this.eleNum=0;var i=t.graphics.context.createLinearGradient(0,20,0,0);i.addColorStop(0,"#bebebe"),i.addColorStop(1,"#e7e7e7"),this.createContainer=function(i,e,n,s,r,o){var h=new Entity(t,i,!0,e,n,!0),a=new Plane(t,s,r,o);return h.addChild(__GUIMANAGER_BG_NAME,a),h},this.createDefaultContainer=function(t,i){return this.createContainer("con"+this.eleNum,t,i,__GUIMANAGER_CONTAINER_WIDTH,__GUIMANAGER_CONTAINER_HEIGHT,__GUIMANAGER_CONTAINER_COLOR)},this.createButton=function(i,e,n,s,r,o,h,a,c){var u=this.createContainer(i,e,n,s,r,o),d=new Text(t,h,a,c),l=d.getDimentions(),f=new Entity(t,i+"."+__GUIMANAGER_TXT_NAME,!0,-l.width/2,0,!0);return f.addChild(__GUIMANAGER_TXT_NAME,d),u.addChild(__GUIMANAGER_TXT_NAME,f),"undefined"==typeof ButtonHandler?console.warn("[JSCF][GuiManager] ButtonHandler component not loaded! Some functionality is disabled!"):u.addComponent(ButtonHandler),u},this.createDefaultButton=function(t,e,n){return this.createButton("btn"+this.eleNum++,t,e,__GUIMANAGER_BUTTON_WIDTH,__GUIMANAGER_BUTTON_HEIGHT,i,n,__GUIMANAGER_BUTTON_FONT_COLOR,__GUIMANAGER_BUTTON_FONT)}}function InputManager(t){function i(t){t.preventDefault(),u=t,c=!0}function e(t){t.preventDefault(),u=t,c=!1}function n(t){o[t.keyCode]=!0}function s(t){o[t.keyCode]=!1}function r(i){h=i.clientX-t.offsetLeft,a=i.clientY-t.offsetTop}var o=[],h=0,a=0,c=!1,u=-1;this.isKeyDownChar=function(t){return o[t.toUpperCase().charCodeAt()]},this.isKeyDown=function(t){return o[t]},this.getMouseX=function(){return h},this.getMouseY=function(){return a},this.IsMouseDown=function(){return c},this.getMouseEvent=function(){return u},this.setOnMouseUp=function(t){document.addEventListener("mouseup",t)},this.setOnMouseDown=function(t){document.addEventListener("mousedown",t)},document.addEventListener("keydown",n),document.addEventListener("keyup",s),document.addEventListener("mousemove",r),document.addEventListener("contextmenu",function(){event.preventDefault()}),this.setOnMouseDown(i),this.setOnMouseUp(e)}function Game(t,i,e,n){this.init=function(){this.state="loading",this.fps=e,this.interval=null,this.graphics=null,this.update=null,this.automated=!0,this.inputManager=null,this.assetManager=null,this.guiManager=null,this.resourceManager=new ResourceManager,this.assetManager=new AssetManager(n),this.sceneManager=new SceneManager(this,1/this.fps)},this.init(),this.setup=function(){this.graphics=new Graphics(t,i),this.inputManager=new InputManager(this.graphics.canvas),this.guiManager=new GuiManager(this)},this.start=function(t,i){if("running"!=this.state){this.update=t,this.automated=i,this.state="running";var n=this;this.interval=setInterval(function(){n.handler()},1e3/e)}},this.stop=function(){null!=this.interval&&clearInterval(this.interval)},this.handler=function(){this.automated&&(this.sceneManager.update(),this.graphics.clear(),this.sceneManager.render()),this.update&&this.update()},this.getCurrentScene=function(){return this.sceneManager.getCurrentScene()},this.getCanvasWidth=function(){return null!=this.graphics?this.graphics.canvas.width:t},this.getCanvasHeight=function(){return null!=this.graphics?this.graphics.canvas.height:i},this.FPS2AnimSpeed=function(t){return t*this.fps},this.renderText=function(t,i,e,n,s){var r=this.graphics.context;s&&(r.font=s),n&&(r.fillStyle=n),r.fillText(e,t,i)}}function Manifold(t,i){this.rigidBody1=t.getChild("[builtin_rigidbody]"),this.rigidBody2=i.getChild("[builtin_rigidbody]"),this.collider1=t.getChild("[builtin_collider]"),this.collider2=i.getChild("[builtin_collider]"),this.valid=this.rigidBody1&&this.rigidBody2&&this.collider1&&this.collider2,this.getPenetration=function(){return this.collider1.resolver.getPenetration(this.collider2.resolver)},this.getNormal=function(){return this.collider1.getNormal(this.collider2)}}function PhysicsEngine(t,i){this.pixelMeterRatio=50,this.numIterations=5,this.tickDuration=i/this.numIterations,this.gravity=new Vector2d(0,9.8*this.pixelMeterRatio),"undefined"==typeof Rigidbody&&(console.warn("[JSCF][PhysicsEngine] Rigidbody component not included! Disabled!"),this.numIterations=0),this.applyNaturalForces=function(t){t.auto_gravity&&!t.static&&t.applyAcceleration(this.gravity)},this.applyCollision=function(t){if(t.valid){var i=t.getNormal();t.rigidBody1.calcCollision(t.rigidBody2,i)}},this.fixPenetration=function(t){if(t.valid){var i=t.getPenetration();t.rigidBody1.fixPenetration(t.rigidBody2,i)}},this.detectCollisions=function(){var i={},e=[];for(entityName in t)if(t.hasOwnProperty(entityName)){var n=t[entityName];if(!n)continue;if(n.auto_physics){var s=n.getComponentOfType(Rigidbody);if(!s)continue;s.tick_update();var r=n.getComponentOfType(Collider);if(!r||!r.others)continue;r.update();for(var o=0;o<r.others.length;o++){var h=r.others[o];if(h){if(i[n.name]&&i[n.name][h.name])break;i[h.name]||(i[h.name]={}),i[h.name][n.name]=!0;var a=new Manifold(n,h);e.push(a)}}}}return e},this.resolveNaturalForces=function(){for(entityName in t)if(t.hasOwnProperty(entityName)){var i=t[entityName];if(!i)continue;if(i.auto_physics){var e=i.getComponentOfType(Rigidbody);if(!e)continue;this.applyNaturalForces(e)}}},this.resolveCollisions=function(t){for(var i=0;i<t.length;i++)this.applyCollision(t[i]);for(var i=0;i<t.length;i++)this.fixPenetration(t[i])},this.update=function(){for(var t=0;t<this.numIterations;t++){this.resolveNaturalForces();var i=this.detectCollisions();this.resolveCollisions(i)}}}function Plane(t,i,e,n){this.width=i,this.height=e,this.color=n,this.render=function(){ctx=t.graphics.context,ctx.fillStyle=this.color,ctx.fillRect(this.width/-2,this.height/-2,this.width,this.height)}}function Point2d(t,i){this.vec=new Vector2d(t,i),this.distanceTo=function(t){return Vector.subVector(this.vec,t.vec).length()},this.setX=function(t){this.vec.x=t},this.setY=function(t){this.vec.y=t},this.getX=function(){return this.vec.x},this.getY=function(){return this.vec.y}}function _clone(t){if(!t)return t;var i,e=[Number,String,Boolean];if(e.forEach(function(e){t instanceof e&&(i=e(t))}),"undefined"==typeof i)if("[object Array]"===Object.prototype.toString.call(t))i=[],t.forEach(function(t,e,n){i[e]=clone(t)});else if("object"==typeof t)if(t.nodeType&&"function"==typeof t.cloneNode)var i=t.cloneNode(!0);else if(t.prototype)i=t;else if(t instanceof Date)i=new Date(t);else{i={};for(var n in t)i[n]=_clone(t[n])}else i=t;return i}function ResourceManager(){this.resources={},this.getResourceName=function(t){for(var i=0,e=this.resources.length;i<e;i++)if(t==this.resources.data[i])return this.resources.data[i].name},this.get=function(t){return t&&this.resources[t]?this.resources[t]:(console.warn("[JSCF] resrouce manager get() - got invalid key."),null)},this.getClone=function(t){var i=this.get(t),e=_clone(i);return e.game&&(e.game=i.game),this.add(t+"_clone",e)?e:i},this.add=function(t,i){return t?this.resources[t]?(console.warn("[JSCF] resource manager set() - resource already exists!"),!1):(this.resources[t]=i,!0):(console.warn("[JSCF] resource manager set() - got invalid key."),!1)},this.remove=function(t){return t&&this.resources[t]?(this.resources[t]=null,!0):(console.warn("[JSCF] resrouce manager remove() - got invalid key."),null)},this.removeByValue=function(t){var i=this.getResourceName(t);return!!i&&this.remove(i)}}function Scene(t,i){this.max_euid=0,this.entities={},this.paused=!1,this.physicsEngine=new PhysicsEngine(this.entities,i),this.pause=function(){this.paused=!0},this.resume=function(){this.paused=!1},this.update=function(){if(this.paused)return!1;for(entityName in this.entities)if(this.entities.hasOwnProperty(entityName)){var t=this.entities[entityName];if(!t)continue;t.update&&t.auto_update&&t.update()}return this.physicsEngine.update(),!0},this.render=function(){if(this.paused)return!1;for(entityName in this.entities)if(this.entities.hasOwnProperty(entityName)){var t=this.entities[entityName];t&&t.auto_render&&t.render()}return!0},this.getEntity=function(t){var i=this.entities[t];if(i)return i;for(var e in this.entities)if(this.entities.hasOwnProperty(e)&&this.entities[e].getChild){var n=this.entities[e].getChild(t);if(n)return n}console.warn("[JSCF] scene couldn't find requested object: "+t)},this.addEntity=function(t){return!(t.name in this.entities)&&(this.entities[t.name]=t,t)},this.createManualEntity=function(i,e,n,s){var r=new Entity(t,i,!0,e,n,!1);return r.addChild(this.getChildName(r,s),s),this.addEntity(r)},this.createEntity=function(i,e,n,s){var r=new Entity(t,i,!0,e,n,!0);return r.addChild(this.getChildName(r,s),s),this.addEntity(r)},this.createNewEntity=function(i){var e=new Entity(t,this.getEntityName(),!0,0,0,!0);return e.addChild(this.getChildName(e,i),i),this.addEntity(e)},this.getChildName=function(t,i){return i.name?i.name:t.getChildName()},this.getEntityName=function(){return this.max_euid++,"entity_"+this.max_euid}}function SceneManager(t,i){this.tickDuration=i,this.scenes={splash:new Scene(t,this.tickDuration)},this.cur_scene=this.scenes.splash,this.update=function(){return this.cur_scene.update()},this.render=function(){return this.cur_scene.render()},this.getCurrentScene=function(){return this.cur_scene},this.setCurrentScene=function(t){return t&&this.scenes[t]?(this.cur_scene=this.scenes[t],!0):(console.warn("[JSCF] tried to change into an invalid scene!"),!1)},this.createScene=function(i){return i?this.scenes[i]?(console.warn("[JSCF] scene "+i+" already exists (scene creation)!"),!1):(this.scenes[i]=new Scene(t,this.tickDuration),!0):(console.warn("[JSCF] got an invalid scene name in creation!"),!1)},this.deleteScene=function(t){return t?!!this.scenes[t]||(console.warn("[JSCF] scene "+t+" doesn't exists (scene creation)!"),!1):(console.warn("[JSCF] got an invalid scene name in deletion!"),!1)}}function SoundPlayer(t){this.sound=document.createElement("audio"),this.sound.style.display="none",this.sound.src=t,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),document.body.appendChild(this.sound),this.play=function(){this.sound.play()},this.stop=function(){this.sound.pause()}}function Sprite(t,i,e,n){this.width=i,this.height=e,this.image=new Image,this.image.src=n,this.render=function(){t.graphics.context.drawImage(this.image,0,0,this.image.width,this.image.height,this.width/-2,this.height/-2,this.width,this.height)},this.setImageSrcFromAsset=function(i){this.image.src=t.assetManager.getAssetPath(i)}}function Text(t,i,e,n){this.txt=i,this.style=e,this.font=n,this.getDimentions=function(){var e=t.graphics.context;return e.font=this.font,e.measureText(i)},this.render=function(){for(var i=20,e=String(this.txt).split("\n"),n=0;n<e.length;n++)t.renderText(0,n*i,e[n],this.style,this.font)}}function Transform(t,i,e,n){t=t?t:0,i=i?i:0,e=e?e:1,n=n?n:1,this.pos=new Vector2d(t,i),this.scale=new Vector2d(e,n),this.angle=0}function Vector2d(t,i){this.x=t?t:0,this.y=i?i:0,this.add=function(t,i){return this.x+=t,this.y+=i,this},this.sub=function(t,i){return this.add(-t,-i)},this.scalarAdd=function(t){return this.add(t,t)},this.scalarSub=function(t){return this.sub(t,t)},this.scalarMul=function(t){this.x*=t,this.y*=t},this.scalarDiv=function(t){0!=t&&(this.x/=t,this.y/=t)},this.addVector=function(t){return this.add(t.x,t.y)},this.subVector=function(t){return this.sub(t.x,t.y)},this.dotProduct=function(t){return this.x*t.x+this.y*t.y},this.length=function(){return Math.sqrt(MathUtils.square(this.x)+MathUtils.square(this.y))},this.getNormal=function(){var t=this.length();return 0!=t?new Vector2d(this.x/t,this.y/t):new Vector2d(0,0)},this.normalize=function(){var t=this.length();return t?(this.x/=t,void(this.y/=t)):(this.x=0,void(this.y=0))},this.makeArray=function(){return[this.x,this.y]},this.clone=function(){return new Vector2d(this.x,this.y)}}const __COMPONENT_NAME="[builtin_component]";var Component=function(t){this.name=__COMPONENT_NAME,this.parent=t,this.init=function(){},this.update=function(){}};Component.component_name=__COMPONENT_NAME,Component.typeToName=function(t){var i=t.component_name;return i||(i=t.name.toLowerCase()),i};const __BUTTON_HANDLER_NAME="[builtin_button_handler]",__BUTTON_HANDLER_HOVER_SPEED=1.1,__BUTTON_HANDLER_HOVER_MAX=1.5;ButtonHandler.component_name=__BUTTON_HANDLER_NAME;const __COLLIDER_NAME="[builtin_collider]";var Collider=function(t,i,e){this.getNormal=function(t){return this.resolver.getNormal(t.resolver)},this.update=function(){this.resolver.setTransform(this.parent.transform),this.others=[],null==this.potential_entities&&(this.potential_entities=this.parent.game.getCurrentScene().entities);for(entityName in this.potential_entities)if(this.parent.name!=entityName&&this.potential_entities.hasOwnProperty(entityName)){var t=this.potential_entities[entityName];if(!t)continue;var i=t.getChild(this.name);i&&this.resolver.isColliding(i.resolver)&&this.others.push(t)}this.potential_entities=null},this.init=function(){if(this.name=__COLLIDER_NAME,this.parent=t,this.normal=new Vector2d(0,0),this.others=[],e?this.potential_entities=e:this.potential_entities=null,i)this.resolver=i;else{var n=this.parent.transform.pos,s=this.parent.getShapeByChild();this.resolver=new AABB(n.x,n.y,s.x,s.y)}},this.init()};Collider.component_name=__COLLIDER_NAME;const __RIGIDBODY_NAME="[builtin_rigidbody]",__RIGIDBODY_BIAS=1e4,__RIGIDBODY_EPSILON=__RIGIDBODY_BIAS/Number.MAX_VALUE,__RIGIDBODY_STAIC_MASS=1/__RIGIDBODY_EPSILON;var Rigidbody=function(t,i){this.setStaticBody=function(){this.static=!0,this.auto_gravity=!1,this.mass=__RIGIDBODY_STAIC_MASS},this.update=function(){this.auto_update&&this.tick_update()},this.tick_update=function(){this.parent.transform.pos.x+=this.velocity.x*this.tickDuration,this.parent.transform.pos.y+=this.velocity.y*this.tickDuration},this.calcCollision=function(t,i){const e=this.mass,n=t.mass,s=(this.cor+t.cor)/2,r=new Vector2d(-i.y,i.x),o=this.velocity,h=t.velocity;var a=o.dotProduct(i),c=r.dotProduct(o),u=i.dotProduct(h),d=r.dotProduct(h),l=c,f=d,p=(a*(e-s*n)+(1+s)*n*u)/(e+n),m=(u*(n-s*e)+(1+s)*e*a)/(e+n),g=new Vector2d(p*i.x,p*i.y),_=new Vector2d(l*r.x,l*r.y),y=new Vector2d(m*i.x,m*i.y),v=new Vector2d(f*r.x,f*r.y),N=new Vector2d(g.x+_.x,g.y+_.y),C=new Vector2d(y.x+v.x,y.y+v.y);this.static||(this.velocity=N),t.static||(t.velocity=C)},this.fixPenetration=function(t,i){i.clone();this.static||this.parent.transform.pos.addVector(i),t.static||t.parent.transform.pos.subVector(i)},this.applyAcceleration=function(t){var i=t.clone();i.scalarMul(this.tickDuration),this.applyVelocity(i)},this.applyVelocity=function(t){this.velocity.addVector(t)},this.init=function(){this.name=__RIGIDBODY_NAME,this.parent=t,i?this.tickDuration=i:this.tickDuration=this.parent.game.getCurrentScene().physicsEngine.tickDuration,this.displacement=new Vector2d(0,0),this.velocity=new Vector2d(0,0),this.ro=1,this.cor=1,this.mass=this.parent.transform.scale.x*this.parent.transform.scale.y*this.ro,this.auto_gravity=!0,this.auto_update=!1,this.static=!1,this.parent.hasComponentOfType(Collider)||console.error("[jscf/components/rigidbody] parent doesn't have collider."),this.parent.transform||console.error("[jscf/components/rigidbody] parent doesn't have transform! Not an entity?")},this.init()};Rigidbody.component_name=__RIGIDBODY_NAME;const __GUIMANAGER_BG_NAME="bg",__GUIMANAGER_TXT_NAME="txt",__GUIMANAGER_CONTAINER_COLOR="#a6a6a6cc",__GUIMANAGER_CONTAINER_WIDTH=150,__GUIMANAGER_CONTAINER_HEIGHT=__GUIMANAGER_CONTAINER_WIDTH,__GUIMANAGER_BUTTON_WIDTH=100,__GUIMANAGER_BUTTON_HEIGHT=50,__GUIMANAGER_BUTTON_FONT_COLOR="#000",__GUIMANAGER_BUTTON_FONT_SIZE=15,__GUIMANAGER_BUTTON_FONT="15px arial",__EPSILON=1e-8;var MathUtils={toRad:function(t){return t*Math.PI/180},square:function(t){return t*t},greaterThan:function(t,i){return t-i>=__EPSILON},lesserThan:function(t,i){return MathUtils.greaterThan(i,t)},sign:function(t){return t/Math.abs(t)}},SceneUtils={makeFloor:function(t,i,e,n,s,r){for(var o=[],h=0;h<n/s;h++)o[h]=new Entity(t,"plat",!0,i+s*h+s/2,e+t.getCanvasHeight()-s/2,!1),o[h].AddShapedChild("spr",new Sprite(t,s,s,r));return o}};const Vector={addVector:function(t,i){return t.clone().addVector(i)},subVector:function(t,i){return t.clone().subVector(i)}};