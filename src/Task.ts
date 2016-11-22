class Task implements TaskConditionContext {
    private _id: string;
    private _name: string;
    private _status: TaskStatus;
    private _desc: string;
    private _fromNpcId: string;
    private _toNpcId: string;
    private _current: number = 0;

    public total: number = -1;
    public condition: TaskCondition;

    constructor(id: string, name: string, desc: string, fromNpcId: string, toNpcId: string, condition: TaskCondition) {
        this._id = id;
        this._name = name;
        this._status = TaskStatus.ACCEPTABLE;
        this._desc = desc;
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;

        this.condition = condition;
        
    }

    public get current():number{
        return this._current;
    }

    public set current(value:number){
        this._current = value;
        this.checkStatus();
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

    public get desc(): string {
        return this._desc;
    }

    public set status(value: TaskStatus) {
        this._status = value;
    }

    checkStatus() {
       /* if(this.current > this.total){
            console.warn();
        }*/
        if (this._status == TaskStatus.DURING
            && this._current >= this.total) {
                this._status = TaskStatus.CAN_SUBMIT;
        }
        //notify
        TaskService.getInstance().notify(this);
    }

    public set desc(d: string) {
        this._desc = d;
    }

    public onAccept() {
        this.condition.onAccept(this);
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
        /*var canvas:HTMLCanvasElement;
        var context = canvas.getContext("2d");*/
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

    public submit(id: string): ErrorCode {
        if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        let task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("accept" + id);
        if (task.status == TaskStatus.ACCEPTABLE) {
            task.status = TaskStatus.DURING;
            task.onAccept();
            this.notify(task);
            return ErrorCode.SUCCESS;
        } else {
            return ErrorCode.ERROR_TASK;
        }
    }

    public accept(id: string) {
        /*var temp:Task = this.taskList[id];
        if(temp.status == TaskStatus.ACCEPTABLE){
            temp.status = TaskStatus.DURING;
        }
        this.notify(temp);*/
        if (!id) {
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
        }
    }

    public addTask(task: Task) {
        // var a = this.taskList["111"];
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

interface TaskCondition {
    onAccept(task: TaskConditionContext);
    onSubmit(task: TaskConditionContext);
}

interface TaskConditionContext {
    current: number;
    checkStatus():void;
}

class NPCTalkTaskCondition implements TaskCondition {
    onAccept(context: TaskConditionContext) {
        context.current++;
        //console.log("here");
        context.checkStatus();
    }

    /*onAccept(task:Task){
        task.current++;
        task.current = task.total;
    }*/

    onSubmit() {

    }
}