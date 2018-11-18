var express = require('express');
var router = express.Router();


let connect = require('./config/db.js');

let db = connect.db;

/* GET home page. */
router.get('/', function(req, res, next) {

  //res.render('login', { title: '用户登录' });

    db.query('SELECT * FROM cms_users', function (error, results) {

    if (error) throw error;

        res.json(results)

    });


});

module.exports = router;
