const createError = require('http-errors');
const express = require('express');
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const debug = require('debug')('client:server');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
let app = express();
const i18n = require("i18n");
const config = require('./configs/app.cfg');
const route = require('./routes/index');
// const ecsFormat = require('./middlewares/request-logger');

app.use(session({
    secret: '!@#$%^&*()',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000}
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(cors({
    exposedHeaders: ['Content-Disposition'],
}));

// logger
// app.use(morgan('":remote-addr" ":referrer" ":user-agent" ":method :url HTTP/:http-version" :status :res[content-length] :response-time'));
// app.use(morgan(ecsFormat('":remote-addr" :remote-user [:date[iso]] ":referrer" ":user-agent" ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')));


// app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser());

app.use(fileUpload({
    limits: {fileSize: 5 * 1024 * 1024}, // bytes
}));

// language
i18n.configure({
    locales: ['vi', 'en'],
    directory: __dirname + '/storage/locales',
    defaultLocale: 'vi',
    objectNotation: true
});
app.use(i18n.init);

app.use(`${config.apiPrefix}/uploads`, express.static(path.join(__dirname, 'storage', 'uploads')));

app.use(config.apiPrefix, route)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    console.log('------ERROR-----', err);
    const {status, message} = err;
    const {originalUrl, method, ip} = req;

    res.status(status || 500);
    // res.locals.message = err.message;
    // res.locals.Error = req.app.get('env') === 'development' ? err : {};
    const error = req.app.get('env') === 'development' ? err : {};

    console.error(`${new Date()} - ${status || 500} - ${message} - ${originalUrl} - ${method} - ${ip}`);

    res.json(error);
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port || process.env.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const {code, status} = error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (code) {
        case 'EACCES':
            console.error(`${status || 500} - ${code} - ${bind + ' requires elevated privileges'}`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${status || 500} - ${code} - ${bind + ' ris already in use'}`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log(addr);
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

module.exports = app;
