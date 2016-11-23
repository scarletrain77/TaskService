var Monster = (function (_super) {
    __extends(Monster, _super);
    // private _body:egret.Shape;
    function Monster() {
        _super.call(this);
        this._type = "normal";
        Monster._id++;
    }
    var d = __define,c=Monster,p=c.prototype;
    Monster._id = 0;
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster');
var Monsters = (function (_super) {
    __extends(Monsters, _super);
    function Monsters(monsters, taskNumberString) {
        _super.call(this);
        this._monsters = new Array();
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
    var d = __define,c=Monsters,p=c.prototype;
    p.addMonster = function (monster) {
        this._monsters.push(monster);
        this._number++;
    };
    d(p, "number"
        ,function () {
            return this._number;
        }
    );
    p.onClickAdd = function () {
        this._number++;
        console.log(this.number);
        if (TaskService.getInstance().taskList[this._taskNumberString].status == TaskStatus.DURING) {
        }
    };
    p.onClickSub = function () {
        if (this._number > 0) {
            this._number--;
        }
        console.log(this.number);
    };
    return Monsters;
}(egret.DisplayObjectContainer));
egret.registerClass(Monsters,'Monsters');
//# sourceMappingURL=Monster.js.map