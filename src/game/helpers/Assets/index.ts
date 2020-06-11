export interface ImageData {
  key: string;
  asset: any;
}

export interface SpritesheetData {
  key: string;
  asset: any;
  path: string;
}

export interface SpineData {
  key: string;
  path: string;
}

export default class AssetsManager {
  private static instance: AssetsManager;
  private scene: any;
  private images: ImageData[];
  private spritesheets: SpritesheetData[];
  private spines: SpineData[];
  private spineCharacters: SpineData[];

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor(scene: Phaser.Scene, images: ImageData[], spritesheets: SpritesheetData[], spines: SpineData[]) {
    this.images = images;
    this.spritesheets = spritesheets;
    this.spines = spines;
    this.scene = scene;
    this.spineCharacters = []

    for (let world = 1; world <= 4; world++) {
      for (let spine = 1; spine <= 2; spine++) {
        const man: SpineData = {
          key: "world_" + world + "_man_" + spine,
          path: "assets/spine/world" + world + "/man" + spine + "/"
        }
        const woman: SpineData = {
          key: "world_" + world + "_woman_" + spine,
          path: "assets/spine/world" + world + "/woman" + spine + "/"
        }
        this.spineCharacters.push(man, woman)
      }
    }
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public preload() {
    this.images.forEach((image) => {
      this.scene.load.image(image.key, image.asset);
    });
    this.spritesheets.forEach((spritesheet) => {
      this.scene.load.setPath(spritesheet.path);
      this.scene.load.multiatlas(spritesheet.key, spritesheet.asset);
    });
    this.spineCharacters.forEach((spine) => {
      this.scene.load.setPath(spine.path);
      this.scene.load.spine(spine.key, spine.key + ".json", spine.key + ".atlas");
    });
    this.spines.forEach((spine) => {
      this.scene.load.setPath(spine.path);
      this.scene.load.spine(spine.key, spine.key + ".json", spine.key + ".atlas");
    });
  }
}
