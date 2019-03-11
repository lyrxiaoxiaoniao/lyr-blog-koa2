const mysql = require('mysql')
const config = require('../config')

// 首先我们要在数据库创建一个库

// 创建连接池
const pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.db,
    port: config.mysql.port
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        // 使用连接
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                // 使用连接执行查询
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    //连接不再使用，返回到连接池
                    connection.release()
                })
            }
        })
    })

}
// 用户表单
const users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NOT NULL COMMENT '头像',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( id )
    );`

// 创建表单
const createTable = (sql) => {
    return query(sql, [])
}
createTable(users)
