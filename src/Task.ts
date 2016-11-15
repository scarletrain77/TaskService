class Task {
    private _id: string;
    private _name: string;
    private _status: TaskStatus;
    public desc: string;
    private _fromNpcId: string;
    private _toNpcId: string;

    constructor(id: string, name: string, fromNpcId: string, toNpcId: string) {
        this._id = id;
        this._name = name;
        this._status = TaskStatus.UNACCEPTABLE;
        this.desc = "";
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get fromNpcId(): string {
        return this._fromNpcId;
    }

    public get toNpcId(): string {
        return this._toNpcId;
    }

    public get status(): TaskStatus {
        return this._status;
    }

    public set status(value: TaskStatus) {
        this._status = value;
    }
}


class TaskPanel implements Observer {
    onChange(task: Task) {
        console.log("Panel onChange" + task.name);
    }
}

/*
interface Object{
    assign(a:any, b:any);
}

interface Strategy{
    selector:Function;
}*/

class TaskService {
    private static instance;
    private static count: number = 0;
    private observerList: Observer[] = [];
    private taskList: {
        [index: string]: Task
    } = {
        //"001":new Task("001", "a", "001", "002"),
        //"002":new Task("002", "b", "003", "004")
    };
    //private taskList:TaskList[] = [];

    constructor() {
        TaskService.count++;
        if (TaskService.count > 1) {
            throw "singleton";
        }
    }

    public static getInstance() {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }

    /*public getTaskByCustomStrategy(strategy:Strategy){
        return strategy.selector(this.taskList);
    }*/
    public getTaskByCustomRule(rule: Function): Task {
        //var clone = Object.assign({}, this.taskList);
        //return rule(clone);
        return rule(this.taskList);
    }

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

    public finish(id: string): ErrorCode {
        if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        let task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("finish" + id);
        if (task.status == TaskStatus.CAN_SUBMIT) {
            task.status = TaskStatus.SUBMITTED;
            this.notify(task);
            return ErrorCode.SUCCESS;
        } else {
            return ErrorCode.ERROR_TASK;
        }
    }

    public accept(id: string): void {
       var temp:Task = this.taskList[id];
       if(temp.status == TaskStatus.ACCEPTABLE){
           temp.status = TaskStatus.DURING;
       }
       this.notify(temp);
    }

    public addTask(task: Task) {
        var a = this.taskList["111"];

        this.taskList[task.id] = task;
    }

    public addObserver(a: Observer) {
        this.observerList.push(a);
    }

    private notify(task: Task) {
        for (var observer of this.observerList) {
            observer.onChange(task);
        }
    }

}

enum TaskStatus {
    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITTED
}