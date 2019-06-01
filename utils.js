const scaleImage = (image, scale) => {
	image.resize(image.width * scale, image.height * scale)
	return image
}

const pressHandler = () => {
	switch (game.state.stage) {
		case 'welcome':
			game.start()
			break
		case 'in-game':
			if (!game.state.gameover) game.bird.jump()
			break
		case 'gameover':
			game.reset()
			break
	}
}
