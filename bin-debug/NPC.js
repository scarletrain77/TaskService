var NPC = (function (_super) {
    __extends(NPC, _super);
    /*constructor(s: TaskService) {
        this.taskService = s;
    }*/
    function NPC(id, bitmap, x, y, dialog) {
        _super.call(this);
        this._id = id;
        this.x = x;
        this.y = y;
        this._body = new egret.Bitmap();
        this._body.texture = RES.getRes(bitmap);
        this._body.x = 0;
        this._body.y = 0;
        this._body.width = 300;
        this._body.height = 300;
        this._dialog = dialog;
        this._dialog.x = -this._body.width / 8;
        this._dialog.y = -this._body.height * 3 / 4;
        console.log("id:" + this._id + "x:" + this._dialog.x + "y:" + this._dialog.y);
        this._isEmojiQM = false;
        this._emoji = new egret.Bitmap();
        this.setEmojiTexture();
        this._emoji.x = this._body.x;
        this._emoji.y = this._body.y - this._emoji.height;
        this._emoji.alpha = 1;
        this.addChild(this._body);
        this.addChild(this._emoji);
        this.addChild(this._dialog);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onChange = function (task) {
        console.log('NPC on Change' + task.name);
        if (task.status == TaskStatus.ACCEPTABLE && this._id == task.fromNpcId) {
            this.emojiFadeIn();
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && this._id == task.fromNpcId) {
            this.emojiFadeOut();
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && this._id == task.toNpcId) {
            this._isEmojiQM = true;
            this.setEmojiTexture();
            this.emojiFadeIn();
        }
        else if (task.status == TaskStatus.SUBMITTED && this._id == task.toNpcId) {
            this.emojiFadeOut();
        }
    };
    p.init = function () {
        //var service = new TaskService();
        var rule = function (taskList) {
            for (var id in taskList) {
                var task = taskList[id];
                if (task.status == TaskStatus.CAN_SUBMIT) {
                    return task;
                }
            }
            for (var id in taskList) {
                var task = taskList[id];
                if (task.status == TaskStatus.ACCEPTABLE) {
                    return task;
                }
            }
        };
        var service = TaskService.getInstance();
        service.getTaskByCustomRule(rule);
        //this.taskService.getTaskByCustomRole(rule);
    };
    p.emojiFadeIn = function () {
        var tw = egret.Tween.get(this._emoji);
        if (this._emoji.alpha == 0) {
            tw.to({ "alpha": 1 }, 500);
        }
    };
    p.emojiFadeOut = function () {
        var tw = egret.Tween.get(this._emoji);
        if (this._emoji.alpha == 1) {
            tw.to({ "alpha": 0 }, 500);
        }
    };
    p.setEmojiTexture = function () {
        if (this._isEmojiQM == true) {
            this._emoji.texture = RES.getRes("questionMark_png");
        }
        else {
            this._emoji.texture = RES.getRes("exclamationPoint_png");
        }
    };
    p.onClick = function () {
        this._dialog.panelFadeIn();
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map