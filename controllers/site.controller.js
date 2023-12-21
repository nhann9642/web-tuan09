const Product = require('../models/product.model');
const Category = require('../models/category.model');

module.exports = {
    //GET /?productID=...
    getHome: async (req, res) => {
        const username = req.session.username;

        const categories = await Category.getAll();
        const { catID = 0 } = req.query;

        const products = catID === 0 ? await Product.getAll() : await Product.find(catID);
 
        const categoryName = catID === 0 ? 'All products'
            : categories.find(c => c.CatID == catID)?.CatName;

        res.render('home', { products, categories, username, categoryName });
    },
}