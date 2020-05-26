import PhysicCharacter from "../../physic/CharacterBis";

const charactersWorld1 = ['world_1_man_1', 'world_1_man_2', 'world_1_woman_1', 'world_1_woman_2']

class PhysicCharacterManager {
    private scene: Phaser.Scene
    public characters: Array<PhysicCharacter>;
    public testY: number = 200;

    constructor(
        scene: Phaser.Scene,
    ) {
        this.scene = scene
        this.characters = [];

        /*
         *
         * Création des colliders
         * temporairement visible
         *
         */
        const characterOverlap = scene.add.rectangle(
            window.innerWidth / 4 + window.innerWidth / 12 / 2,
            window.innerHeight / 2,
            window.innerWidth / 12,
            window.innerHeight
        ) as any;

        scene.physics.add.existing(characterOverlap);

        this.generateNewPhysicCharacter()

        // scene.physics.add.overlap(
        //     this.characters,
        //     characterOverlap,
        //     this.handleCharacterOverlap,
        //     () => true,
        //     this
        // );
    }

    public generateNewPhysicCharacter() {
        let rand = Math.floor(Math.floor(Math.random() * (charactersWorld1.length)));

        let charObj = new PhysicCharacter(
            this.scene,
            // window.innerWidth / 2,
            this.testY,
            window.innerHeight / 1.5,
            charactersWorld1[rand],
            "NBidle",
            // ID,
            '',
            false)
        this.characters.push(charObj);
        this.testY += 200;
    }

    public playTransformation(id: string) {
        this.characters.forEach(character => {
            character.playTransformationAnimation()
        });
    }

    public playAllDance() {
        this.characters.forEach(character => {
            character.playDanceAnimation()
        });
    }

    // DEBUG PURPOSE
    public playAllAnimations() {

    }
}

export default PhysicCharacterManager;
