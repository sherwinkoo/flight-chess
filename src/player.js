var Player = cc.Class.extend({
    passedSite_png: res.SitePass_png,
    stoppedSite_png: null,
    pos: null,  // 当前所在站点
    passedSite: [],  // 已经过的站点列表
    cards: null,  // 拥有的卡牌列表

    buff: null,  // 卡牌效果
    buffPos: null, // 卡牌效果的显示位置

    ctor: function(playerid, actionHeadPng, disableHeadPng, pos) {
        this.playerid = playerid;
        this.stoppedSite_png = actionHeadPng;
        this.buffPos = pos;
        this.cards = [];
        this.buff = [];

        // 在10号线上随机玩家的位置
        var line = 10;
        var n = Math.floor(Math.random() * lines[line].length);
        // var n = 34;
        this.pos = lines[line][n];

        var size = cc.winSize;
        this.posSprite = new cc.Sprite(this.stoppedSite_png)
        this.posSprite.attr({
            x: this.pos.pos.x * scale,
            y: size.height - this.pos.pos.y * scale,
            scale: 0.3,
        });

        // 卡牌数
        this.cardNumberSprite = new cc.LabelTTF(
            this.cards.length.toString(),
            'Times New Roman', 20, cc.size(64 * 32), cc.TEXT_ALIGNMENT_CENTER);
        this.cardNumberSprite.attr({
            x: (pos.x + 47) * scale,
            y: size.height - (pos.y - 47) * scale
        });

        // 行动时的资源
        this.actionHeadSprite = new cc.Sprite(actionHeadPng);
        this.actionHeadSprite.attr({
            x: (pos.x - 70) * scale,
            y: size.height - (pos.y - 125) * scale,
            scale: scale
        });
       
        // 禁止时的资源
        this.disableHeadSprite = new cc.Sprite(disableHeadPng);
        this.disableHeadSprite.attr({
            x: (pos.x - 70) * scale,
            y: size.height - (pos.y - 125) * scale,
            scale: scale
        });

        // 胜利
        this.winSprite = new cc.Sprite("res/over/winner_" + playerid + ".png");
        this.winSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: scale
        });
    },

    addCard: function(card) {
        cc.log(this);
        this.cards.push(card);
        this._updateCardNumber();
    },
    getCard: function() {
        if (this.cards.length == 0)
            return null;

        var n = Math.floor(Math.random() * this.cards.length);
        return this.cards[n];
    },
    removeCard: function(card) {
        var i = 0;
        for (i = 0; i < this.cards.length; i++) {
            if (card == this.cards[i]) {
                this.cards.splice(i, i + 1);
                break;
            }
        }
        this._updateCardNumber();
    },
    _updateCardNumber: function() {
        this.cardNumberSprite.setString(this.cards.length.toString());
    },

    addBuff: function(card) {
        var n = this.buff.length;
        var buff = new Buff(this, card, n);
        this.buff.push(buff);
        return buff;
    },
    getBuff: function() {
        return this.buff;
    },
    cleanBuff: function() {
        var buff = this.buff;
        this.buff = [];
        return buff;
    }
});
