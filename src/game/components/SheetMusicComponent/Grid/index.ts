import { heightBetweenSheetHBar } from "../index";
import { Direction } from "../GridObject";
import stepEventEmitter from "../../../helpers/StepEventEmitter";
import { StepEventType } from "../../../helpers/StepEventEmitter/gamepadListener";

interface Row {
  posY: number;
  line: Phaser.GameObjects.Rectangle | undefined;
}

const colorMap: Map<Direction, number> = new Map([
  ["up", 0xffe700],
  ["right", 0xff007d],
  ["left", 0x00fff6],
  ["down", 0xffa9e3],
]);
class Grid {
  public grid?: Phaser.GameObjects.Image;
  private rows: Map<Direction, Row>;
  private scale: number;
  private scene: Phaser.Scene;
  public assetWidth: number;

  constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
    this.scale = scale;
    this.scene = scene;

    const height = heightBetweenSheetHBar * this.scale;

    this.rows = new Map([
      ["up", { posY: y, line: undefined }],
      ["right", { posY: y + (height / 3) * 1, line: undefined }],
      [
        "left",
        {
          posY: y + (height / 3) * 2,
          line: undefined,
        },
      ],
      [
        "down",
        {
          posY: y + (height / 3) * 3,
          line: undefined,
        },
      ],
    ]);

    // asset width is 1123

    const width = window.innerWidth - x;
    this.rows.forEach((height, direction) => {
      const line = this.scene.add
        .rectangle(x + width / 2, height.posY, width, 3, 0x463d5e)
        .setDepth(12);

      const row: Row = {
        posY: height.posY,
        line: line,
      };
      this.rows.set(direction, row);
    });
    this.assetWidth = scale * 1123;

    stepEventEmitter.on(StepEventType.stepdown, this.handleStepDown);
    stepEventEmitter.on(StepEventType.stepup, this.handleStepUp);
  }

  private handleStepDown = (directions: Direction[]) => {
    directions.forEach((direction) => {
      const row = this.rows.get(direction);
      if (row !== undefined && row?.line !== undefined) {
        row.line.setFillStyle(colorMap.get(direction));
      }
    });
  };

  private handleStepUp = (directions: Direction[]) => {
    directions.forEach((direction) => {
      const row = this.rows.get(direction);
      if (row !== undefined && row?.line !== undefined) {
        row!.line?.setFillStyle(0x463d5e);
      }
    });
  };
}

export default Grid;
