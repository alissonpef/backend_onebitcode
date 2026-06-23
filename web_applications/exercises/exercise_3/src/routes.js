const express = require('express')
const playlistsController = require('./controllers/playlists-controller')

const playlistsRouter = express.Router()

playlistsRouter.get('/', playlistsController.index)
playlistsRouter.get('/:id', playlistsController.show)
playlistsRouter.post('/', playlistsController.save)
playlistsRouter.put('/:id', playlistsController.update)
playlistsRouter.delete('/:id', playlistsController.delete)

playlistsRouter.post('/:id/musics', playlistsController.addMusic)
playlistsRouter.delete('/:playlistId/musics/:musicId', playlistsController.removeMusic)

module.exports = playlistsRouter