var ws = require("nodejs-websocket")
class loginMessageMgr{
    static getInstance(){
        if(!loginMessageMgr.instance){
            return loginMessageMgr.instance = new loginMessageMgr();
        }
        else{
            return loginMessageMgr.instance;
        }
    }

    creatorServer(port){
        let server = ws.createServer((client)=>{
            client.on('text',(result)=>{
                console.log('客户端发来消息:' , result);
                const json = JSON.parse((result));
                const {type,data} = json;
                this.recvMessage(type,data,client);
            })

            client.on('error',(result)=>{
                console.log('连接失败:' + result);
            })

            client.on('close',(result)=>{
                console.log('连接断开:' + result);
            })

            client.on('connect',(result)=>{
                console.log('开启连接:',result);
            })
        })

        server.listen(port);
        console.log('服务器启动! 端口号:' + port);
    }

    recvMessage(type,data,client){
        switch (type) {
            case 'Login':
                this.responseUserInfoById(data.id).then((result)=>{
                    this.sendMessage(type,result,client);
                }).catch(()=>{
                    this.sendMessage(type,{err:'未获取到玩家信息数据'},client);
                })
                break
        }
    }

    sendMessage(type,data,client){
        const message = {
            type,
            data
        }

        client.send(JSON.stringify((message)));
    }

    responseUserInfoById(id){
        return new Promise((resolve,reject)=>{
            global.loginServerMgr.loginDb.getUserById(id).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            })
        })
    }
}

module.exports = loginMessageMgr.getInstance();