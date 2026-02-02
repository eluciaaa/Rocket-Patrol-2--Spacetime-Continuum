class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images / tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship1', './assets/spaceship1.png')
        this.load.image('spaceship2', './assets/spaceship2.png')
        this.load.image('spaceship3', './assets/spaceship_3.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('menubackground', './assets/menubackground.png')
        this.load.image('clock', './assets/clock.png')

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9,
                first: 0
            }),
            frameRate: 30
        })

        let titleMenuConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            backgroundColor: '#FFFFFF',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // place tile sprite
        this.menubackground = this.add.tileSprite(0, 0, 640, 480, 'menubackground').setOrigin(0, 0).setDepth(0)

        // display menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding - 65, 'ROCKET PATROL 2:',
        titleMenuConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding - 15, 'Spacetime Continuum',
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 15, 'Use ←→ arrows to move & (F) to fire', menuConfig).
        setOrigin(0.5)
        menuConfig.backgroundColor = '#ed87ff'
        menuConfig.color = '#FFFFFF'
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding + 30, 'Press ← for Novice or → for Expert', 
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding * 5 + 45, `High Score: ${game.highScore}`, menuConfig).
        setOrigin(0.5)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                normalSpaceshipSpeed: 3,
                fastSpaceshipSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                normalSpaceshipSpeed: 4,
                fastSpaceshipSpeed: 5,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}