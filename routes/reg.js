/**
 * 用户注册
 */
 var express = require('express');

 var router = express.Router();

 var mysql      = require('mysql');

 var connection = mysql.createConnection({

  host     : 'localhost',

  user     : 'root',

  password : 'root',

  database : 'cms'
});
 connection.connect();

router.get('/', function(req, res, next) {


    connection.query('CREATE TABLE cms_users(id int,user varchar(16),password varchar(16))', function (error, results) {

        if (error) throw error;

        res.json(results)

    });


});

module.exports = router;