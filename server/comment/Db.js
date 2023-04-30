const  mysql = require('mysql')
class Db{
    constructor() {
    }

    connectSQL(){
        let sql = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'Jcw952766',
            database:'pin_san_zhang'
        })

        sql.connect();
        this._mysql = sql;
        console.log('数据库连接成功!')
    }

    //查询数据库方法
    myQuery(sql,resolve,reject){
        this._mysql.query(sql,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    }
}

module.exports = Db;