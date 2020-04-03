import Character from "../Character";

class CharactereManager {
  public actualCharacter: Character;
  private successfullArrows: Map<string, number> = new Map();
  private characters: Map<string, Character> = new Map();
  constructor() {
    this.actualCharacter = new Character(2);
    this.characters.set(this.actualCharacter.ID, this.actualCharacter);
  }

  generateNewCharactere(): void {
    const num = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    const character = new Character(num);
    this.actualCharacter = character;
    this.characters.set(character.ID, character);
  }

  getArrowID(): { shouldLaunchCharacter: boolean; ID: string } {
    const { isLastArrow, id } = this.actualCharacter.generateArrowID();
    if (isLastArrow) {
      this.generateNewCharactere();
    }
    return { ID: id, shouldLaunchCharacter: isLastArrow };
  }

  registerSuccesfullArrow(ID: string) {
    if (this.successfullArrows.has(ID)) {
      let value = this.successfullArrows.get(ID);
      this.successfullArrows.set(ID, value! + 1);
    } else {
      this.successfullArrows.set(ID, 1);
    }
  }

  isCharacterSuccesfull(ID: string) {
    const successfulArrows = this.successfullArrows.get(ID);
    const totalArrows = this.characters.get(ID)!.totalArrow;
    return successfulArrows === totalArrows;
  }
}

export default CharactereManager;
