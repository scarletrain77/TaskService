var Button = (function (_super) {
    __extends(Button, _super);
    function Button(x, y, name) {
        _super.call(this);
        this.x = x;
        this.y = y;
        var widthRec = 300;
        var heightRec = 200;
        this._body = new egret.Shape();
        this._body.graphics.beginFill(0x66ccff, 1);
        this._body.graphics.drawRoundRect(widthRec / 4, heightRec * 3 / 4, widthRec / 2, heightRec / 4, 20, 20);
        this._body.graphics.endFill();
        this._name = new egret.TextField();
        this._name.text = name;
        this._name.textColor = 0x000000;
        this._name.x = widthRec / 4 + 35;
        this._name.y = heightRec * 3 / 4 + 10;
        this.addChild(this._body);
        this.addChild(this._name);
        this.touchEnabled = true;
    }
    var d = __define,c=Button,p=c.prototype;
    return Button;
}(egret.DisplayObjectContainer));
egret.registerClass(Button,'Button');
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(x, y) {
        _super.call(this);
        this._blankHeight = 30;
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
        this._taskListText = new egret.TextField();
        this._taskListText.text = "";
        this._taskListText.textColor = 0x0000;
        this._taskListText.x = this._taskText.x;
        this._taskListText.y = this._taskText.y + this._blankHeight;
        this._taskListText1 = new egret.TextField();
        this._taskListText1.text = "";
        this._taskListText1.textColor = 0x0000;
        this._taskListText1.x = this._taskListText.x;
        this._taskListText1.y = this._taskListText.y + this._blankHeight;
        this._statusText = new egret.TextField();
        this._statusText.text = "Status";
        this._statusText.textColor = 0x000000;
        this._statusText.x = panelWidth * 3 / 4;
        this._statusText.y = 0;
        this._statusListText = new egret.TextField();
        this._statusListText.text = "";
        this._statusListText.textColor = 0x0000;
        this._statusListText.x = this._statusText.x;
        this._statusListText.y = this._statusText.y + this._blankHeight;
        this.addChild(this._body);
        this.addChild(this._taskText);
        this.addChild(this._statusText);
        this.addChild(this._taskListText);
        this.addChild(this._taskListText1);
        this.addChild(this._statusListText);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        //this.setTaskList(1, task.desc);
        this._taskListText.text = task.desc;
        this._statusListText.text = task.status.toString();
        console.log("Panel onChange" + task.name + task.status.toString());
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var DialogPanel = (function (_super) {
    __extends(DialogPanel, _super);
    function DialogPanel(taskString) {
        _super.call(this);
        var widthRec = 300;
        var heightRec = 200;
        this._body = new egret.Shape();
        this._body.graphics.beginFill(0xFFF4C1, 1);
        this._body.graphics.drawRect(0, 0, widthRec, heightRec);
        this._body.graphics.endFill();
        this._button = new egret.Shape();
        this._button.graphics.beginFill(0x66ccff, 1);
        this._button.graphics.drawRoundRect(widthRec / 4, heightRec * 3 / 4, widthRec / 2, heightRec / 4, 20, 20);
        this._button.graphics.endFill();
        this._buttonText = new egret.TextField();
        this._buttonText.text = "Press";
        this._buttonText.textColor = 0x000000;
        this._buttonText.x = widthRec / 4 + 35;
        this._buttonText.y = heightRec * 3 / 4 + 10;
        this._taskText = new egret.TextField();
        this._taskText.text = taskString;
        this._taskText.textColor = 0x000000;
        this._taskText.x = 0;
        this._taskText.y = 0;
        this.alpha = 0;
        this.addChild(this._body);
        this.addChild(this._button);
        this.addChild(this._buttonText);
        this.addChild(this._taskText);
        this._button.touchEnabled = true;
        this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    var d = __define,c=DialogPanel,p=c.prototype;
    p.panelFadeIn = function () {
        var tw = egret.Tween.get(this);
        tw.to({ "alpha": 1 }, 500);
    };
    p.panelFadeOut = function () {
        var tw = egret.Tween.get(this);
        tw.to({ "alpha": 0 }, 500);
    };
    p.onClick = function () {
        this.panelFadeOut();
        if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.ACCEPTABLE) {
            TaskService.getInstance().accept(TaskService.getInstance().getCurrentId());
        }
        else if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.CAN_SUBMIT) {
            TaskService.getInstance().submit(TaskService.getInstance().getCurrentId());
        }
        else {
            console.log("no taskStatus");
        }
        this.panelFadeOut();
        TaskService.getInstance().notify(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()]);
    };
    return DialogPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialogPanel,'DialogPanel');
//# sourceMappingURL=Panel.js.map