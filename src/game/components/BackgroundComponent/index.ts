import Blob from "./Blob";
import Plane, { PlaneSpace } from "./Plane";
import MainStateManager, {
  MainState,
  Worlds,
  GameStatus,
} from "../../states/main";

class BackgroundManager {
  private mainState: MainState;
  private mainManager: MainStateManager;
  private globalSpeed: number = 50;
  private currentPlanes: Array<Plane> = [];
  private scene: Phaser.Scene;
  private canvasWidth: number = 0;
  private world: Worlds;
  private currentAsset: Array<number> = [];
  private numberAssets: number = 6;
  private blob?: Blob;

  private distanceBtwAssetsFirstPlane = -70;
  private distanceBtwAssetsSecondPlane = -100;
  private distanceBtwAssetsThirdPlane = -150;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.canvasWidth = scene.sys.game.canvas.width;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;
    this.world = this.mainManager.state.world;
    
    this.blob = new Blob(this.scene)

    this.blob = new Blob(this.scene);

    this.generateFirstPlanes();
    this.blob = new Blob(this.scene);
  }

  public runBackground() {
    // apres que la DQ descende du ciel et qu'on play
    for (let planenb = 0; planenb < 3; planenb++) {
      this.generatePlanes(planenb, true);
    }
    this.currentPlanes.forEach(plane => {
      plane.movePlane()
      this.initDestroy(plane, plane.planeSpace)
    });
  }

  /**
   * Generate a new plane and set its destroy time
   * and the time it will generate the next one
   */
  public generatePlanes = (planeNumber: PlaneSpace, isInit: boolean) => {
    let planeSpace;

    if (planeNumber === 0) {
      planeSpace = PlaneSpace.first;
    } else if (planeNumber === 1) {
      planeSpace = PlaneSpace.second;
    } else {
      planeSpace = PlaneSpace.third;
    }

    let rand = this.getRandomAsset(planeSpace);

    let planeObj = new Plane(
      this.scene,
      0,
      0,
      "world" + this.world, // 'world' + this.world + 1
      "w" + this.world + "_p" + (planeNumber + 1) + "_" + rand,
      planeSpace,
      this.globalSpeed
    );

    // if (isInit) {
    //   this.currentPlanes.push(planeObj)
    // }

    this.initDestroy(planeObj, planeNumber);
    this.initNextPlane(planeObj, planeSpace);
  };

  public initDestroy(planeinstance: Plane, planeSpace: PlaneSpace) {
    const timeToExitCanvas = this.calculateTime(
      planeinstance.width,
      planeinstance.scale,
      planeinstance.speed,
      planeSpace,
      this.canvasWidth,
      true
    );

    setTimeout(() => {
      planeinstance.deletePlane();
    }, timeToExitCanvas);
  }

  public initNextPlane(planeinstance: Plane, planeSpace: PlaneSpace) {
    const timeBeforeGenerateNextPlane = this.calculateTime(
      planeinstance.width,
      planeinstance.scale,
      planeinstance.speed,
      planeSpace,
      this.canvasWidth,
      false
    );

    setTimeout(() => {
      if (this.mainState.gameStatus !== GameStatus.isGameOver) {
        this.generatePlanes(planeSpace, false);
      }
    }, timeBeforeGenerateNextPlane);
  }

  // get random asset depending on world and plane
  // avoid getting twice the same asset in a row
  public getRandomAsset(arrayNb: number) {
    let rand;

    do {
      rand = Math.floor(Math.random() * (this.numberAssets - 1) + 1);

      // handle bug and prevent for infite loop
      if (this.numberAssets <= 1) {
        return rand;
      }
    } while (rand === this.currentAsset[arrayNb] || 0);

    return rand;
  }

  public generateFirstPlanes() {
    let currentPlane;
    let prevPlane;

    for (let planeone = 0; planeone < 2; planeone++) {
      let rand = this.getRandomAsset(PlaneSpace.first);
      currentPlane = new Plane(
        this.scene,
        0,
        0,
        "world" + this.world, // 'world' + this.world + 1
        "w" + this.world + "_p" + 1 + "_" + rand,
        PlaneSpace.first,
        this.globalSpeed,
        true
      );
      if (planeone === 0) {
        currentPlane.x =
          window.innerWidth -
          currentPlane.displayWidth / 2 -
          this.distanceBtwAssetsFirstPlane;
      } else if (prevPlane) {
        currentPlane.x =
          prevPlane.x -
          currentPlane.displayWidth -
          this.distanceBtwAssetsFirstPlane;
      }
      this.currentPlanes.push(currentPlane);
      // this.initDestroy(currentPlane, PlaneSpace.first);
      prevPlane = currentPlane;
    }

    for (let planetwo = 0; planetwo < 3; planetwo++) {
      let rand = this.getRandomAsset(PlaneSpace.second);
      currentPlane = new Plane(
        this.scene,
        0,
        0,
        "world" + this.world, // 'world' + this.world + 1
        "w" + this.world + "_p" + 2 + "_" + rand,
        PlaneSpace.second,
        this.globalSpeed,
        true
      );
      if (planetwo === 0) {
        currentPlane.x =
          window.innerWidth -
          currentPlane.displayWidth / 2 -
          this.distanceBtwAssetsSecondPlane;
      } else if (prevPlane) {
        currentPlane.x =
          prevPlane.x -
          currentPlane.displayWidth -
          this.distanceBtwAssetsSecondPlane;
      }
      this.currentPlanes.push(currentPlane);
      // this.initDestroy(currentPlane, PlaneSpace.second);
      prevPlane = currentPlane;
    }
    for (let planethree = 0; planethree < 2; planethree++) {
      let rand = this.getRandomAsset(PlaneSpace.third);
      currentPlane = new Plane(
        this.scene,
        0,
        0,
        "world" + this.world, // 'world' + this.world + 1
        "w" + this.world + "_p" + 3 + "_" + rand,
        PlaneSpace.third,
        this.globalSpeed,
        true
      );
      if (planethree === 0) {
        currentPlane.x =
          window.innerWidth -
          currentPlane.displayWidth / 2 -
          this.distanceBtwAssetsThirdPlane;
      } else if (prevPlane) {
        currentPlane.x =
          prevPlane.x -
          currentPlane.displayWidth -
          this.distanceBtwAssetsThirdPlane;
      }
      this.currentPlanes.push(currentPlane);
      // this.initDestroy(currentPlane, PlaneSpace.third);
      prevPlane = currentPlane;
    }

    console.log(this.currentPlanes);
  }

  /**
   * Helper fonction
   *
   * Permet de calculer en sec combien de temps met
   * le plan à sortir du canvas et dans combien de temps
   * il doit en créer un nouveau
   */
  public calculateTime(
    planeWidth: number,
    planeScale: number,
    planeSpeed: number,
    planeSpace: PlaneSpace,
    canvasWidth: number,
    isExit: boolean
  ): number {
    let latency = 0; // this value set the distance between 2 assets

    if (planeSpace === PlaneSpace.first) {
      latency = this.distanceBtwAssetsFirstPlane;
    } else if (planeSpace === PlaneSpace.second) {
      latency = this.distanceBtwAssetsSecondPlane;
    } else {
      latency = this.distanceBtwAssetsThirdPlane;
    }

    const v = planeSpeed;
    let d = planeWidth * planeScale + latency;
    if (isExit) {
      d += canvasWidth - latency;
    }
    return (d / v) * 1000;
  }

  public startWorldTransition(world: Worlds) {
    this.world = world;
    console.log("BackgroundManager -> startWolrdTransition -> world", world);
  }

  private endWorldTransition() {
    console.log("End World Transition");
  }

  private onMainStateChange = (state: MainState) => {
    if (
      state.gameStatus !== this.mainState.gameStatus &&
      state.gameStatus === GameStatus.isRunning
    ) {
      this.runBackground();
    }

    if (state.world !== this.mainState.world) {
      this.startWorldTransition(state.world);
    }

    if (
      state.isInTransition !== this.mainState.isInTransition &&
      !state.isInTransition
    ) {
      this.endWorldTransition();
    }

    this.mainState = state;
  };
}

export default BackgroundManager;
