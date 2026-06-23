const express = require('express')
const postController = require('./controllers/postController')
const adminController = require('./controllers/adminController')

const router = express.Router()

router.get('/', postController.index)
router.get('/posts/:id', postController.show)
router.get('/admin', adminController.showAdminPage)
router.get('/admin/create', adminController.showCreatePage)
router.post('/admin/create', adminController.createPost)
router.get('/admin/edit/:id', adminController.showEditPage)
router.post('/admin/update/:id', adminController.updatePost)
router.post('/admin/delete/:id', adminController.deletePost)

module.exports = router