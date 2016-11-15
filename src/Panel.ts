class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    private _body: egret.Shape;
    private _taskText: egret.TextField;
    private _statusText: egret.TextField;

    constructor(x: number, y: number) {
        super();

        var panelWidth = 300;
        var panelHeight = 300;

        this.x = x;
        this.y = y;
        this._body = new egret.Shape();
        this._body.graphics.beginFill(0x0000, 0);
        this._body.graphics.drawRect(0, 0, panelWidth, panelHeight);
        this._body.graphics.endFill();

        this._taskText = new egret.TextField();
        this._taskText.text = "Task";
        this._taskText.x = 0;
        this._taskText.y = 0;

        this._statusText = new egret.TextField();
        this._statusText.text = "Status";
        this._statusText.x = panelWidth / 2;
        this._statusText.y = 0;

        this.addChild(this._body);
        this.addChild(this._taskText);
        this.addChild(this._statusText);
    }

    onChange(task: Task) {
        this._taskText.text = task.desc;
        this._statusText.text = task.status.toString();
        console.log("Panel onChange" + task.name + task.status.toString());
    }
}

class DialogPanel extends egret.DisplayObjectContainer {
    private _button: egret.Shape;
    private _buttonText: egret.TextField;
    private _body: egret.Shape;

    constructor(x: number, y: number) {
        super();

        this.x = x;
        this.y = y;

        var widthRec = 200;
        var heightRec = 200;

        this._body = new egret.Shape();
        this._body.graphics.beginFill(0x000000, 0);
        this._body.graphics.drawRect(0, 0, widthRec, heightRec);
        this._body.graphics.endFill();

        this._button = new egret.Shape();
        this._button.graphics.beginFill(0x66ccff, 0);
        this._button.graphics.drawRoundRect(widthRec / 2, heightRec, widthRec / 4, heightRec / 4, 20, 20);
        this._button.graphics.endFill();

        this._buttonText = new egret.TextField();
        this._buttonText.text = "Press";
        this._buttonText.x = widthRec / 2;
        this._buttonText.y = heightRec / 3;

        this.addChild(this._body);
        this.addChild(this._button);
        this.addChild(this._buttonText);

        this._button.touchEnabled = true;
        this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public panelFadeIn(): void {
        var tw: egret.Tween = egret.Tween.get(this._button);
        tw.to({ "alpha": 1 }, 500);
        tw = egret.Tween.get(this._body);
        tw.to({ "alpha": 1 }, 500);
        tw = egret.Tween.get(this._buttonText);
        tw.to({ "alpha": 1 }, 500);
    }

    public panelFadeOut(): void {
        var tw: egret.Tween = egret.Tween.get(this._button);
        tw.to({ "alpha": 0 }, 500);
        tw = egret.Tween.get(this._body);
        tw.to({ "alpha": 0 }, 500);
        tw = egret.Tween.get(this._buttonText);
        tw.to({ "alpha": 0 }, 500);
    }

    private onClick(): void {
        this.panelFadeOut();
        if (TaskService.getInstance().taskList["000"].status == TaskStatus.ACCEPTABLE) {
            TaskService.getInstance().accept("000");
        } else if (TaskService.getInstance().taskList["000"].status == TaskStatus.CAN_SUBMIT) {
            TaskService.getInstance().finish("000");
        } else {
            console.log("no taskStatus");
        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    }
}
