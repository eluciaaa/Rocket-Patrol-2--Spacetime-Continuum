// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  // add to existing, displayList, updateList
        this.isFiring = false
        this.moveSpeed = 2
        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        // mouse movement
        if(!this.isFiring) {
            this.x = Phaser.Math.Clamp(this.scene.input.activePointer.x, borderUISize + this.width, game.config.width - borderUISize - this.width)
        }

        // fire button
        if(this.scene.mouse.leftButtonDown() && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }
        
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 2.5 + borderPadding) {
            this.y -= this.moveSpeed
        }

        // reset on miss
        if(this.y <= borderUISize * 2.5 + borderPadding) {
            this.scene.onMiss()
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}