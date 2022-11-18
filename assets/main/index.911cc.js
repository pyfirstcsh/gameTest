window.__require=function e(i,t,r){function h(o,n){if(!t[o]){if(!i[o]){var a=o.split("/");if(a=a[a.length-1],!i[a]){var c="function"==typeof __require&&__require;if(!n&&c)return c(a,!0);if(s)return s(a,!0);throw new Error("Cannot find module '"+o+"'")}o=a}var l=t[o]={exports:{}};i[o][0].call(l.exports,function(e){return h(i[o][1][e]||e)},l,l.exports,e,i,t,r)}return t[o].exports}for(var s="function"==typeof __require&&__require,o=0;o<r.length;o++)h(r[o]);return h}({Game:[function(e,i){"use strict";cc._RF.push(i,"26a8540r/BFfp/D2qFhmmRf","Game");var t=e("./shape"),r=e("./chessType");cc.Class({extends:cc.Component,properties:{tilePrefab:cc.Prefab,bgtilePrefab:cc.Prefab,chessPrefab:cc.Prefab,shapeContainer:cc.Node,shapeBoard:cc.Node,restartNode:cc.Node,pauseNode:cc.Node,pauseResumeBtn:cc.Node,pausePic:cc.SpriteFrame,resumePic:cc.SpriteFrame,scoreLabel:cc.Label,RscoreLabel:cc.Label,FscoreLabel:cc.Label,aimNode:cc.Node,bgAudio:{default:null,type:cc.AudioClip},btnAudio:{default:null,type:cc.AudioClip},dropAudio:{default:null,type:cc.AudioClip},pauseResumeAudio:{default:null,type:cc.AudioClip},removeAudio:{default:null,type:cc.AudioClip},loseAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.registerEvent_monitor(),this.registerEvent(),this.crazy=cc.sys.localStorage.getItem("Mcrazy"),this.row=15,this.col=10,this.tileWidth=this.shapeBoard.width/this.col,this.tileHeight=this.shapeBoard.height/this.row,this.frequency=0,this.preJuTile=[],this.colorRecover=[],this.tilePool=new cc.NodePool,this.tilePool1=new cc.NodePool,this.chessPool=new cc.NodePool,1==this.crazy&&(this.scheduleOnce(function(){this.upAFewMode()},1),this.scheduleOnce(function(){this.upAFewMode()},1),this.scheduleOnce(function(){this.upAFewMode()},1)),this.makeShape(),this.confirmedTileArray=[],this.schedule(this.moveDown,1),this.schedule(this.recoverPreJudge,.1),this.schedule(this.preJudge,.1),this.isPaused=!1,this.end=!1,this.score=0,this.loadBg(),cc.audioEngine.playMusic(this.bgAudio,!0),cc.audioEngine.setMusicVolume(.7)},loadBg:function(){for(var e=0;e<this.row;e++)for(var i=0;i<this.col;i++){var t=cc.instantiate(this.bgtilePrefab);t.width=this.tileWidth-1,t.height=this.tileHeight-1,this.shapeContainer.addChild(t)}},addScore:function(){this.score+=1,this.scoreLabel.string="\u5206\u6570\uff1a"+String(this.score),this.RscoreLabel.string="\u5206\u6570\uff1a"+String(this.score),this.FscoreLabel.string="\u5206\u6570\uff1a"+String(this.score)},getColor:function(){var e=Math.round(255*Math.random()),i=Math.round(255*Math.random()),t=Math.round(255*Math.random());return new cc.Color(e,i,t)},makeShape:function(){this.frequency++,this.tileType=this.makeType(),console.log("type:"+this.tileType),this.shapeTileArray=[],1==this.tileType?this.makeTile():this.makeChess()},makeType:function(){return 1==this.crazy?0:this.frequency<=6?1:Math.floor(10*Math.random())%2?0:1},makeTile:function(){this.color=this.getColor();var e=Math.floor(Math.random()*(this.col-4))+2,i=e*this.tileWidth,t=2*this.tileHeight,r=this.getTile();r.color=this.color,r.position=cc.v2(i,t),r.width=this.tileWidth,r.height=this.tileHeight,this.shapeBoard.addChild(r),this.shapeTileArray.push(r);for(var h=this.getShapeCoords(),s=1;s<h.length;s++){var o=(h[s][0]+e)*this.tileWidth,n=(h[s][1]+2)*this.tileHeight,a=this.getTile();a.color=this.color,a.position=cc.v2(o,n),a.width=this.tileWidth,a.height=this.tileHeight,this.shapeBoard.addChild(a),this.shapeTileArray.push(a)}},makeChess:function(){var e=(Math.floor(Math.random()*(this.col-4))+2)*this.tileWidth,i=2*this.tileHeight,t=this.getChess();this.chessType=this.getChessType(),cc.resources.load(this.chessType,cc.SpriteFrame,function(e,i){e?cc.log(e):t.getComponent(cc.Sprite).spriteFrame=i}.bind(this)),t.position=cc.v2(e,i),t.width=this.tileWidth,t.height=this.tileHeight,this.shapeBoard.addChild(t),this.shapeTileArray.push(t)},getTile:function(){return this.tilePool.size()>0?this.tilePool.get():cc.instantiate(this.tilePrefab)},getChess:function(){return cc.instantiate(this.tilePrefab)},getShapeCoords:function(){var e=["squareShape","lineShape","tShape","zShape","zShapeMirror","lShape","lShapeMirror"];this.shape=e[Math.floor(Math.random()*e.length)];var i=t.SHAPE_COORDS[this.shape];return this.num=Math.floor(Math.random()*i.length),i[this.num]},getChessType:function(){var e=["horse","elephant","handsome","scholar","car","cannon","soldier"];return e[Math.floor(Math.random()*e.length)]},leftBtn:function(){if(!this.isPaused&&!this.end){this.recoverPreJudge(),this.preJudge();for(var e=0;e<this.shapeTileArray.length;e++){var i=Math.round(this.shapeTileArray[e].x-this.tileWidth),t=Math.round(this.shapeTileArray[e].y);if(i<0)return;for(var r=0;r<this.confirmedTileArray.length;r++){var h=Math.round(this.confirmedTileArray[r].x),s=Math.round(this.confirmedTileArray[r].y);if(h==i&&s==t)return}}for(var o=0;o<this.shapeTileArray.length;o++)this.shapeTileArray[o].x-=this.tileWidth}},dropBtn:function(){if(!this.isPaused&&!this.end)for(cc.audioEngine.playEffect(this.dropAudio,!1);;)if(!this.moveDown())return},moveDown:function(){var e=this;if(!this.isPaused&&!this.end){this.recoverPreJudge(),this.preJudge();for(var i=0;i<this.shapeTileArray.length;i++){var t=Math.round(this.shapeTileArray[i].x),r=Math.round(this.shapeTileArray[i].y-this.tileHeight);if(Math.abs(r)>=this.shapeBoard.height)return this.shapeTileArray.forEach(function(i){1==e.tileType?e.confirmedTileArray.push(i):e.chessPool.put(i)}),0==this.tileType&&this.chessRemove(),1==this.crazy&&this.scheduleOnce(function(){this.upAFewMode()},1),this.makeShape(),!1;for(var h=0;h<this.confirmedTileArray.length;h++){var s=Math.round(this.confirmedTileArray[h].x),o=Math.round(this.confirmedTileArray[h].y);if(s==t&&o==r)return this.shapeTileArray.forEach(function(i){1==e.tileType?e.confirmedTileArray.push(i):e.chessPool.put(i)}),this.judgeLose()&&this.lose(),0==this.tileType&&this.chessRemove(),1==this.crazy&&this.scheduleOnce(function(){this.upAFewMode()},1),this.makeShape(),!1}}for(var n=0;n<this.shapeTileArray.length;n++)this.shapeTileArray[n].y-=this.tileHeight;return!0}},rightBtn:function(){if(!this.isPaused&&!this.end){this.recoverPreJudge(),this.preJudge();for(var e=0;e<this.shapeTileArray.length;e++){var i=Math.round(this.shapeTileArray[e].x+this.tileWidth),t=Math.round(this.shapeTileArray[e].y);if(i>=this.shapeBoard.width)return;for(var r=0;r<this.confirmedTileArray.length;r++){var h=Math.round(this.confirmedTileArray[r].x),s=Math.round(this.confirmedTileArray[r].y);if(h==i&&s==t)return}}for(var o=0;o<this.shapeTileArray.length;o++)this.shapeTileArray[o].x+=this.tileWidth}},rotateBtn:function(){if(!this.isPaused&&!this.end){var e=this.num;if(1!=t.SHAPE_COORDS[this.shape].length){this.num+1==t.SHAPE_COORDS[this.shape].length?this.num=0:this.num+=1;for(var i=this.shapeTileArray[0],r=t.SHAPE_COORDS[this.shape][this.num],h=1;h<r.length;h++){var s=Math.round(i.x+r[h][0]*this.tileWidth),o=Math.round(i.y+r[h][1]*this.tileHeight);if(s<0||s>=this.shapeBoard.width||Math.abs(o)>=this.shapeBoard.height)return void(this.num=e);for(var n=0;n<this.confirmedTileArray.length;n++){var a=Math.round(this.confirmedTileArray[n].x),c=Math.round(this.confirmedTileArray[n].y);if(a==s&&c==o)return void(this.num=e)}}for(var l=1;l<r.length;l++){var d=r[l][0]*this.tileWidth+i.x,u=r[l][1]*this.tileHeight+i.y;this.shapeTileArray[l].position=cc.v2(d,u)}}}},chessRemove:function(){this.dropblock=[],cc.audioEngine.playEffect(this.removeAudio,!1);for(var e=Math.round(this.shapeTileArray[0].x),i=Math.round(this.shapeTileArray[0].y),t=0;t<r.CHESS_TYPE[this.chessType].length;t++)for(var h=0;h<this.confirmedTileArray.length;h++){var s=Math.round(this.confirmedTileArray[h].x+r.CHESS_TYPE[this.chessType][t][0]*this.tileWidth),o=Math.round(this.confirmedTileArray[h].y+r.CHESS_TYPE[this.chessType][t][1]*this.tileHeight);if(s==e&&o==i){this.particleLoc={x:this.confirmedTileArray[h].x+this.tileWidth/2,y:this.confirmedTileArray[h].y-this.tileHeight/2},this.dropblock.push([this.confirmedTileArray[h].x,this.confirmedTileArray[h].y]),this.tilePool1.put(this.confirmedTileArray[h]),this.confirmedTileArray.splice(h,1),this._onTouchBegin(),this.addScore();break}}0!=this.dropblock.length&&(this.updropflag=-1,this.scheduleOnce(function(){this.dropConfirmedTiles()},.5))},dropConfirmedTiles:function(){for(var e=0;e<this.dropblock.length;e++)for(var i=Math.round(this.dropblock[e][0]),t=Math.round(this.dropblock[e][1]),r=0;r<this.confirmedTileArray.length;r++){var h=Math.round(this.confirmedTileArray[r].x),s=Math.round(this.confirmedTileArray[r].y);i==h&&s>t&&(this.confirmedTileArray[r].y=this.confirmedTileArray[r].y+this.updropflag*this.tileHeight)}},judgeLose:function(){for(var e=0;e<this.confirmedTileArray.length;e++)if(Math.round(this.confirmedTileArray[e].y)>=0)return!0;return!1},lose:function(){this.unschedule(this.moveDown),this.end=!0,cc.audioEngine.stopMusic(),cc.audioEngine.playEffect(this.loseAudio),this.restartNode.active=!0},pauseResume:function(){this.end||(this.isPaused?(this.isPaused=!1,this.schedule(this.moveDown,1),cc.audioEngine.playMusic(this.bgAudio,!0),cc.audioEngine.setMusicVolume(.7),this.pauseResumeBtn.children[0].getComponent(cc.Sprite).spriteFrame=this.resumePic,this.pauseNode.active=!1):(this.isPaused=!0,this.unschedule(this.moveDown),cc.audioEngine.stopMusic(),this.pauseResumeBtn.children[0].getComponent(cc.Sprite).spriteFrame=this.pasuePic,this.pauseNode.active=!0))},restart:function(){cc.audioEngine.playEffect(this.btnAudio,!1),cc.director.loadScene("Game")},changeSence:function(){cc.director.loadScene("Game")},changeMainSence:function(){cc.director.loadScene("Main")},start:function(){},_onTouchBegin:function(){var e=this.particleLoc;this.newClickNode(e,function(e){var i=this;e&&(e.getComponent(cc.ParticleSystem).resetSystem(),this.shapeBoard.children.forEach(function(e){"clickNode"===e.name&&e.getComponent(cc.ParticleSystem).stopped&&(i._clickPool.put(e),cc.log("\u987a\u5229\u56de\u6536..."))}))}.bind(this))},newClickNode:function(e,i){var t=null;this._clickPool||(this._clickPool=new cc.NodePool),this._clickPool.size()>0?(t=this._clickPool.get(),this.setClickNode(t,e,i)):cc.loader.loadRes("prefabs/particle_texture",cc.Prefab,function(r,h){r||(t=cc.instantiate(h),this.setClickNode(t,e,i))}.bind(this))},setClickNode:function(e,i,t){e.name="clickNode",e.setPosition(i),cc.log(i.x,i.y),cc.log(e.x,e.y),this.shapeBoard.addChild(e),t&&t(e)},preJudge:function(){if(1!=this.tileType){for(var e={handsome:[[0,0],[0,1],[1,0],[1,1],[-1,0],[-1,1]],horse:[[1,1],[2,0],[-1,1],[-2,0]],scholar:[[-1,0],[1,0]],elephant:[[2,1],[-2,1]],car:[[0,0],[0,1],[0,2],[0,3]],cannon:[[0,1],[1,1],[-1,1]],soldier:[[0,0]]},i=this.shapeTileArray[0].x,t=-101010,r=0;r<this.confirmedTileArray.length;r++){var h=Math.round(this.confirmedTileArray[r].x),s=Math.round(this.confirmedTileArray[r].y);h==Math.round(i)&&s>t&&(t=this.confirmedTileArray[r].y)}for(var o=0;o<e[this.chessType].length;o++)for(var n=Math.round(i+e[this.chessType][o][0]*this.tileWidth),a=Math.round(t-e[this.chessType][o][1]*this.tileHeight),c=0;c<this.confirmedTileArray.length;c++){var l=Math.round(this.confirmedTileArray[c].x),d=Math.round(this.confirmedTileArray[c].y);n==l&&a==d&&(this.colorRecover.push(this.confirmedTileArray[c].color),this.preJuTile.push(this.confirmedTileArray[c]),this.confirmedTileArray[c].width/=1.5,this.confirmedTileArray[c].height/=1.5,this.confirmedTileArray[c].x,this.tileWidth,this.confirmedTileArray[c].y,this.tileHeight,this.confirmedTileArray[c].opacity=100)}}},recoverPreJudge:function(){for(var e=0;e<this.preJuTile.length;e++)this.preJuTile[e].width*=1.5,this.preJuTile[e].height*=1.5,this.preJuTile[e].opacity=255,this.preJuTile[e].x,this.tileWidth,this.preJuTile[e].y,this.tileHeight;this.preJuTile=[],this.colorRecover=[]},makeATile:function(e,i){this.color=this.getColor();var t=e*this.tileWidth,r=-1*i*this.tileHeight,h=this.getTile();this.shapeBoard.addChild(h),h.color=this.color,h.position=cc.v2(t,r),h.width=this.tileWidth,h.height=this.tileHeight,this.confirmedTileArray.push(h)},upAlineMode:function(){for(var e=0;e<this.confirmedTileArray.length;e++)this.confirmedTileArray[e].y=this.confirmedTileArray[e].y+this.tileHeight;for(var i=0;i<this.col;i++)this.makeATile(i,14);this.judgeLose()&&this.lose()},upAFewMode:function(){for(var e=this.col,i=Math.floor(Math.random()*e),t=0;t<i;t++){for(var r=Math.floor(Math.random()*e),h=0;h<this.confirmedTileArray.length;h++)this.confirmedTileArray[h].x==r*this.tileWidth&&(this.confirmedTileArray[h].y=this.confirmedTileArray[h].y+this.tileHeight);this.makeATile(r,14)}this.judgeLose()&&this.lose()},registerEvent_monitor:function(){var e=this;this.node.on(cc.Node.EventType.TOUCH_END,function(i){var t=i.getStartLocation(),r=i.getLocation().sub(t),h=Math.atan2(r.y,r.x),s=cc.misc.radiansToDegrees(h),o=Math.floor(s/45);e.emitEventByIndex(o,1)},this)},emitEventByIndex:function(e,i){0===e||-1===e?this.aimNode.emit("RIGHT",i):1===e||2===e?this.aimNode.emit("UP"):-2===e||-3===e?this.aimNode.emit("DOWN"):-4===e||3===e||4===e?this.aimNode.emit("LEFT",i):cc.error("\u65e0\u6b64\u65b9\u5411"+e)},registerEvent:function(){var e=this;this.node.on("UP",function(){console.log("sjsjsjsjsjsjj"),e.rotateBtn()},this),this.node.on("DOWN",function(){e.dropBtn()},this),this.node.on("LEFT",function(i){for(;i--;)e.leftBtn()},this),this.node.on("RIGHT",function(i){for(;i--;)e.rightBtn()},this)}}),cc._RF.pop()},{"./chessType":"chessType","./shape":"shape"}],chessType:[function(e,i,t){"use strict";cc._RF.push(i,"5126egfXS5FNpW6KHlV1Mji","chessType"),t.__esModule=!0,t.CHESS_TYPE=void 0,t.CHESS_TYPE={handsome:[[0,1],[0,2],[1,1],[1,2],[-1,1],[-1,2]],horse:[[1,2],[2,1],[-1,2],[-2,1]],scholar:[[-1,1],[1,1]],elephant:[[2,2],[-2,2]],car:[[0,1],[0,2],[0,3],[0,4]],cannon:[[0,2],[1,2],[-1,2]],soldier:[[0,1]]},cc._RF.pop()},{}],introduction:[function(e,i){"use strict";cc._RF.push(i,"2d7a0ikRxtB4ZbxkpG0gEIW","introduction"),cc.Class({extends:cc.Component,properties:{},changeMain:function(){cc.director.loadScene("Main")},onLoad:function(){},start:function(){}}),cc._RF.pop()},{}],main:[function(e,i){"use strict";cc._RF.push(i,"f3a49fJFL1Hnou51PZJWzgo","main"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},changeSence:function(){this.Mcrazy=0,cc.sys.localStorage.setItem("Mcrazy",this.Mcrazy),cc.director.loadScene("Game")},changeModel:function(){this.Mcrazy=1,cc.sys.localStorage.setItem("Mcrazy",this.Mcrazy),cc.director.loadScene("Game")},changeItro:function(){cc.director.loadScene("Introduction")},start:function(){}}),cc._RF.pop()},{}],shape:[function(e,i,t){"use strict";cc._RF.push(i,"d3752vG9jpNZ5n458wYLtqU","shape"),t.__esModule=!0,t.SHAPE_COORDS=void 0,t.SHAPE_COORDS={squareShape:[[[0,0],[0,1],[1,0],[1,1]]],lineShape:[[[0,0],[-1,0],[1,0],[2,0]],[[0,0],[0,-1],[0,1],[0,2]]],tShape:[[[0,0],[-1,0],[1,0],[0,-1]],[[0,0],[0,1],[1,0],[0,-1]],[[0,0],[-1,0],[0,1],[1,0]],[[0,0],[-1,0],[0,1],[0,-1]]],zShape:[[[0,0],[-1,0],[0,-1],[1,-1]],[[0,0],[0,-1],[1,0],[1,1]]],zShapeMirror:[[[0,0],[1,0],[0,-1],[-1,-1]],[[0,0],[0,1],[1,0],[1,-1]]],lShape:[[[0,0],[0,1],[1,0],[2,0]],[[0,0],[0,1],[0,2],[-1,0]],[[0,0],[0,-1],[-1,0],[-2,0]],[[0,0],[1,0],[0,-1],[0,-2]]],lShapeMirror:[[[0,0],[0,1],[-1,0],[-2,0]],[[0,0],[0,-1],[0,-2],[-1,0]],[[0,0],[0,-1],[1,0],[2,0]],[[0,0],[1,0],[0,1],[0,2]]]},cc._RF.pop()},{}]},{},["Game","chessType","introduction","main","shape"]);