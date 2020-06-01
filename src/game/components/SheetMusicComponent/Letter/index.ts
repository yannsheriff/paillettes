import { FreeLetter } from "../../../states/freestyle";
import GridObject, { Direction } from "../GridObject";

const letterMap = {
  up: FreeLetter.F,
  down: FreeLetter.R,
  left: FreeLetter.E1,
  right: FreeLetter.E2,
};

const imageMap = new Map([
  [FreeLetter.F, "F"],
  [FreeLetter.R, "R"],
  [FreeLetter.E1, "E1"],
  [FreeLetter.E2, "E1"],
]);

class Letter extends GridObject {
  public letter: FreeLetter;
  constructor(
    scene: Phaser.Scene,
    id: string,
    speed: number,
    height: number,
    y: number,
    x: number = window.innerWidth,
    direction: Direction,
    scale: number
  ) {
    const letter = letterMap[direction];
    const imageName = imageMap.get(letter);
    super(scene, id, speed, height, y, x, direction, scale, imageName!);
    this.letter = letter;
  }
}

export default Letter;
