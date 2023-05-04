const db = require('../comment/Db');

class PSZDb extends db {
    static getInstance() {
        if (!PSZDb.instance) {
            return PSZDb.instance = new PSZDb();
        } else {
            return PSZDb.instance;
        }
    }

    constructor() {
        super();
        this.connectSQL();
    }

    getRoomInfoById(id) {
        return new Promise((resolve, reject) => {
            let sql = `select *from room_info where room_id = ${id}`;
            this.myQuery(sql, resolve, reject);
        })
    }
}

global.PSZServerMgr.PSZDb = PSZDb.getInstance();
module.exports = PSZDb;