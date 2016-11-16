var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(x, y) {
        _super.call(this);
        var panelWidth = 600;
        var panelHeight = panelWidth / 2;
        this.x = x;
        this.y = y;
        this._body = new egret.Shape();
        this._body.graphics.beginFill(0xFFFF6F, 1);
        this._body.graphics.drawRect(0, 0, panelWidth, panelHeight);
        this._body.graphics.endFill();
        this._taskText = new egret.TextField();
        this._taskText.text = "Task";
        this._taskText.textColor = 0x000000;
        this._taskText.x = 0;
        this._taskText.y = 0;
        this._statusText = new egret.TextField();
        this._statusText.text = "Status";
        this._statusText.textColor = 0x000000;
        this._statusText.x = panelWidth / 2;
        this._statusText.y = 0;
        this.addChild(this._body);
        this.addChild(this._taskText);
        this.addChild(this._statusText);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        this._taskText.text = task.desc;
        this._statusText.text = task.status.toString();
        console.log("Panel onChange" + task.name + task.status.toString());
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var DialogPanel = (function (_super) {
    __extends(DialogPanel, _super);
    function DialogPanel() {
        _super.call(this);
        var widthRec = 300;
        var heightRec = 200;
        this._body = new egret.Shape();
        this._body.graphics.beginFill(0xFFF4C1, 1);
        this._body.graphics.drawRect(0, 0, widthRec, heightRec);
        this._body.graphics.endFill();
        this._body.alpha = 0;
        this._button = new egret.Shape();
        this._button.graphics.beginFill(0x66ccff, 1);
        this._button.graphics.drawRoundRect(widthRec / 4, heightRec * 3 / 4, widthRec / 2, heightRec / 4, 20, 20);
        this._button.graphics.endFill();
        this._button.alpha = 0;
        this._buttonText = new egret.TextField();
        this._buttonText.text = "Press";
        this._buttonText.textColor = 0x000000;
        this._buttonText.x = widthRec / 4 + 35;
        this._buttonText.y = heightRec * 3 / 4 + 10;
        this._buttonText.alpha = 0;
        this.addChild(this._body);
        this.addChild(this._button);
        this.addChild(this._buttonText);
        this._button.touchEnabled = true;
        this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    var d = __define,c=DialogPanel,p=c.prototype;
    p.panelFadeIn = function () {
        var tw1 = egret.Tween.get(this._button);
        tw1.to({ "alpha": 1 }, 500);
        var tw2 = egret.Tween.get(this._body);
        tw2.to({ "alpha": 1 }, 500);
        var tw3 = egret.Tween.get(this._buttonText);
        tw3.to({ "alpha": 1 }, 500);
    };
    p.panelFadeOut = function () {
        var tw = egret.Tween.get(this._button);
        tw.to({ "alpha": 0 }, 500);
        tw = egret.Tween.get(this._body);
        tw.to({ "alpha": 0 }, 500);
        tw = egret.Tween.get(this._buttonText);
        tw.to({ "alpha": 0 }, 500);
    };
    p.onClick = function () {
        this.panelFadeOut();
        if (TaskService.getInstance().taskList["000"].status == TaskStatus.ACCEPTABLE) {
            TaskService.getInstance().accept("000");
        }
        else if (TaskService.getInstance().taskList["000"].status == TaskStatus.CAN_SUBMIT) {
            TaskService.getInstance().finish("000");
        }
        else {
            console.log("no taskStatus");
        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    };
    return DialogPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialogPanel,'DialogPanel');
//# sourceMappingURL=Panel.js.map