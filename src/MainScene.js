var LAYER_TAG_MAIN = 1001;
var LAYER_TAG_CARD = 1002;
var LAYER_TAG_RANDOM = 1003;

var MainLayer = cc.Layer.extend({

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
            {x: 140, y:215}, res.Player1_N_png, res.Player1_title_png,
            function() {this.onPlayerUserCard(1)},
            function() {this.onPlayerRandom(1)});

        // 右边玩家
        this.buildPlayerPanel(
            {x: 1290, y:215}, res.Player2_N_png, res.Player2_title_png,
            function() {this.onPlayerUserCard(2)},
            function() {this.onPlayerRandom(2)});
        return true;
    },

    buildPlayerPanel: function(pos, head, title, onUseCard, onRandom) {
        var size = cc.winSize;
        var PlayerBg = new cc.Sprite(res.PlayerBg_png);
        PlayerBg.attr({
            x: pos.x * scale,
            y: size.height - pos.y * scale,
            scale: scale
        });
        var PlayerHead = new cc.Sprite(head);
        PlayerHead.attr({
            x: (pos.x - 70) * scale,
            y: size.height - (pos.y - 125) * scale,
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
        this.addChild(PlayerHead, 2);
        this.addChild(PlayerTitle, 2);
        this.addChild(PlayerCardNum, 2)

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

    onPlayerUserCard: function(playerid) {
        cc.log('Player: ' + playerid + ' UserCard');
        layer = this.parent.getChildByTag(LAYER_TAG_CARD);
        layer.popup();
    },
    onPlayerRandom: function(playerid) {
        cc.log('Player: ' + playerid + ' Random');
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

var CardLayer = ModalLayer.extend({
    ctor: function(playerid) {
        this._super();
        this.playerid = playerid;

        this.timer = new cc.Timer(this, function(){
            this.doRamdom();
        }, 0.1, 5);
    }
});

var RandomLayer = ModalLayer.extend({
    random_count_max: 10,
    random_count: 0,
    randomSprite: null,
    randomYes: null,

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
        this.removeChild(this.randomYes);
        this.schedule(this.doRamdom, 0.5, this.random_count_max);
    },

    doRamdom: function() {
        cc.log("doRamdom");

        var size = cc.winSize;
        if (this.randomSprite) {
            this.removeChild(this.randomSprite);
        }
        if (this.random_cout % 2 == 0) {
            this.randomSprite = new cc.Sprite(res.RandomBox1_png);
        } else {
            this.randomSprite = new cc.Sprite(res.RandomBox2_png);
        }
        this.randomSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: scale
        });
        this.addChild(this.randomSprite, 1);
        this.random_cout += 1;

        if(this.random_cout == this.random_count_max) {
            // 摇骰子结束，显示确定按钮，并通知玩家
            this.addChild(this.randomYes, 1);
        }
    },

    _onOK: function() {
        cc.log("onOK");
        this.hidden();
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new MainLayer(), 0, LAYER_TAG_MAIN);
        this.addChild(new CardLayer(), 0, LAYER_TAG_CARD);
        this.addChild(new RandomLayer(), 0, LAYER_TAG_RANDOM);
    }
});
