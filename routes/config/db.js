/*
 *数据库配置
 */
let mysql = require('mysql');

class db{

    constructor(){

        let connection = mysql.createConnection({

            host: 'localhost', //地址

            user: 'root', //用户名

            password: 'root', //密码

            database: 'cms' //库
        });

        connection.connect();

        return connection;
    }
}

module.exports = {db : new db()};