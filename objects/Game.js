const Game = function({
	welcome,
	birdSprite,
	pipeSprite,
	background,
	base,
	numbers,
	gameover,
	audio
}) {
	this.state = {
		points: 0,
		gameover: false,
		stage: 'welcome'
	}

	this.background = new RepetitiveSprite({
		sprite: background[Math.floor(random(background.length))]
	})

	this.base = new RepetitiveSprite({
		sprite: base,
		initY: height - base.height + 50,
		velocity: -3
	})

	this.bird = new Bird({
		sprite: birdSprite[Math.floor(random(birdSprite.length))],
		wing: audio.wing,
		initHeight: height / 2 + 70
	})

	this.pipes = new Pipes({
		sprites: pipeSprite[Math.floor(random(pipeSprite.length))],
		availableHeight: height - base.height + 50
	})

	this.init = () => {
		this.pipes.init()
	}

	this.setState = arg => {
		if (typeof arg === 'function') {
			this.state = { ...this.state, ...arg(this.state) }
		} else
			this.state = {
				...this.state,
				...arg
			}
	}

	this.addPoint = () => {
		this.setState(prevState => {
			prevState.points += 1
			return prevState
		})
		audio.point.play()
	}

	this.start = () => {
		this.bird.jump()
		this.setState({ stage: 'in-game' })
	}

	this.gameover = () => {
		audio.hit.play()
		this.setState({ gameover: true, stage: 'gameover' })
		audio.die.play()
	}

	this.update = () => {
		switch (this.state.stage) {
			case 'welcome':
				this.background.update()
				this.base.update()
				break
			case 'in-game':
				this.background.update()
				if (!this.state.gameover) {
					this.pipes.update()
					this.base.update()
					this.pipes.checkCollisionsAndPoints(this, this.addPoint)
				}
				if (!this.bird.on(this.base, 20)) this.bird.update()
				else this.gameover()
				break
			case 'gameover':
				if (!this.bird.on(this.base, 20)) this.bird.update()
				break
		}
	}

	this.render = () => {
		const isOnGround = this.bird.on(this.base, 20)
		this.background.render()
		switch (this.state.stage) {
			case 'welcome':
				push()
				imageMode(CENTER)
				image(welcome, width / 2, height / 2)
				pop()
				this.bird.render({ flap: true })
				break
			case 'in-game':
				this.pipes.render()
				this.bird.render({ flap: true })
				this._renderPoints()
				break
			case 'gameover':
				this.pipes.render()
				this.bird.render({ flap: !isOnGround })
				this._renderPoints(isOnGround ? height / 2 - 30 : 100)
				if (isOnGround) {
					push()
					imageMode(CENTER)
					image(gameover, width / 2, height / 2 - 100)
					pop()
				}
				break
		}
		this.base.render()
	}

	this._renderPoints = (y = 100) => {
		push()
		const numStr = this.state.points.toString()
		let totalWidth = 0
		for (let i = 0; i < numStr.length; i++)
			totalWidth += numbers[numStr.charAt(i) - '0'].width
		let x = (width - totalWidth) / 2
		for (let i = 0; i < numStr.length; i++) {
			image(numbers[numStr.charAt(i) - '0'], x, y)
			x += numbers[numStr.charAt(i) - '0'].width
		}
		pop()
	}

	this.reset = () => {
		this.setState({
			points: 0,
			gameover: false,
			stage: 'welcome'
		})

		this.pipes.reset()
		this.pipes.setSprites(pipeSprite[Math.floor(random(pipeSprite.length))])

		this.bird.reset()
		this.bird.setSprite(birdSprite[Math.floor(random(birdSprite.length))])

		this.background.reset()
		this.background.setSprite(background[Math.floor(random(background.length))])

		this.base.reset()

		this.pipes.init()
	}
}
