var CardType = {
    STOP_LINE: 1,
    DIDI: 2,
    DOUBE: 3,
    STOP_PLAYER: 4,
    CLEAN_PLAYER: 5
};

var StopLineCard = cc.Class.extend({
    // 使某一线路停止
    type: CardType.STOP_LINE,
    pic: "res/card/card_bg.png",

    ctor: function(line) {
        this.line = line;
        this.pic = "res/card/stop_" + this.line + ".png";
    }
});

var DiDiCard = cc.Class.extend({
    // 走三步
    type: CardType.DIDI,
    pic: "res/card/didi.png"

});

var DoubleCard = cc.Class.extend({
    // 双倍卡
    type: CardType.DOUBE,
    pic: "res/card/double.png"
});

var StopPlayerCard = cc.Class.extend({
    type: CardType.STOP_PLAYER,
    pic: "res/card/stop_p.png"
});

var CleanPlayerCard = cc.Class.extend({
    // 扫除雾霾
    type: CardType.CLEAN_PLAYER,
    pic: "res/card/clean.png"
});

var Buff = cc.Class.extend({
    ctor: function(player, card) {
        this.target = player;
        this.card = card;

        var size = cc.winSize;
        this.sprite = new cc.Sprite(card.pic);
        this.sprite.attr({
            x: (player.buffPos.x - 50)* scale,
            y: size.height - (player.buffPos.y + 180) * scale,
            scale: 0.1
        });
    }
});
