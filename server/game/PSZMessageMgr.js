var ws = require("nodejs-websocket")

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
                console.log('游戏服务器连接成功:', result);
            })
        })

        server.listen(port);
        console.log('游戏服务器启动! 端口号:' + port);
    }

    recvMessage(type, cData, client) {
        switch (type) {
            // case 'CreateRoom':
            //     this.responseCreateRoom(type, cData, client);
            //     break
        }
    }
}

module.exports = PSZMessageMgr.getInstance();