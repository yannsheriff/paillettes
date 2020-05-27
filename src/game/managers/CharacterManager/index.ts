import Character from "./Character";

class CharacterManager {
  public actualCharacter: Character;
  private successfullArrows: Map<string, number> = new Map();
  private static instance: CharacterManager;
  private characters: Map<string, Character> = new Map();
  private createCallback: Array<(id: string) => any>;
  private onEndCallback: Array<(id: string, isUnlocked: boolean) => any>;

  private constructor() {
    this.actualCharacter = new Character(2);
    this.characters.set(this.actualCharacter.ID, this.actualCharacter);
    this.createCallback = [];
    this.onEndCallback = [];
  }

  public static getInstance(): CharacterManager {
    if (!this.instance) {
      this.instance = new CharacterManager();
    }
    return this.instance;
  }

  private generateNewCharacter(): void {
    const num = Math.floor(Math.random() * (15 - 1 + 1) + 10);
    const character = new Character(num);
    this.actualCharacter = character;
    this.characters.set(character.ID, character);
    this.callOnNew(character.ID);
  }

  public getArrowID(): { ID: string } {
    const { isLastArrow, id } = this.actualCharacter.generateArrowID();
    if (isLastArrow) {
      const isSuccessfull = this.isCharacterSuccesfull(this.actualCharacter.ID);
      this.callOnEnd!(this.actualCharacter.ID, isSuccessfull);
      this.generateNewCharacter();
    }
    return { ID: id };
  }

  public registerSuccesfullArrow(ID: string) {
    if (this.successfullArrows.has(ID)) {
      let value = this.successfullArrows.get(ID);
      this.successfullArrows.set(ID, value! + 1);
    } else {
      this.successfullArrows.set(ID, 1);
    }
  }

  private isCharacterSuccesfull(ID: string) {
    const successfulArrows = this.successfullArrows.get(ID);
    const totalArrows = this.characters.get(ID)!.totalArrow;
    return successfulArrows === totalArrows;
  }

  public onNewCharacter(callback: (id: string) => any) {
    this.createCallback.push(callback);
  }

  public isCharacterUnlocked(
    callback: (id: string, isUnlocked: boolean) => any
  ) {
    this.onEndCallback.push(callback);
  }

  private callOnNew = (id: string) => {
    this.createCallback.forEach((callback) => callback(id));
  };

  private callOnEnd = (id: string, isSuccessfull: boolean) => {
    this.onEndCallback.forEach((callback) => callback(id, isSuccessfull));
  };
}

export default CharacterManager;
