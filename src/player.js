var Player = cc.Class.extend({
    passedSite_png: res.SitePass_png,
    stoppedSite_png: res.SiteStop_png,
    pos: null,  // 当前所在站点
    passedSite: [],  // 已经过的站点列表
    cards: [],  // 拥有的卡牌列表

    init: function() {
        // 在10号线上随机玩家的位置
        var line = 10;
        var n = Math.ceil(Math.random() * lines[line].length);
        // var n = 34;
        this.pos = lines[line][n];
    }
});
