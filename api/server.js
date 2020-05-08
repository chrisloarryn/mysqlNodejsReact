// Related to express
// const pool = require('./db/database');
// const dotenv = require('dotenv')
const { loadConfig } = require('./config/config')
const sequelize = require('./db/mysql')
// process.on('uncaughtException', err => {
//     console.log(`▶️ ${err} ◀️`)
//     console.log(`UNCAUGHT REJECTION! 💥 Shutting down...`)
//     process.exit(1) // 0 success, 1 failure
// })
const app = require('./app')

// Connect to db
loadConfig()

sequelize.authenticate().then(() => {
    console.log('connected')
}).catch(err => {
    console.log('Unable to connect to database:', err)
})
console.log(process.env.PORT)

// console.log(process.env)
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`App running on port ${port}... 😊`)
})

// process.on('unhandledRejection', err => {
//     console.log(`▶️ ${err.name}: ${err.message} ◀️`)
//     console.log(`UNHANDLED REJECTION! 💥 Shutting down...`)
//     server.close(() => {
//         process.exit(1) // 0 success, 1 failure
//     })
// })
