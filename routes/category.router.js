const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.getCategories)
router.post('/create', categoryController.createCategory)
router.get('/:id/edit', categoryController.editCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router;