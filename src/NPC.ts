class NPC extends egret.DisplayObjectContainer implements Observer {
    private _id:string;
    //private _taskService: TaskService;
    private _body:egret.Bitmap;
    private _isEmojiQM:boolean;
    private _emoji:egret.Bitmap;
    private _dialog:DialogPanel;

    /*constructor(s: TaskService) {
        this.taskService = s;
    }*/
    constructor(id:string, bitmap:string, x:number, y:number, dialog:DialogPanel){
        super();
        this._id = id;

        this.x = x;
        this.y = y;

        this._dialog = dialog;

        this._body = new egret.Bitmap();
        this._body.texture = RES.getRes(bitmap);
        this._body.x = 0;
        this._body.y = 0;
        this._body.alpha = 0;

        this._isEmojiQM = true;
        this._emoji = new egret.Bitmap();
        this.setEmojiTexture();
        this._emoji.x = this._body.x;
        this._emoji.y = this._body.y-20;
        this._emoji.alpha = 0;

        this.addChild(this._body);
        this.addChild(this._emoji);

        this.touchEnabled = true;
        
    }

    onChange(task: Task) {
        console.log('NPC on Change' + task.name);
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

    private setEmojiTexture(){
        if(this._isEmojiQM == true){
            this._emoji.texture = RES.getRes("questionMark_png");
        }else{
            this._emoji.texture = RES.getRes("exlamationPoint_png");
        }
    }
}


