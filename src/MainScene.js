var LAYER_TAG_MAIN = 1001;
var LAYER_TAG_GET_CARD = 1002;
var LAYER_TAG_USE_CARD = 1003;
var LAYER_TAG_RANDOM = 1004;

var MainLayer = cc.Layer.extend({

    players: [null, ],
    current_player_index: 2,
    already_random: false,
    already_use_card: false,
    stopped_lines_sprites: [],

    ctor:function () {
        this._super();

        var size = cc.winSize;
        var panelSize = {width: size.width / 5, height: size.height}

        cc.log(size);

        // 背景底图
        this.bgSprite = new cc.Sprite(res.MainBackground_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: scale
        });
        this.addChild(this.bgSprite, 0);

        // 描述
        var site_desc = new cc.Sprite(res.SiteDesc_png);
        site_desc.attr({
            x: size.width / 2,
            y: size.height - 53 *scale,
            scale: scale
        });
        var rule_desc = new cc.Sprite(res.RuleDesc_png);
        rule_desc.attr({
            x: 660 * scale,
            y: size.height - 770 * scale,
            scale: scale
        });
        this.addChild(site_desc, 1);
        this.addChild(rule_desc, 1);


        // 左边玩家
        this.buildPlayerPanel(
            {x: 140, y:215},
            res.Player1_N_png, res.Player1_D_png,
            res.Player1_title_png,
            function() {this.onClickUseCard(1)},
            function() {this.onClickRandom(1)});

        // 右边玩家
        this.buildPlayerPanel(
            {x: 1290, y:215},
            res.Player2_N_png, res.Player2_D_png,
            res.Player2_title_png,
            function() {this.onClickUseCard(2)},
            function() {this.onClickRandom(2)});

        this.nextPlayer();

        this.initEventListeners();

        return true;
    },

    initEventListeners: function() {
        this.move_listener = cc.eventManager.addListener({
            event: cc.EventListener.CUSTOM,
            eventName: "move_event",
            callback: function(event){
                var steps = event.getUserData();
                var node = event.getCurrentTarget();
                node.notifyPlayerMove(steps);
            }
        }, this);
        this.use_card_listener = cc.eventManager.addListener({
            event: cc.EventListener.CUSTOM,
            eventName: "use_card_event",
            callback: function(event){
                var data = event.getUserData();
                var node = event.getCurrentTarget();
                node.useCardToPlayer(data.target, data.card);
            }
        }, this);
    },

    buildPlayerPanel: function(pos, actionHeadPng, disableHeadPng, title, onUseCard, onRandom) {
        var size = cc.winSize;
        var PlayerBg = new cc.Sprite(res.PlayerBg_png);
        PlayerBg.attr({
            x: pos.x * scale,
            y: size.height - pos.y * scale,
            scale: scale
        });
        var PlayerTitle = new cc.Sprite(title);
        PlayerTitle.attr({
            x: (pos.x + 20) * scale,
            y: size.height - (pos.y - 105) * scale,
            scale: scale
        });
        var PlayerCardNum = new cc.Sprite(res.CardNum_png);
        PlayerCardNum.attr({
            x: pos.x * scale,
            y: size.height - (pos.y - 50) * scale,
            scale: scale
        });
        this.addChild(PlayerBg, 1);
        this.addChild(PlayerTitle, 2);
        this.addChild(PlayerCardNum, 2);

        this.initPlayer(actionHeadPng, disableHeadPng, pos);

        var menu = new cc.Menu([]);
        menu.x = 0;
        menu.y = 0;

        // 使用卡牌
        var item = new cc.MenuItemImage(
            res.CardBtn_N_png, res.CardBtn_S_png, onUseCard, this);
        item.attr({
            x: pos.x * scale,
            y: size.height - (pos.y + 15) * scale,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        menu.addChild(item)

        // 摇骰子
        item = new cc.MenuItemImage(
            res.RandomBtn_N_png, res.RandomBtn_S_png, onRandom, this);
        item.attr({
            x: pos.x * scale,
            y: size.height - (pos.y + 90) * scale,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        menu.addChild(item);
        this.addChild(menu, 2);
    },

    initPlayer: function(actionHeadPng, disableHeadPng, pos) {
        var size = cc.winSize;

        var p = new Player();
        p.init(actionHeadPng, disableHeadPng, pos);
        p.addCard(new StopLineCard(2));

        this.players.push(p);
        this.addChild(p.posSprite);
    },

    notifyPlayerMove: function(steps) {
        size = cc.winSize;

        this.already_random = true;

        var p = this.players[this.current_player_index];

        // 1. 检查双倍卡
        var buff = p.getBuff();
        if (buff && buff.type == CardType.DOUBE) {
            steps = steps * 2;
        }

        // 确定玩家可以移动到的所有站点
        this.targets = get_target_stations(p.pos, steps);
        cc.log(this.targets);
        this.map_menu = new cc.Menu([]);
        this.map_menu.attr({x: 0, y: 0});
        for (var i = 0; i < this.targets.length; i++) {
            var path = this.targets[i];
            var dest = path[path.length - 1];
            cc.log(dest);
            callback = function(v) {
                return function () {this.onPlayerMove(v);};
            }

            var item = new cc.MenuItemImage(
                res.SiteMove_png, res.SiteMove_png,
                callback(path),
                this);
            item.attr({
                x: dest.pos.x * scale,
                y: size.height - dest.pos.y * scale,
                scale: scale - 0.3,
                anchorX: 0.5,
                anchorY: 0.5
            });
            cc.log(item);
            this.map_menu.addChild(item);
        }
        this.addChild(this.map_menu, 1);
    },

    applyBuff: function(buff) {
        var card = buff.card;

        // 玩家对自己使用(滴滴卡，停线卡，雾霾卡，出霾卡)
        if (card.type == CardType.DIDI) {
            this.notifyPlayerMove(3);
            this.already_random = true;
        } else if (card.type == CardType.STOP_LINE) {
            this.stopLine(card.line);
        }
    },
    cleanBuff: function(buff) {
        var card = buff.card;

        if (card.type == CardType.STOP_LINE) {
            this.resumeLine(buff.card.line);
        }
    },

    useCardToPlayer: function(playerid, card) {
        var p = this.players[playerid];
        var buff = p.addBuff(card);

        // 玩家BUFF特效
        this.addChild(buff.sprite, 1);

        if (playerid == this.getCurrentPlayerId()) {
            this.applyBuff(buff);
        }

        this.already_use_card = true;
    },

    // path: 玩家移动时要路过的站点
    onPlayerMove: function(path) {
        var size = cc.winSize;
        var p = this.players[this.current_player_index];

        this.removeChild(p.posSprite);

        path = [p.pos].concat(path);
        cc.log(path);
        p.pos = path[path.length - 1];
        for (var i = 0; i < path.length; i++) {
            var pos = path[i].pos;
            if (i == path.length - 1) {
                sprite = new cc.Sprite(p.stoppedSite_png);
                sprite.attr({
                    x: pos.x * scale,
                    y: size.height - pos.y * scale,
                    scale: 0.3,
                });
                p.posSprite = sprite;
            } else {
                sprite = new cc.Sprite(p.passedSite_png);
                sprite.attr({
                    x: pos.x * scale,
                    y: size.height - pos.y * scale,
                    scale: scale - 0.3,
                });
            }
            this.addChild(sprite);
        }
        this.removeChild(this.map_menu);
        this.map_menu = null;

        this.nextPlayer();
    },

    getCurrentPlayerId: function() {
        return this.current_player_index;
    },
    getOtherPlayerId: function() {
        return this.current_player_index % (this.players.length - 1) + 1;
    },

    beforeAction: function(player) {
        // 1. 修改玩家头像状态
        this.removeChild(player.disableHeadSprite);
        this.addChild(player.actionHeadSprite, 2);

        // 2. 被施加的卡牌buff
        var buff = player.getBuff();
        if (buff) {
            this.applyBuff(buff);
        }

        // 3. 数据状态
        this.already_random = false;
        this.already_use_card = false;
    },
    onActionFinished: function(player) {
        // 1. 头像
        this.removeChild(player.actionHeadSprite);
        this.addChild(player.disableHeadSprite, 2);

        // 2. 卡牌buff
        var buff = player.cleanBuff();
        if (buff) {
            this.cleanBuff(buff);
            this.removeChild(buff.sprite);
        }

        // 3. 数据状态
    },

    nextPlayer: function() {
        var currPlayer = this.players[this.getCurrentPlayerId()];
        if (currPlayer) {
            this.onActionFinished(currPlayer);
        }

        this.current_player_index = this.getOtherPlayerId();

        var otherPlayer = this.players[this.getCurrentPlayerId()];
        this.beforeAction(otherPlayer);
    },

    stopLine: function(n) {
        this.stopped_lines_sprites[n] = [];

        var size = cc.winSize;
        var line = lines[n];
        for(var i = 0; i < line.length; i++) {
            var sprite = new cc.Sprite('res/main/site_off.png');
            sprite.attr({
                x: line[i].pos.x * scale,
                y: size.height - line[i].pos.y * scale,
                scale: scale - 0.3
            });
            this.stopped_lines_sprites.push(sprite);
            this.addChild(sprite, 1);
        }
    },
    resumeLine: function(n) {
        for(var i = 0; i < this.stopped_lines_sprites.length; i++) {
            this.removeChild(this.stopped_lines_sprites[i]);
        }
        this.stopped_lines_sprites[n] = [];
    },

    onClickUseCard: function(playerid) {
        cc.log('Player: ' + playerid + ' UserCard');
        if (playerid != this.current_player_index)
            return;
        if (this.already_use_card || this.already_random)
            return;

        var p = this.players[this.getCurrentPlayerId()];
        var card = p.useCard();
        if (!card) return;

        layer = this.parent.getChildByTag(LAYER_TAG_USE_CARD);
        layer.popup(card);
    },
    onClickRandom: function(playerid) {
        cc.log('Player: ' + playerid + ' Random');
        if (playerid != this.current_player_index)
            return;
        if (this.already_random)
            return;

        layer = this.parent.getChildByTag(LAYER_TAG_RANDOM);
        layer.popup();
    }
});

var ModalLayer = cc.Layer.extend({
    _listener: null,

    ctor: function() {
        this._super();

        var size = cc.winSize;

        var bgSprite = new cc.Sprite(res.Shadow_png);
        bgSprite.attr({
            x: size.width / 2, y: size.height / 2,
            width: size.width, height: size.height
        });
        this.addChild(bgSprite, 0);

        this.setVisible(false);     //默认设置为不可见
    },

    onEnter: function()  
    {  
        this._super();  
        //监听器  
        this._listener = new cc.EventListener.create({  
            event: cc.EventListener.TOUCH_ONE_BY_ONE,  
            swallowTouches: false,  
            onTouchBegan: function(touch, event)  
            {
                cc.log("Touch");
                return true;  
            }  
        });  
   
        //添加触摸监听  
        cc.eventManager.addListener(this._listener, this);  
    },

    //弹出  
    popup: function()  
    {  
        this.setVisible(true);  
        this._listener.setSwallowTouches(true);  
    },  
   
    //隐藏  
    hidden: function()  
    {  
        this.setVisible(false);  
        this._listener.setSwallowTouches(false);  
    },  
   
    onExit: function()  
    {  
        this._super();  
        //移除触摸监听  
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE, true);  
    }  
});

var GetCardLayer = ModalLayer.extend({
    ctor: function(playerid) {
        this._super();
        this.playerid = playerid;

        var size = cc.winSize;
        var cardSprite = new cc.Sprite(res.CardGet_png);
        cardSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: scale
        });
        this.addChild(cardSprite, 1);

        var item = new cc.MenuItemImage(
            res.CardClose_N_png, res.CardClose_S_png, this._onOK, this);
        item.attr({
            x: 948 * scale,
            y: size.height - 127 * scale,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.cardClose = new cc.Menu([item]);
        this.cardClose.x = 0;
        this.cardClose.y = 0;
        this.addChild(this.cardClose, 1);
    },

    _onOK: function() {
        this.hidden();
    }
});

var UseCardLayer = ModalLayer.extend({
    cardNode: null,

    ctor: function(playerid) {
        this._super();
        this.playerid = playerid;

        var size = cc.winSize;

        var menu = new cc.Menu([]);
        menu.x = 0;
        menu.y = 0;

        var item = new cc.MenuItemImage(
            res.CardClose_N_png, res.CardClose_S_png, this._onOK, this);
        item.attr({
            x: 948 * scale,
            y: size.height - 127 * scale,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        menu.addChild(item);

        var item = new cc.MenuItemImage(
            res.CardToSelf_N_png, res.CardToSelf_S_png, this._useToSelf, this);
        item.attr({
            x: 820 * scale,
            y: size.height - 640 * scale,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        menu.addChild(item);
 
        var item = new cc.MenuItemImage(
            res.CardToOther_N_png, res.CardToOther_S_png, this._useToOther, this);
        item.attr({
            x: 630 * scale,
            y: size.height - 640 * scale,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        menu.addChild(item);
 
        this.addChild(menu, 2);
    },

    popup: function(card) {
        this.card = card;

        var size = cc.winSize;

        var cardBgSprite = new cc.Sprite(card.pic);
        cardBgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: scale
        });
        this.addChild(cardBgSprite, 1);

        this._super();
    },

    _onOK: function() {
        this.hidden();
    },

    _useToSelf: function() {
        this.hidden();

        main_layer = this.parent.getChildByTag(LAYER_TAG_MAIN);
        var event = new cc.EventCustom("use_card_event");
        event.setUserData({
            card: this.card,
            target:main_layer.getCurrentPlayerId()
        });
        cc.eventManager.dispatchEvent(event);
    },
    _useToOther: function() {
        this.hidden();

        main_layer = this.parent.getChildByTag(LAYER_TAG_MAIN);
        var event = new cc.EventCustom("use_card_event");
        event.setUserData({
            card: this.card,
            target:main_layer.getOtherPlayerId()
        });
        cc.eventManager.dispatchEvent(event);
    }
});


var RandomLayer = ModalLayer.extend({
    random_count_max: 1,
    random_count: 0,
    randomSprite: null,
    randomYes: null,
    note: null,
    box_pngs: [res.RandomBox1_png, res.RandomBox2_png, res.RandomBox3_png,
        res.RandomBox4_png, res.RandomBox5_png, res.RandomBox6_png
    ],
    note_pngs: [
        res.RandomNote1_png,
        res.RandomNote2_png,
        res.RandomNote3_png,
        res.RandomNote4_png,
        res.RandomNote5_png,
        res.RandomNote6_png
    ],

    ctor: function(playerid) {
        this._super();
        this.playerid = playerid;

        var size = cc.winSize;
        item = new cc.MenuItemImage(
            res.RandomYes_N_png, res.RandomYes_S_png, this._onOK, this);
        item.attr({
            x: size.width / 2,
            y: size.height / 4,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.randomYes = new cc.Menu([item]);
        this.randomYes.x = 0;
        this.randomYes.y = 0;
        this.addChild(this.randomYes, 1);
 
        this.doRamdom();
    },

    popup: function() {
        this._super();
        this.random_cout = 0;
        this.removeChild(this.note);
        this.removeChild(this.randomYes);
        this.schedule(this.doRamdom, 0.5, this.random_count_max - 1);
    },

    doRamdom: function() {
        this.steps = 0;  // 玩家走的步数
        var number = Math.floor(Math.random() * 6);
        if (number < 3) {
            this.steps = 1;
        } else if (number < 5) {
            this.steps = 2;
        } else {
            this.steps = 3;
        }

        var size = cc.winSize;
        if (this.randomSprite) {
            this.removeChild(this.randomSprite);
        }
        this.randomSprite = new cc.Sprite(this.box_pngs[number]);
        this.randomSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: scale
        });
        this.addChild(this.randomSprite, 1);
        this.random_cout += 1;

        if(this.random_cout == this.random_count_max) {
            this.note = new cc.Sprite(this.note_pngs[number]);
            this.note.attr({
                x: size.width / 2,
                y: size.height * 3 / 4,
                scale: scale
            });
            this.addChild(this.note, 1);

            // 摇骰子结束，显示确定按钮，并通知玩家
            this.addChild(this.randomYes, 1);
            cc.log("doRamdom: " + this.steps);

        }
    },

    _onOK: function() {
        this.hidden();
        main_layer = this.parent.getChildByTag(LAYER_TAG_MAIN);
        var event = new cc.EventCustom("move_event");
        event.setUserData(this.steps);
        cc.eventManager.dispatchEvent(event);
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new MainLayer(), 0, LAYER_TAG_MAIN);
        this.addChild(new GetCardLayer(), 0, LAYER_TAG_GET_CARD);
        this.addChild(new UseCardLayer(), 0, LAYER_TAG_USE_CARD);
        this.addChild(new RandomLayer(), 0, LAYER_TAG_RANDOM);
    }
});
