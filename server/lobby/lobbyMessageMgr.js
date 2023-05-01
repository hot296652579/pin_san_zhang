var ws = require("nodejs-websocket")

class lobbyMessageMgr {
    static getInstance() {
        if (!lobbyMessageMgr.instance) {
            return lobbyMessageMgr.instance = new lobbyMessageMgr();
        } else {
            return lobbyMessageMgr.instance;
        }
    }

    creatorServer(port) {
        let server = ws.createServer((client) => {
            client.on('text', (result) => {
                console.log('客户端发来消息:', result);
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
                console.log('开启连接:', result);
            })
        })

        server.listen(port);
        console.log('大厅服务器启动! 端口号:' + port);
    }

    recvMessage(type, cData, client) {
        switch (type) {
            case 'CreateRoom':
                this.responseCreateRoom(type, cData, client);
                break
        }
    }

    async responseCreateRoom(type, cData, client) {
        let roomId = await this.getNewRoomId();
        console.log('cData:', cData);
    }

    async getNewRoomId() {
        return new Promise((resolve, reject) => {
            this.getValidRoomId(resolve);
        })
    }

    getValidRoomId(callback) {
        let str = '';
        for (let i = 0; i < 6; i++) {
            if (i === 0) {
                let random = Math.round(Math.random() * 9);
                if (random != 0) {
                    str += random;
                    continue
                } else {
                    str += 1;
                    continue
                }
            }
            str += Math.round(Math.random() * 9);
        }

        global.loginServerMgr.lobbyDb.requesonRoomId(str * 1).then((result) => {
            if (result.length > 0)
                this.getValidRoomId(callback);
            else
                callback && callback(str);
        }).catch((err) => {
            this.getValidRoomId(callback);
        })
    }

    sendMessage(type, data, client) {
        const message = {
            type,
            data
        }

        client.send(JSON.stringify((message)));
    }
}

module.exports = lobbyMessageMgr.getInstance();