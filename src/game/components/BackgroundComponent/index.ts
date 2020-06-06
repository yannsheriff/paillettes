import Blob from "./Blob";
import Plane, { PlaneSpace } from "./Plane";
import Align from "../../helpers/Align/align";
import MainStateManager, { MainState, Worlds } from "../../states/main";

class BackgroundManager {
  private mainState: MainState;
  private mainManager: MainStateManager;
  private blob: Blob;
  private globalSpeed: number = 50;
  private currentPlanes: Array<Plane> = [];
  private nextPlanes: Array<Plane> = [];
  private scene: Phaser.Scene;
  private canvasWidth: number = 0;
  private world: Worlds;
  private currentAsset: Array<number> = []
  private numberAssets: Map<Worlds, number[]> = new Map([
    [Worlds.middleAges, [ 6, 6, 6 ]], // 24 assets in World 1
    [Worlds.nineteenCentury, [ 6, 6, 6 ]] // 24 assets in World 1
  ]);

  // numberAssets.get(Worlds.middleAges)
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.canvasWidth = scene.sys.game.canvas.width;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;
    this.world = this.mainManager.state.world;

    this.blob = new Blob(this.scene)

    for (let planenb = 0; planenb < 3; planenb++) {
      this.generatePlanes(planenb, true);
    }
  }

  /**
   * Generate a new plane and set its destroy time
   * and the time it will generate the next one
   */
  public generatePlanes(planeNumber: PlaneSpace, isInit: boolean) {
    let planeSpace;

    if (planeNumber === 0) {
      planeSpace = PlaneSpace.first
    } else if (planeNumber === 1) {
      planeSpace = PlaneSpace.second
    } else {
      planeSpace = PlaneSpace.third
    }
    
    let rand = this.getRandomAsset(planeSpace)

    let planeObj = new Plane(
      this.scene,
      0,
      0,
      'world' + this.world, // 'world' + this.world + 1
      'plane' + (planeNumber + 1) + '/w' + this.world + '_p' + (planeNumber + 1) + '_' + rand,
      planeSpace,
      this.globalSpeed
    );

    if (isInit) {
      this.currentPlanes[planeNumber] = planeObj;
    } else {
      this.nextPlanes[planeNumber] = planeObj;
    }

    this.initDestroy(planeObj, planeNumber, planeNumber);
    this.initNextPlane(planeObj, planeSpace);
  }

  public initDestroy(planeinstance: Plane, planeSpace: PlaneSpace, planeNb: number) {
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
      this.currentPlanes[planeNb] = this.nextPlanes[planeNb];
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
      this.generatePlanes(planeSpace, false);
    }, timeBeforeGenerateNextPlane);
  }

  // get random asset depending on world and plane
  // avoid getting twice the same asset in a row
  public getRandomAsset(arrayNb: number) {
    let rand;

    const worldAssets = this.numberAssets.get(this.world)![arrayNb]

    do {
      rand = Math.floor(Math.random() * (worldAssets - 1) + 1);

      // handle bug and prevent for infite loop
      if (worldAssets <= 1) {
        return rand;
      }
    } while (rand === this.currentAsset[arrayNb] || 0);
    
    return rand;
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
      latency = -70
    } else if (planeSpace === PlaneSpace.second) {
      latency = -100;
    } else {
      latency = -150;
    }

    const v = planeSpeed;
    let d = planeWidth * planeScale + latency;
    if (isExit) {
      d += canvasWidth - latency;
    }
    return (d / v) * 1000;
  }

  public updateSpeed(newSpeed: number) {
    this.globalSpeed += newSpeed;
    this.currentPlanes.forEach((planeelement) => {
      planeelement.updatePlaneSpeed(this.globalSpeed);
    });
    this.nextPlanes.forEach((planeelement) => {
      planeelement.updatePlaneSpeed(this.globalSpeed);
    });
  }

  public startWorldTransition(world: Worlds) {
    this.world = world;
    console.log("BackgroundManager -> startWolrdTransition -> world", world);
  }

  private endWorldTransition() {
    console.log("End World Transition");
  }

  private onMainStateChange = (state: MainState) => {
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
