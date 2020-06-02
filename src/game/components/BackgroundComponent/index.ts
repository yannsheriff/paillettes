import Mask from "./Mask";
import Plane, { PlaneSpace } from "./Plane";
import Align from "../../helpers/Align/align";
import MainStateManager, { MainState, Worlds } from "../../states/main";

class BackgroundManager {
  private pink: number = 0xff00ab;
  private blue: number = 0x2b3aff;
  private purple: number = 0x6a23ff;
  private red: number = 0xff0b0b;
  private white: number = 0xffffff;
  private mainState: MainState;
  private mainManager: MainStateManager;
  private globalSpeed: number = 50;
  private currentPlanes: Array<Plane> = [];
  private nextPlanes: Array<Plane> = [];
  private scene: Phaser.Scene;
  private canvasWidth: number = 0;
  private world: Worlds = 1;
  private currentAsset: Array<number> = []
  private planesAssets: Array<Array<Array<string>>> = [
    [
      [
        "word_1_plane_1_1",
        "word_1_plane_1_2",
        "word_1_plane_1_3",
        "word_1_plane_1_4",
      ],
      [
        "word_1_plane_2_1",
        "word_1_plane_2_2",
        "word_1_plane_2_3",
        "word_1_plane_2_4",
        "word_1_plane_2_5",
        "word_1_plane_2_6",
      ],
      [
        "word_1_plane_3_1",
        "word_1_plane_3_2",
        "word_1_plane_3_3",
        "word_1_plane_3_4",
        "word_1_plane_3_5",
        "word_1_plane_3_6",
      ]
    ]
  ];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.canvasWidth = scene.sys.game.canvas.width;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    let mask = new Mask(scene, 600, 400, "mask", 0, this.pink);
    Align.left(mask);

    for (let planenb = 1; planenb < 4; planenb++) {
      this.generatePlanes(planenb, true);
    }
  }

  /**
   * Generate a new plane and set its destroy time
   * and the time it will generate the next one
   */
  public generatePlanes(planenb: PlaneSpace, isInit: boolean) {
    let arrayNb = planenb - 1

    let rand = this.getRandomAsset(arrayNb)

    this.currentAsset[arrayNb] = rand

    let planeObj = new Plane(
      this.scene,
      0,
      0,
      this.planesAssets[this.world - 1][arrayNb][rand],
      planenb,
      this.globalSpeed
    );

    if (isInit) {
      this.currentPlanes[arrayNb] = planeObj;
    } else {
      this.nextPlanes[arrayNb] = planeObj;
    }

    this.initDestroy(planeObj, arrayNb);
    this.initNextPlane(planeObj, planenb);
  }

  public initDestroy(planeinstance: Plane, planeArrayNumber: number) {
    const timeToExitCanvas = this.calculateTime(
      planeinstance.width,
      planeinstance.scale,
      planeinstance.speed,
      this.canvasWidth,
      true
    );

    setTimeout(() => {
      planeinstance.deletePlane();
      this.currentPlanes[planeArrayNumber - 1] = this.nextPlanes[planeArrayNumber - 1];
    }, timeToExitCanvas);
  }

  public initNextPlane(planeinstance: Plane, planeNumber: PlaneSpace) {
    const timeBeforeGenerateNextPlane = this.calculateTime(
      planeinstance.width,
      planeinstance.scale,
      planeinstance.speed,
      this.canvasWidth,
      false
    );

    setTimeout(() => {
      this.generatePlanes(planeNumber, false);
    }, timeBeforeGenerateNextPlane);
  }

  // get random asset depending on world and plane
  // avoid getting twice the same asset in a row
  public getRandomAsset(arrayNb: number) {
    let rand;
    do {
      rand = Math.floor(
        Math.random() * (this.planesAssets[this.world - 1][arrayNb].length - 1) + 1
      );
    } while (rand === this.currentAsset[arrayNb]);

    return rand;
    
  }

  /**
   * Helper fonction
   *
   * Permet de calculer en sec combien de temps met
   * le plan à sortir du canvas
   */
  public calculateTime(
    planeWidth: number,
    planeScale: number,
    planeSpeed: number,
    canvasWidth: number,
    isExit: boolean
  ): number {
    let latency = -50;
    const v = planeSpeed;
    let d = planeWidth * planeScale + latency;
    if (isExit) {
      d += canvasWidth;
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

  private startWorldTransition(world: Worlds) {
    console.log("BackgroundManager -> startWolrdTransition -> world", world);
  }

  private endWolrdTransition() {
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
      this.endWolrdTransition();
    }

    this.mainState = state;
  };
}

export default BackgroundManager;
