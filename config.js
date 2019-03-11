module.exports = {
    port: 3000,
    rootPathname: "",
    mysql: {
        host: "localhost",
        port: 3306,
        user: "root",
        db: "cAuth",
        pass: "12345",
        char: "utf8mb4",
    },
    // token 密钥
    tokenSecret: "my_token",
}