var scale = 0.8;

window.onload = function(){
    cc.game.onStart = function(){
        cc.view.setDesignResolutionSize(1152, 688, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);

        cc.LoaderScene.preload([], function () {
            cc.director.runScene(new StartScene());
            // cc.director.runScene(new MainScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};
