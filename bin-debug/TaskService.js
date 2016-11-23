var EventEmitter = (function () {
    function EventEmitter() {
    }
    var d = __define,c=EventEmitter,p=c.prototype;
    p.addObserver = function (observer) { };
    p.notify = function (task) { };
    return EventEmitter;
}());
egret.registerClass(EventEmitter,'EventEmitter');
var SceneService = (function (_super) {
    __extends(SceneService, _super);
    function SceneService() {
        _super.call(this);
        this.observerList = [];
        this.taskList = {};
        SceneService.count++;
        if (SceneService.count > 1) {
            throw "singleton";
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    p.notify = function (task) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
    };
    SceneService.count = 0;
    return SceneService;
}(EventEmitter));
egret.registerClass(SceneService,'SceneService');
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        _super.call(this);
        this.observerList = [];
        this.taskList = {};
        this._currentTask = 0;
        TaskService.count++;
        if (TaskService.count > 1) {
            throw "singleton";
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addObserver = function (a) {
        this.observerList.push(a);
    };
    p.notify = function (task) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
    };
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
    p.getCurrentId = function () {
        return "00" + this._currentTask.toString();
    };
    p.getNextId = function () {
        var temp = this._currentTask + 1;
        return "00" + temp.toString();
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
        console.log("submit" + id);
        if (task.status == TaskStatus.CAN_SUBMIT) {
            task.status = TaskStatus.SUBMITTED;
            task.onAccept();
            this.notify(task);
            this._currentTask++;
            return ErrorCode.SUCCESS;
        }
        else {
            return ErrorCode.ERROR_TASK;
        }
    };
    p.accept = function (id) {
        var temp = this.taskList[id];
        if (temp.status == TaskStatus.ACCEPTABLE) {
            temp.status = TaskStatus.DURING;
        }
        this.notify(temp);
        /*if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        let task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("accept" + id);
        if (task.status == TaskStatus.CAN_SUBMIT) {
            task.status = TaskStatus.SUBMITTED;
            this.notify(task);
            return ErrorCode.SUCCESS;
        } else {
            return ErrorCode.ERROR_TASK;
        }*/
    };
    p.addTask = function (task) {
        // var a = this.taskList["111"];
        this.taskList[task.id] = task;
    };
    TaskService.count = 0;
    return TaskService;
}(EventEmitter));
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map