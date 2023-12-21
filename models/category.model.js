const db = require("../utils/db");
const Product = require("./product.model");

const tbName = "Categories"

module.exports = class Category { 
    constructor({id, name}) {
        if (id) this.CatID = id
        this.CatName = name
    }

    static async getAll() {
        return await db.getAll(tbName, "CatID")
    }

    static async insert(category) {
        return await db.insert(tbName, category, "CatID")
    }

    static async getMaxID() {
        const data = await db.db.any(`select max("CatID") from "${tbName}"`)
        return data[0]?.max
    }

    static async findOne(id) {
        return await db.findOne(tbName, `"CatID" = ${id}`)
    }

    static async update(id, category) {
        return await db.update(tbName, category, `"CatID" = ${id}`)
    }

    static async delete(id) {
        const products = await Product.find(id)
        if (products.length > 0) {
            await db.db.any(`delete from "Products" where "CatID" = ${id}`)
        }
            
        return await db.delete(tbName, `"CatID" = ${id}`)
    }
}
