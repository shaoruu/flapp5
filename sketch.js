let cvsWrapper = null
let assets = {}
let game

const gameScale = 1.5

// assets from https://github.com/sourabhv/FlapPyBird
function preload() {
	assets['numbers'] = []
	for (let i = 0; i < 10; i++)
		assets.numbers[i] = loadImage(`assets/sprites/${i}.png`, img =>
			scaleImage(img, gameScale)
		)

	assets['background'] = ['day', 'night'].map(name =>
		loadImage(`assets/sprites/background-${name}.png`, img =>
			scaleImage(img, gameScale)
		)
	)

	assets['bird'] = ['blue', 'red', 'yellow'].map(color =>
		['upflap', 'midflap', 'downflap'].map(flap =>
			loadImage(`assets/sprites/${color}bird-${flap}.png`, img =>
				scaleImage(img, gameScale)
			)
		)
	)

	let keys = ['gameover', 'message', 'base']
	keys.forEach(
		key =>
			(assets[key] = loadImage(`assets/sprites/${key}.png`, img =>
				scaleImage(img, gameScale)
			))
	)

	assets['pipes'] = ['red', 'green'].map(color => {
		return {
			UPPER: loadImage(`assets/sprites/pipe-${color}-upper.png`, img =>
				scaleImage(img, gameScale)
			),
			LOWER: loadImage(`assets/sprites/pipe-${color}-lower.png`, img =>
				scaleImage(img, gameScale)
			)
		}
	})

	const audioFiles = ['die', 'hit', 'point', 'swoosh', 'wing']

	assets['audio'] = {}
	audioFiles.forEach(
		title => (assets['audio'][title] = loadSound(`assets/audio/${title}.ogg`))
	)
}

function setup() {
	cvsWrapper = document.getElementById('canvasWrapper')

	const myCanvas = createCanvas(cvsWrapper.offsetWidth, cvsWrapper.offsetHeight)
	myCanvas.parent('canvasWrapper')

	game = new Game({
		welcome: assets.message,
		birdSprite: assets.bird,
		pipeSprite: assets.pipes,
		background: assets.background,
		base: assets.base,
		numbers: assets.numbers,
		gameover: assets.gameover,
		audio: assets.audio
	})

	game.init()

	background(0)
}

function draw() {
	background(0)
	game.update()
	game.render()
}

function keyPressed() {
	pressHandler()
}

function mousePressed() {
	pressHandler()
}
