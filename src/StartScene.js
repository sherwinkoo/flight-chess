var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        // 添加背景图
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: scale
        });
        this.addChild(this.bgSprite, 0);

        // 添加开始菜单
        var startItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function () {
                cc.log("Menu is clicked!");
                // cc.director.replaceScene( cc.TransitionPageTurn(1, new MainScene(), false) );
                // cc.director.replaceScene(new MainScene());
                cc.director.runScene(new MainScene());
            }, this);
        startItem.attr({
            x: size.width/2,
            y: size.height/5,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });

        // 设置按钮
        var settingItem = new cc.MenuItemImage(
            res.Setting_N_png,
            res.Setting_S_png,
            function () {
                cc.log("Setting is clicked!");
            }, this);
        settingItem.attr({
            x: 177 * scale,
            y: size.height / 5,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });

        // 排名按钮
        var rankItem = new cc.MenuItemImage(
            res.Rank_N_png,
            res.Rank_S_png,
            function () {
                cc.log("Rank is clicked!");
            }, this);
        rankItem.attr({
            x: 300 * scale,
            y: size.height/5,
            scale: scale,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu([startItem, settingItem, rankItem]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1); 
        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});
