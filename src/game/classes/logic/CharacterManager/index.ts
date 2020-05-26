import Character from "../Character";

class CharacterManager {
  public actualCharacter: Character;
  private successfullArrows: Map<string, number> = new Map();
  private static instance: CharacterManager;
  private characters: Map<string, Character> = new Map();
  private createCallback?: () => any;
  private unlockedCallback?: (isUnlocked: boolean) => any;
  constructor() {
    this.actualCharacter = new Character(2);
    this.characters.set(this.actualCharacter.ID, this.actualCharacter);
  }

  public static getInstance(): CharacterManager {
    if (!this.instance) {
      this.instance = new CharacterManager();
    }
    return this.instance;
  }

  onNewCharacter(callback: () => any) {
    this.createCallback = callback;
  }

  isCharacterUnlocked(callback: (isUnlocked: boolean) => any) {
    this.unlockedCallback = callback;
  }

  generateNewCharacter(): void {
    const num = Math.floor(Math.random() * (15 - 1 + 1) + 10);
    const character = new Character(num);
    this.actualCharacter = character;
    this.characters.set(character.ID, character);
    this.createCallback!();
  }

  getArrowID(): { shouldLaunchCharacter: boolean; ID: string } {
    const { isLastArrow, id } = this.actualCharacter.generateArrowID();
    if (isLastArrow) {
      this.generateNewCharacter();
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

export default CharacterManager;
