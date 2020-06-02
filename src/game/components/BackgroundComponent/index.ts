import Mask from "./Mask";
import Plane from "./Plane";
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
  private planesAssets: Array<Array<string>> = [
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
    ],
  ];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.canvasWidth = scene.sys.game.canvas.width;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onMainStateChange);
    this.mainState = this.mainManager.state;

    let mask = new Mask(scene, 600, 400, "mask", 0, this.pink);
    Align.left(mask);

    for (let planenb = 0; planenb < 3; planenb++) {
      this.generatePlanes(planenb, true);
    }
  }

  /**
   * Generate a new plane and set its destroy time
   * and the time it will generate the next one
   */
  public generatePlanes(planenb: number, isInit: boolean) {
    // get random asset for plane
    let rand = Math.floor(
      Math.random() * (this.planesAssets[planenb].length - 1) + 1
    );

    let planeObj = new Plane(
      this.scene,
      0,
      0,
      this.planesAssets[planenb][rand],
      planenb,
      this.globalSpeed
    );

    if (isInit) {
      this.currentPlanes[planenb] = planeObj;
    } else {
      this.nextPlanes[planenb] = planeObj;
    }

    this.initDestroy(this.currentPlanes[planenb], planenb);
    this.initNextPlane(this.currentPlanes[planenb], planenb);
  }

  public initDestroy(planeinstance: Plane, planeArrayNb: number) {
    const timeToExitCanvas = this.calculateTime(
      planeinstance.width,
      planeinstance.scale,
      planeinstance.speed,
      this.canvasWidth,
      true
    );

    setTimeout(() => {
      planeinstance.destroy(true);
      this.currentPlanes[planeArrayNb] = this.nextPlanes[planeArrayNb];
    }, timeToExitCanvas);
  }

  public initNextPlane(planeinstance: Plane, planeArrayNb: number) {
    const timeBeforeGenerateNextPlane = this.calculateTime(
      planeinstance.width,
      planeinstance.scale,
      planeinstance.speed,
      this.canvasWidth,
      false
    );

    setTimeout(() => {
      this.generatePlanes(planeArrayNb, false);
    }, timeBeforeGenerateNextPlane);
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
    this.globalSpeed = newSpeed;
    this.currentPlanes.forEach((planeelement) => {
      planeelement.updatePlaneSpeed(newSpeed);
    });
    this.nextPlanes.forEach((planeelement) => {
      planeelement.updatePlaneSpeed(newSpeed);
    });
    this.globalSpeed += 20;
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
