class Monster extends egret.DisplayObjectContainer {
    private static _id: number = 0;
    private _type: string;
    // private _body:egret.Shape;
    constructor() {
        super();

        this._type = "normal";

        Monster._id++;
    }
}

class Monsters extends egret.DisplayObjectContainer{
    private _monsters: Array<Monster>;
    private _number: number;
    private addButton: Button;
    private subButton: Button;
    private _taskNumberString: string;

    constructor(monsters: Monster[], taskNumberString: string) {
        super();
        this._monsters = new Array<Monster>();

        this._monsters = monsters;

        this._number = 0;
        this._taskNumberString = taskNumberString;

        this.addButton = new Button(50, 100, "add");
        this.subButton = new Button(50, 200, "sub");
        this.addButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
        this.subButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSub, this);
        this.addChild(this.addButton);
        this.addChild(this.subButton);
    }

    private addMonster(monster: Monster) {
        this._monsters.push(monster);
        this._number++;
    }

    private get number() {
        return this._number;
    }

    private onClickAdd(): void {
        this._number++;
        console.log(this.number);
        if(TaskService.getInstance().taskList[this._taskNumberString].status == TaskStatus.DURING){

        }
    }

    private onClickSub(): void {
        if (this._number > 0) {
            this._number--;
        }
        console.log(this.number);
    }
}