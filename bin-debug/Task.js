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
var TaskService = (function () {
    function TaskService() {
        this.observerList = [];
        this.taskList = {};
        TaskService.count++;
        if (TaskService.count > 1) {
            throw "singleton";
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    /*public getTaskByCustomStrategy(strategy:Strategy){
        return strategy.selector(this.taskList);
    }*/
    p.getTaskByCustomRule = function (rule) {
        //var clone = Object.assign({}, this.taskList);
        //return rule(clone);
        /*var canvas:HTMLCanvasElement;
        var context = canvas.getContext("2d");*/
        return rule(this.taskList);
    };
    /*public getTaskByCustonRule(rule:Function):Task{
        return
        for(var id in this.taskList){
            var task = this.taskList[id];
            if(task.status == TaskStatus.CAN_SUBMIT){
                return task;
            }
        }
         for(var id in this.taskList){
            var task = this.taskList[id];
            if(task.status == TaskStatus.ACCEPTABLE){
                return task;
            }
        }
    }*/
    p.submit = function (id) {
        if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("accept" + id);
        if (task.status == TaskStatus.ACCEPTABLE) {
            task.status = TaskStatus.DURING;
            task.onAccept();
            this.notify(task);
            return ErrorCode.SUCCESS;
        }
        else {
            return ErrorCode.ERROR_TASK;
        }
    };
    p.accept = function (id) {
        /*var temp:Task = this.taskList[id];
        if(temp.status == TaskStatus.ACCEPTABLE){
            temp.status = TaskStatus.DURING;
        }
        this.notify(temp);*/
        if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("accept" + id);
        if (task.status == TaskStatus.CAN_SUBMIT) {
            task.status = TaskStatus.SUBMITTED;
            this.notify(task);
            return ErrorCode.SUCCESS;
        }
        else {
            return ErrorCode.ERROR_TASK;
        }
    };
    p.addTask = function (task) {
        // var a = this.taskList["111"];
        this.taskList[task.id] = task;
    };
    p.addObserver = function (a) {
        this.observerList.push(a);
    };
    p.notify = function (task) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (context) {
        context.current++;
        //console.log("here");
        context.checkStatus();
    };
    /*onAccept(task:Task){
        task.current++;
        task.current = task.total;
    }*/
    p.onSubmit = function () {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskCondition"]);
//# sourceMappingURL=Task.js.map