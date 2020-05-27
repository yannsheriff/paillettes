import { generateId } from "./utils";

class Character {
  public ID: string;
  public totalArrow: number;
  private remainingArrow: number;

  constructor(arrowCount: number = 1) {
    this.ID = generateId();
    this.totalArrow = arrowCount;
    this.remainingArrow = arrowCount;
  }

  public generateArrowID = (): { isLastArrow: boolean; id: string } => {
    this.remainingArrow -= 1;
    if (this.remainingArrow <= 0) {
      return { isLastArrow: true, id: this.ID };
    }
    return { isLastArrow: false, id: this.ID };
  };
}

export default Character;
