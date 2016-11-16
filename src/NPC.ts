class NPC extends egret.DisplayObjectContainer implements Observer {
    private _id: string;
    //private _taskService: TaskService;
    private _body: egret.Bitmap;
    private _isEmojiQM: boolean;
    private _emoji: egret.Bitmap;
    private _dialog: DialogPanel;

    /*constructor(s: TaskService) {
        this.taskService = s;
    }*/
    constructor(id: string, bitmap: string, x: number, y: number, dialog: DialogPanel) {
        super();
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
        this._dialog.x = - this._body.width/8;
        this._dialog.y = - this._body.height*3/4;
        console.log("id:" + this._id + "x:" + this._dialog.x + "y:" +  this._dialog.y);

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

    onChange(task: Task) {
        console.log('NPC on Change' + task.name);
        if (task.status == TaskStatus.ACCEPTABLE && this._id == task.fromNpcId) {
            this.emojiFadeIn();
        } else if (task.status == TaskStatus.CAN_SUBMIT && this._id == task.fromNpcId) {
            this.emojiFadeOut();
        } else if (task.status == TaskStatus.CAN_SUBMIT && this._id == task.toNpcId) {
            this._isEmojiQM = true;
            this.setEmojiTexture();
            this.emojiFadeIn();
        } else if (task.status == TaskStatus.SUBMITTED && this._id == task.toNpcId) {
            this.emojiFadeOut();
        }
    }

    init() {

        //var service = new TaskService();
        let rule = (taskList) => {
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
        }

        var service = TaskService.getInstance();
        service.getTaskByCustomRule(rule);
        //this.taskService.getTaskByCustomRole(rule);

    }

    private emojiFadeIn():void{
        var tw:egret.Tween = egret.Tween.get(this._emoji);
        if(this._emoji.alpha == 0){
            tw.to({"alpha":1}, 500);
        }
    }

    private emojiFadeOut():void{
        var tw:egret.Tween = egret.Tween.get(this._emoji);
        if(this._emoji.alpha == 1){
            tw.to({"alpha":0}, 500);
        }
    }

    private setEmojiTexture(): void {
        if (this._isEmojiQM == true) {
            this._emoji.texture = RES.getRes("questionMark_png");
        } else {
            this._emoji.texture = RES.getRes("exclamationPoint_png");
        }
    }

    private onClick() {
        this._dialog.panelFadeIn();
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    }
}


