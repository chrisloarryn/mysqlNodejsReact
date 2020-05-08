module.exports = {
    database: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || root,
        password: process.env.MYSQL_PASSWORD || '4m1g0s2020',
        database: process.env.MYSQL_DATABASE || 'reactapp',
        connectionLimit: 10
    }

};