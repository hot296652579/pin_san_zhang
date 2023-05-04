const Room = require('./room');

class RoomMgr {
    static getInstance() {
        if (!RoomMgr.instance) {
            return RoomMgr.instance = new RoomMgr();
        } else {
            return RoomMgr.instance;
        }
    }

    roomList = [];

    createRoom(type, data, client) {
        const room = new Room(data, client);
        this.roomList.push(room);
    }
}

module.exports = RoomMgr.getInstance();