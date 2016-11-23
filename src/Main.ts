class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        var sky: egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var NPC1x = 0;
        var NPC1y = 300;
        var NPC2x = 400;
        var NPC2y = 300;

        //var taskService:TaskService = new TaskService();       

        var task_2: Task = new Task("000", "task2", "press button to kill monsters", "npc_0", "npc_1", new KillMonsterTaskCondition());
        //task_2.status = TaskStatus.UNACCEPTABLE;
        task_2.total = 10;
        TaskService.getInstance().addTask(task_2);

        var task_1: Task = new Task("001", "task1", "press NPC1 to finish task", "npc_0", "npc_1", new NPCTalkTaskCondition());
        task_1.status = TaskStatus.ACCEPTABLE;
        TaskService.getInstance().addTask(task_1);

        var NPC_1: NPC = new NPC("npc_0", "NPC1_png", NPC1x, NPC1y, "press the button \nto get task");
        var NPC_2: NPC = new NPC("npc_1", "NPC2_png", NPC2x, NPC2y, "press the button \nif you finish task");

        var taskPanel: TaskPanel = new TaskPanel(20, NPC2y + 500);

        var monsterButton:MockKillMonsterBotton = new MockKillMonsterBotton();


        TaskService.getInstance().addObserver(taskPanel);
        TaskService.getInstance().addObserver(NPC_1);
        TaskService.getInstance().addObserver(NPC_2);
        TaskService.getInstance().addObserver(monsterButton);

        this.addChild(taskPanel);
        this.addChild(NPC_1);
        this.addChild(NPC_2);
        this.addChild(monsterButton);

        /* var monsterArray:Monster[] = [
             new Monster(),
             new Monster(),
             new Monster()
         ]*/
        //var monsters:Monsters = new Monsters(monsterArray);
        //this.addChild(monsters);
        //TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
        /*var service = TaskService.getInstance();
        var task = new Task("1111", "Hello world");
        task.status = TaskStatus.CAN_SUBMIT;
        service.addTask(task);

        var npc = new NPC(service);
        service.addObserver(npc);

        var result = service.finish("111");
        if (result != 0) {
            alert("error!" + result);
            return;
        }*/
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}

