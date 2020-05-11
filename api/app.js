const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const bearerToken = require('express-bearer-token');
const cors = require('cors')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const userRouter = require('./routes/userRoutes')
const ticketRouter = require('./routes/ticketRoutes')

const app = express()
//  app.enable('trust proxy')
//  app.options('*', cors())
app.use(cors());
  
//  1) GLOBAL MIDDLEWARE
//  Set security HTTP headers
//  app.use(helmet())

//  Development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//  Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour to milliseconds
    message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
// bodyParser is not needed, express.raw() === bodyParser.raw()
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

//  app.use(cors())
/**
 * Headers
 */
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('X-Powered-By', 'Express')
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Transfer-Encoding', 'chunked')
    next()
})

//  Data sanitization against XXS (cross site scripting attacks)
//  app.use(xss())
//  app.use(bearerToken());

//  Serving static files
//  app.use(express.static(`${__dirname}/public`))

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    // console.log(req.headers);
    // console.log(res.locals[0]);
    next()
})
app.use(compression())
// app.use(require('./config/headers'))


// 2) ROUTES
app.use('/api/v1/tickets', ticketRouter)
app.use('/api/v1/users', userRouter)
//app.use('/api/v1/reviews', reviewRouter)


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
