const db = require('../comment/Db');

class lobbyDb extends db {
    static getInstance() {
        if (!lobbyDb.instance) {
            return lobbyDb.instance = new lobbyDb();
        } else {
            return lobbyDb.instance;
        }
    }

    constructor() {
        super();
        this.connectSQL();
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            let sql = `select *from user_info where user_id = ${id}`;
            this.myQuery(sql, resolve, reject);
        })
    }

    requesonRoomId(id) {
        return new Promise((resolve, reject) => {
            let sql = `select *from room_info where room_id = ${id}`;
            this.myQuery(sql, resolve, reject);
        })
    }

    saveRoomInfo(roomId, data) {
        return new Promise((resolve, reject) => {
            console.log('createid:', data.createId);
            let sql = `insert into room_info(room_id,create_id,game_numbers,jiesan)values(${roomId},${data.createId},${data.gameNumbers},${data.isQuanPiaoJieSan})`;
            this.myQuery(sql, resolve, reject);
        })
    }
}

global.loginServerMgr.lobbyDb = lobbyDb.getInstance();
module.exports = lobbyDb;