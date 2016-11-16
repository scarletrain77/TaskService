class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    private _body: egret.Shape;
    private _taskText: egret.TextField;
    private _taskListText : egret.TextField;
    private _statusText: egret.TextField;
    private _statusListText:egret.TextField;

    constructor(x: number, y: number) {
        super();

        var panelWidth = 600;
        var panelHeight = panelWidth/2;
        var blankHeight = 30;

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
        this._taskListText.y = this._taskText.y + blankHeight;

        this._statusText = new egret.TextField();
        this._statusText.text = "Status";
        this._statusText.textColor = 0x000000;
        this._statusText.x = panelWidth*3/4;
        this._statusText.y = 0;

        this._statusListText = new egret.TextField();
        this._statusListText.text = "";
        this._statusListText.textColor = 0x0000;
        this._statusListText.x = this._statusText.x;
        this._statusListText.y = this._statusText.y + blankHeight;

        this.addChild(this._body);
        this.addChild(this._taskText);
        this.addChild(this._statusText);
        this.addChild(this._taskListText);
        this.addChild(this._statusListText);
    }

    onChange(task: Task) {
        this._taskListText.text = task.desc;
        this._statusListText.text = task.status.toString();
        console.log("Panel onChange" + task.name + task.status.toString());
    }
}

class DialogPanel extends egret.DisplayObjectContainer {
    private _button: egret.Shape;
    private _buttonText: egret.TextField;
    private _body: egret.Shape;
    private _taskText:egret.TextField;

    constructor(taskString:string) {
        super();

        var widthRec = 300;
        var heightRec = 200;

        this._body = new egret.Shape();
        this._body.graphics.beginFill(0xFFF4C1, 1);
        this._body.graphics.drawRect(0, 0, widthRec, heightRec);
        this._body.graphics.endFill();

        this._button = new egret.Shape();
        this._button.graphics.beginFill(0x66ccff, 1);
        this._button.graphics.drawRoundRect(widthRec/4, heightRec*3/4, widthRec / 2, heightRec / 4, 20, 20);
        this._button.graphics.endFill();

        this._buttonText = new egret.TextField();
        this._buttonText.text = "Press";
        this._buttonText.textColor = 0x000000;
        this._buttonText.x =widthRec/4 + 35;
        this._buttonText.y = heightRec*3/4+10;

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

    public panelFadeIn(): void {
        var tw: egret.Tween = egret.Tween.get(this);
        tw.to({ "alpha": 1 }, 500);
    }

    public panelFadeOut(): void {
        var tw: egret.Tween = egret.Tween.get(this);
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
        this.panelFadeOut();
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    }
}
