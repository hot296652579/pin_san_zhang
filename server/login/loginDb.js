const db = require('../comment/Db');

class loginDb extends db{
    static getInstance(){
        if(!loginDb.instance){
            return loginDb.instance = new loginDb();
        }
        else{
            return loginDb.instance;
        }
    }

    constructor() {
        super();
        this.connectSQL();
    }

    getUserById(id){
        return new Promise((resolve,reject)=>{
            let sql = `select *from user_info where user_id = ${id}`;
            this.myQuery(sql,resolve,reject);
        })
    }
}

global.loginServerMgr.loginDb = loginDb.getInstance();
module.exports = loginDb;