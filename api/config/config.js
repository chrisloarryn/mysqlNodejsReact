'use strict';

const path = require('path')
const dotenv = require('dotenv')

// console.log('load node process env', process.env.NODE_ENV)

const loadConfig = () => {
    if (process.env.NODE_ENV === 'prod') {
        dotenv.config({ path: path.join(__dirname, './.env-prod') })
        console.log('charge production configs')
    } else if (process.env.NODE_ENV === 'staging') {
        dotenv.config({ path: path.join(__dirname, './.env-staging') })
        console.log('charge staging configs')
    } else {
        dotenv.config({ path: path.join(__dirname, './.env') })
        // dotenv.config({ path: './config.env' })
        // console.log('charge development configs')
    }
}

module.exports = { loadConfig }