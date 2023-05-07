var ws = require("nodejs-websocket")
const roomMgr = require('./roomMgr');

class PSZMessageMgr {
    static getInstance() {
        if (!PSZMessageMgr.instance) {
            return PSZMessageMgr.instance = new PSZMessageMgr();
        } else {
            return PSZMessageMgr.instance;
        }
    }

    creatorServer(port) {
        let server = ws.createServer((client) => {
            client.on('text', (result) => {
                console.log('游戏服务器 客户端发来消息:', result);
                const json = JSON.parse((result));
                const {type, data} = json;
                this.recvMessage(type, data, client);
            })

            client.on('error', (result) => {
                console.log('连接失败:' + result);
            })

            client.on('close', (result) => {
                console.log('连接断开:' + result);
            })

            client.on('connect', (result) => {
                console.log('游戏服务器连接成功:', result);
            })
        })

        server.listen(port);
        console.log('游戏服务器启动! 端口号:' + port);
    }

    recvMessage(type, cData, client) {
        switch (type) {
            case 'requestRoomInfo':
                this.onRequestRoomInfo(type, cData, client);
                break
        }
    }

    onRequestRoomInfo(type, cData, client) {
        console.log('请求房间信息:', type, cData);

        let roomIsExist = false;
        if (roomMgr.roomList.length === 0) {
            roomIsExist = true;
            global.PSZServerMgr.PSZDb.getRoomInfoById(cData['roomId']).then((result) => {
                roomMgr.createRoom(type, result[0], client);
                let sendData = {
                    type,
                    data: result[0]
                }
                this.sendMessage(type, sendData, client);
            }).catch((err) => {
                console.log('请求房间信息失败:', err);
            })
        }
    }

    sendMessage(type, data, client) {
        const message = {
            type,
            data
        }

        client.send(JSON.stringify((message)));
    }
}

module.exports = PSZMessageMgr.getInstance();