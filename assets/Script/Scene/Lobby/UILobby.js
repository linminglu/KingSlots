cc.Class({
    extends: cc.Component,

    properties: {
        popupSetting: cc.Prefab,
        popupIngame: cc.Prefab,
        popupUserinfo: cc.Prefab,
        userName: cc.Label ,
        userAvatar: cc.Button ,
        userGold: cc.Label,
        timeTotal: 0
    },

    onLoad: function () {
        this.setUserInfo();
    },

    openPopup: function () {

        var scene = cc.director.getScene();
        if(cc.isValid(scene) && !cc.isValid(scene.getChildByName(Config.name.COMMON_POPUP))){
            cc.loader.loadRes("prefabs/" + Config.name.COMMON_POPUP,function(error, prefab) {
                if(!error){
                    var messagebox = cc.instantiate(prefab);
                    if(cc.isValid(messagebox)){
                        messagebox.x = Common.width / 2;
                        messagebox.y = Common.height / 2;

                        var component = messagebox.getComponent(Config.name.COMMON_POPUP);
                        component.init(res.getMessage(), 0, function() {
                            cc.log("on callback");
                        });
                        component.appear(Config.name.COMMON_POPUP);
                        scene.addChild(messagebox,Config.index.POPUP);
                    }
                }
            })
        }
    },
    openChargePopup: function () {
        var tabString = ["Viettel", "Mobifone", "VinaPhone"];
        var nodeChild = new cc.Node();
        nodeChild.parent = this.node;
        var item = cc.instantiate(this.popupIngame);

        item.getComponent('PopupIngameItem').init(tabString, "charge");
        item.setPositionX(0);
        item.setPositionY(0);
        nodeChild.addChild(item);

        // var item = cc.instantiate(this.popupIngame);
        // item.setPosition(cc.p(0,0));
        // item.zIndex = 1000;
        // this.node.addChild(item);
    },
    openUserInfoPopup: function () {

        var tabString = ["Hồ sơ", "Lịch sử", "Xác thực tài khoản"];
        var nodeChild = new cc.Node();
        nodeChild.parent = this.node;
        var item = cc.instantiate(this.popupUserinfo);

        item.getComponent('PopupFull').init(tabString, "userinfo", this);
        item.getComponent('Popup').appear();
        nodeChild.addChild(item);

    },
    setUserInfo: function() {
        this.userName.string = Common.getUserName();
        this.userGold.string = Common.getCash();
    },
    update: function(dt) {
        this.timeTotal = this.timeTotal + dt;
        if(this.timeTotal >= 0.5) {
            this.timeTotal = 0;
            this.setUserInfo();
        }
    }
});