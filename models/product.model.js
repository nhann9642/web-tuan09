const db = require("../utils/db");

const tbName = "Products"
module.exports = class Product { 
    constructor() {
        
    }

    static async getAll() {
        return await db.getAll(tbName)
    }

    static async find(CatID) {
        return await db.find(tbName, `"CatID" = '${CatID}'`)
    }
}
