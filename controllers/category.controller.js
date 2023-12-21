const Category = require('../models/category.model');

module.exports = {
    //GET /categories
    getCategories: async (req, res) => {
        const username = req.session.username;

        const categories = await Category.getAll();

        res.render('category', { categories, username });
    },

    //POST /categories/create
    createCategory: async (req, res) => {
        const { name } = req.body;
        const id = await Category.getMaxID() + 1;

        await Category.insert(new Category({ id, name }));

        res.redirect('/category');
    },

    //GET /categories/:id/edit
    editCategory: async (req, res) => {
        const id = req.params.id;
        const category = await Category.findOne(id);

        res.render('edit-category', { category });
    },

    //PUT /categories/:id
    updateCategory: async (req, res) => {
        const id = req.params.id;
        const { name } = req.body;

        await Category.update(id, new Category({ id, name }));

        res.redirect('/category');
    },

    //DELETE /categories/:id
    deleteCategory: async (req, res, next) => {
        try {
            const id = req.params.id;
            await Category.delete(id);
            res.redirect('/category');
        } catch (error) {
            next(error);
        }

    }
}