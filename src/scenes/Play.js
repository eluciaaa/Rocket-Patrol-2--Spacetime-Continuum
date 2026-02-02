class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 
        0xffc3f8).setOrigin(0, 0.5).setDepth(1)

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 
        0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, 
        borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 
        0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, 
        game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0).setDepth(0)

        // place clock sprite
        this.clock = this.add.tileSprite(0, 0, 64, 64, 'clock').setOrigin(-4.5, -0.15).setDepth(3)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, -4)

        // add spaceships (x3)
        this.ship01 = new FastSpaceship(this, game.config.width + borderUISize*6, 
        borderUISize*4, 'spaceship3', 0, 50).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, 
        borderUISize*5 + borderPadding*2, 'spaceship2', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + 
        borderPadding*4, 'spaceship1', 0, 10).setOrigin(0, 0)

        // define keys
        this.mouse = this.input.activePointer
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0

        // display score and labels
        let scoreLabelConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            color: '#000000',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 180
        }

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 75
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, this.p1Score, scoreConfig).setOrigin(-0.75, 0.75).setDepth(2)

        this.scoreLabelLeft = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, 'Score: ', scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)

        this.scoreLabelLeft.text = 'Score: '

        this.timeMiddle = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, game.settings.gameTimer, scoreLabelConfig).setOrigin(-1.47, 0.8).setDepth(4)
        
        this.highscoreRight = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, game.highScore, scoreConfig).setOrigin(-6.75, 0.75).setDepth(2)

        this.highscoreLabelRight = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, 'High Score: ', scoreLabelConfig).setOrigin(-2, 0.75).setDepth(3)

        this.highscoreLabelRight.text = 'High Score: '

        this.plusThreeSecondsText = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, '+3s!', scoreLabelConfig).setOrigin(-1.4, -0.5).setDepth(3).setAlpha(0)

        this.minusThreeSecondsText = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, '-3s!', scoreLabelConfig).setOrigin(-1.4, -0.5).setDepth(3).setAlpha(0)
        
        // GAME OVER flag
        this.gameOver = false

        // play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > game.highScore) {
                game.highScore = this.p1Score
            }
            this.highscoreRight.text = game.highScore
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
    }

    update() {
        if (!this.gameOver) {
            let timeLeft = Math.ceil(this.clock.getRemainingSeconds())
            this.timeMiddle.setText(`${timeLeft}`)
        }

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.sound.play('sfx-select')
            this.scene.restart()
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx-select')
            this.scene.start("menuScene")
        }


        this.starfield.tilePositionX -= 4
        if(!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update() // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }

    shipExplode(ship) {
        this.sound.play('sfx-explosion')
        // temporarily hide ship and show +3s text
        ship.alpha = 0
        this.plusThreeSecondsText.alpha = 1
        // add time to the clock
        this.clock.delay += 3000
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')               // play explode animation
        boom.on('animationcomplete', () => {     // callback after anim completes
            ship.reset()                         // reset ship position
            ship.alpha = 1                       // make ship visible again
            this.plusThreeSecondsText.alpha = 0  // make +3s text invisible again
            boom.destroy()                       // remove explosion sprite
        })

        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.highscoreRight.text = game.highScore
    }

    // special function that handles the time decrease on miss
    onMiss() {
        this.minusThreeSecondsText.alpha = 1
        this.clock.delay -= 3000
        this.time.delayedCall(300, () => {
            this.minusThreeSecondsText.alpha = 0
        }, null, this)
    }
}