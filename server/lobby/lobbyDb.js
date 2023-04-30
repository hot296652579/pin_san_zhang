const db = require('../comment/Db');

class lobbyDb extends db{
    static getInstance(){
        if(!lobbyDb.instance){
            return lobbyDb.instance = new lobbyDb();
        }
        else{
            return lobbyDb.instance;
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

global.loginServerMgr.lobbyDb = lobbyDb.getInstance();
module.exports = lobbyDb;