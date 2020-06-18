import { Direction } from "../GridObject";
import stepEventEmitter from "../../../helpers/StepEventEmitter";
import { StepEventType } from "../../../helpers/StepEventEmitter/gamepadListener";
import ScoreStateManager from "../../../states/score";
import { GridObject } from "..";
import MainStateManager, { GameStatus, MainState } from "../../../states/main";

interface input {
  name: string;
  y: number;
  sprite?: Phaser.GameObjects.Sprite;
  state: boolean;
  playSuccess: boolean;
}

export const inputZoneAssetWidth = 82;

class InputZone {
  public collider: Phaser.GameObjects.Rectangle;
  private inputs: Map<Direction, input>;
  private scene: Phaser.Scene;
  private posX: number;
  private posY: number;
  private scale: number;
  private mainState: MainState;
  private mainManager: MainStateManager;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    height: number,
    scale: number
  ) {
    this.scene = scene;
    this.collider = scene.add
      .rectangle(x + 60, y + height / 2, 2, height)
      .setDepth(12);

    this.posX = x;
    this.posY = y;
    this.scale = scale;
    scene.physics.add.existing(this.collider);
    this.mainState = MainStateManager.getInstance().state;
    this.mainManager = MainStateManager.getInstance();
    this.mainManager.subscribe(this.onStateChange);

    this.inputs = new Map([
      [
        "up",
        {
          name: "up",
          y: y,
          sprite: undefined,
          state: false,
          playSuccess: false,
        },
      ],

      [
        "right",
        {
          name: "right",
          y: y + (height / 3) * 1,
          sprite: undefined,
          state: false,
          playSuccess: false,
        },
      ],
      [
        "left",
        {
          name: "left",
          y: y + (height / 3) * 2,
          sprite: undefined,
          state: false,
          playSuccess: false,
        },
      ],
      [
        "down",
        {
          name: "down",
          y: y + (height / 3) * 3,
          sprite: undefined,
          state: false,
          playSuccess: false,
        },
      ],
    ]);

    stepEventEmitter.on(StepEventType.stepdown, this.handleStepDown);
    stepEventEmitter.on(StepEventType.stepup, this.handleStepUp);
    ScoreStateManager.getInstance().onSuccess(this.handleStepSuccess);
    this.create();
  }

  create() {
    this.inputs.forEach((input: input) => {
      input.sprite = this.scene.add
        .sprite(
          this.posX - (inputZoneAssetWidth * this.scale) / 2,
          input.y,
          input.name + "-off"
        )
        .setDepth(12)
        .setScale(this.scale);
    });
  }

  handleStepDown = (directions: Direction[]) => {
    if (this.mainState.gameStatus !== GameStatus.isReady) { // avoid playing during intro
      directions.forEach((direction) => {
        const input = this.inputs.get(direction);
        if (!input?.state && !input?.playSuccess) {
          input?.sprite?.play(direction + "-on");
          this.inputs.set(direction, { ...input!, state: true });
        }
      });
    }
  };

  handleStepUp = (directions: Direction[]) => {
    if (this.mainState.gameStatus !== GameStatus.isReady) { // avoid playing during intro
      directions.forEach((direction) => {
        const input = this.inputs.get(direction);
        if (input?.state) {
          input?.sprite?.play(direction + "-off");
          this.inputs.set(direction, { ...input!, state: false });
        }
      });
    }
  };

  handleStepSuccess = (gridObject: GridObject) => {
    const input = this.inputs.get(gridObject.direction);
    if (input?.state) {
      input.playSuccess = true;
      input?.sprite
        ?.play(gridObject.direction + "-success")
        .once("animationcomplete", () => {
          this.inputs.set(gridObject.direction, {
            ...input!,
            playSuccess: false,
            state: false,
          });
        });
      this.inputs.set(gridObject.direction, { ...input!, state: false });
    }
  };

  private onStateChange = (state: MainState) => {
    if (
      state.gameStatus !== this.mainState.gameStatus &&
      state.gameStatus === GameStatus.isGameOver
    ) {
      stepEventEmitter.removeListener(
        StepEventType.stepdown,
        this.handleStepDown
      );
      stepEventEmitter.removeListener(StepEventType.stepup, this.handleStepUp);
    }
    
    this.mainState = state;
  };
}

export default InputZone;
