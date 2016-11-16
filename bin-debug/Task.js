var Task = (function () {
    function Task(id, name, desc, fromNpcId, toNpcId) {
        this._id = id;
        this._name = name;
        this._status = TaskStatus.ACCEPTABLE;
        this._desc = desc;
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
    }
    var d = __define,c=Task,p=c.prototype;
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
egret.registerClass(Task,'Task');
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
    p.finish = function (id) {
        if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("finish" + id);
        if (task.status == TaskStatus.CAN_SUBMIT) {
            task.status = TaskStatus.SUBMITTED;
            this.notify(task);
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
//# sourceMappingURL=Task.js.map