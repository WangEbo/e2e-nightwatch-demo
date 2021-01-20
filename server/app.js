const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express()

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'testdemo' // 数据库
})
connection.connect() // 开启与数据库连接

//普通 form-url解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//application/json contenty-type 解析
const JsonParser = bodyParser.json();
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
//登录
app.post('/login', JsonParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `select * from user_table where username = '${username}' and password = '${password}'`;
    connection.query(sql, function (err, result) {
        console.log(result)
        if (err || result.length == 0) {
            res.status(200),
                res.json({
                    success: 0,
                    err: err
                })
        } else {
            res.status(200),
                res.json({
                    success: 1,
                    data: result[0]
                })
        }
    });
})
app.get('/productList', (req, res) => {
    var keywords = req.query.keywords;

    // 定义查询sql语句
    var loginsql = `select * from product_table where product_name like "%${keywords || ''}%"`;

    // 执行查询
    connection.query(loginsql, (err, result) => {
        if (err) {
            console.log('err message:', err)
            res.json(err)
        } else {
            res.json({
                success: 1,
                data: result
            })
        }
    })
})

app.listen('8089', () => console.log('app is running on 127.0.0.1:8089'))