class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    private _body:egret.Shape;
    private _taskText:egret.TextField;
    private _statusText:egret.TextField;

    constructor(x: number, y:number){
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
        this._statusText.x = panelWidth/2;
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

class DialogPanel extends egret.DisplayObjectContainer{
    private _button:egret.Shape;
    private _buttonText:egret.TextField;
    private _body:egret.Shape;

    constructor(){
        super();
    }
}
