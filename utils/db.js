const { TableName, as } = require('pg-promise');

const pgp = require('pg-promise')({
  capSQL: true // generate capitalized SQL

});

const cn = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "123456",
};

const db = pgp(cn);

module.exports = {
  db,

  getAll: async (tbName, orderBy) => {
    let query = `select * from "${tbName}"`
    if (orderBy)
      query += ` order by "${orderBy}"`

    const data = await db.any(query);

    return data;
  },

  insert: async (tbName, entity, columnReturn = 'id') => {
    const query = pgp.helpers.insert(entity, null, tbName)
    const data = await db.one(query + ` RETURNING "${columnReturn}"`)

    return data
  },

  findOne: async (tbName, condition) => {
    const query = `select * from "${tbName}" where ${condition}`

    return await db.oneOrNone(query);
  },

  find: async (tbName, condition) => {
    const query = `select * from "${tbName}" where ${condition}`

    return await db.any(query);
  },

  update: async (tbName, entity, condition) => {
    const query = pgp.helpers.update(entity, null, tbName) + ` where ${condition}`

    return await db.none(query);
  },

  delete: async (tbName, condition) => {
    const query = `delete from "${tbName}" where ${condition}`

    return await db.none(query);
  },
};
