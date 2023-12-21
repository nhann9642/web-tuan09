const db = require("../utils/db");

const tbName = 'Users'
module.exports = class User { 
    constructor({username, password, name, email, dob, permission}) {
        this.Username = username;
        this.Password = password;
        this.Name = name || '';
        this.Email = email || '';  
        this.DOB = dob || new Date();
        this.Permission = permission || 1;
    }

    static async getAll() {
        return await db.getAll(tbName)
    }

    static async insert(user) {
        return await db.insert(tbName, user, "ID")
    }

    static async findOne(username) {
        return await db.findOne(tbName, `"Username" = '${username}'`)
    }
}
