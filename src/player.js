var Player = cc.Class.extend({
    passedSite_png: res.SitePass_png,
    stoppedSite_png: null,
    pos: null,  // 当前所在站点
    passedSite: [],  // 已经过的站点列表
    cards: [],  // 拥有的卡牌列表

    buff: null,  // 卡牌效果
    buffPos: null, // 卡牌效果的显示位置

    init: function(actionHeadPng, disableHeadPng, pos) {
        this.stoppedSite_png = actionHeadPng;
        this.buffPos = pos;

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
    },

    addCard: function(card) {
        this.cards.push(card);
    },
    useCard: function() {
        if (this.cards.length == 0)
            return null;

        var n = Math.floor(Math.random() * this.cards.length);
        var card = this.cards[n];
        this.cards.splice(n, n);
        return card;
    },

    addBuff: function(card) {
        this.buff = new Buff(this, card);
        return this.buff;
    },
    getBuff: function() {
        return this.buff;
    },
    cleanBuff: function() {
        var buff = this.buff;
        this.buff = null;
        return buff;
    }
});
