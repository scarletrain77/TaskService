var Task = (function () {
    function Task(id, name, desc, fromNpcId, toNpcId, condition) {
        this._current = 0;
        this.total = -1;
        this._id = id;
        this._name = name;
        this._status = TaskStatus.ACCEPTABLE;
        this._desc = desc;
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
        this.condition = condition;
    }
    var d = __define,c=Task,p=c.prototype;
    p.checkStatus = function () {
        /* if(this.current > this.total){
             console.warn();
         }*/
        if (this._status == TaskStatus.DURING
            && this._current >= this.total) {
            this._status = TaskStatus.CAN_SUBMIT;
        }
        //notify
        TaskService.getInstance().notify(this);
    };
    p.onAccept = function () {
        this.condition.onAccept(this);
    };
    p.getCurrent = function () {
        return this._current;
    };
    p.setCurrent = function (value) {
        this._current = value;
        this.checkStatus();
    };
    d(p, "current"
        ,function () {
            return this._current;
        }
        ,function (value) {
            this._current = value;
            this.checkStatus();
        }
    );
    d(p, "id"
        ,function () {
            return this._id;
        }
    );
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "fromNpcId"
        ,function () {
            return this._fromNpcId;
        }
    );
    d(p, "toNpcId"
        ,function () {
            return this._toNpcId;
        }
    );
    d(p, "status"
        ,function () {
            return this._status;
        }
        ,function (value) {
            this._status = value;
        }
    );
    d(p, "desc"
        ,function () {
            return this._desc;
        }
        ,function (d) {
            this._desc = d;
        }
    );
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
/*
interface Object{
    assign(a:any, b:any);
}

interface Strategy{
    selector:Function;
}*/
var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        var current = 0;
        current++;
        task.setCurrent(current);
        //console.log("here");
        //   context.checkStatus();
    };
    /*onAccept(task:Task){
        task.current++;
        task.current = task.total;
    }*/
    p.onSubmit = function (task) {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskCondition"]);
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setCurrent(task.getCurrent());
    };
    p.onSubmit = function (task) {
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskCondition"]);
var MockKillMonsterBotton = (function (_super) {
    __extends(MockKillMonsterBotton, _super);
    function MockKillMonsterBotton() {
        _super.call(this);
        this.subButton = new Button(50, 100, "Sub");
        this.subButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.subButton.touchEnabled = true;
        this.addChild(this.subButton);
    }
    var d = __define,c=MockKillMonsterBotton,p=c.prototype;
    p.onClick = function () {
        if (TaskService.getInstance().taskList["000"].status == TaskStatus.DURING && TaskService.getInstance().taskList["000"].total >= 0) {
            TaskService.getInstance().taskList["000"].total--;
        }
        if (TaskService.getInstance().taskList["000"].total == 0) {
            TaskService.getInstance().taskList["000"].status = TaskStatus.CAN_SUBMIT;
        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    };
    p.onChange = function () {
    };
    return MockKillMonsterBotton;
}(egret.DisplayObjectContainer));
egret.registerClass(MockKillMonsterBotton,'MockKillMonsterBotton',["Observer"]);
//# sourceMappingURL=Task.js.map