import { Direction } from "../GridObject";
import stepEventEmitter from "../../../helpers/StepEventEmitter";
import { StepEventType } from "../../../helpers/StepEventEmitter/gamepadListener";
import ScoreStateManager from "../../../states/score";
import { GridObject } from "..";

interface input {
  name: string;
  y: number;
  sprite?: Phaser.GameObjects.Sprite;
  state: boolean;
  playSuccess: boolean;
}

export const inputZoneAssetWidth = 200;

class InputZone {
  public collider: Phaser.GameObjects.Rectangle;
  private inputs: Map<Direction, input>;
  private scene: Phaser.Scene;
  private posX: number;
  private posY: number;
  private scale: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    height: number,
    scale: number
  ) {
    this.scene = scene;
    this.collider = scene.add
      .rectangle(x + 40, y + height / 2, 2, height)
      .setDepth(12);

    this.posX = x;
    this.posY = y;
    this.scale = scale;
    scene.physics.add.existing(this.collider);

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
        "left",
        {
          name: "left",
          y: y + (height / 3) * 1,
          sprite: undefined,
          state: false,
          playSuccess: false,
        },
      ],
      [
        "right",
        {
          name: "right",
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
          this.posX - inputZoneAssetWidth / 2,
          input.y,
          input.name + "-off"
        )
        .setDepth(12)
        .setScale(this.scale);
    });
  }

  handleStepDown = (directions: Direction[]) => {
    directions.forEach((direction) => {
      const input = this.inputs.get(direction);
      if (!input?.state && !input?.playSuccess) {
        input?.sprite?.play(direction + "-on");
        this.inputs.set(direction, { ...input!, state: true });
      }
    });
  };

  handleStepUp = (directions: Direction[]) => {
    directions.forEach((direction) => {
      const input = this.inputs.get(direction);
      if (input?.state) {
        input?.sprite?.play(direction + "-off");
        this.inputs.set(direction, { ...input!, state: false });
      }
    });
  };

  handleStepSuccess = (gridObject: GridObject) => {
    const input = this.inputs.get(gridObject.direction);
    if (input?.state) {
      input.playSuccess = true;
      input?.sprite
        ?.play(gridObject.direction + "-success")
        .on("animationcomplete", () => {
          console.log("inut");
          this.inputs.set(gridObject.direction, {
            ...input!,
            playSuccess: false,
          });
        });
      this.inputs.set(gridObject.direction, { ...input!, state: false });
    }
  };
}

export default InputZone;
