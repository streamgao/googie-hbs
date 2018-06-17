const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/* -------------socket------------- */
const WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({
        port: 8080
    });

// let connectedClients=[];
let wordsBuffer = [];
wordsBuffer = ['{"textFly":"hi"}', '{"textFly":"this"}',  '{"textFly":"is"}', '{"textFly":"Googie"}'];
let INTERVAL = 100;
// const INTERVAL_COMMAND = '***';

wss.on('connection', (ws, req) => {
  	const ip = req.connection.remoteAddress;
    console.log('new connection ip: ', ip);
    // connectedClients.push(ip);
  	ws.on('message', message => {
        const msg = JSON.parse(message);
        // console.log('mes coming', message);
        // const allClients = wss.clients;
        if (msg.sessionInstruction && msg.sessionInstruction.length) {
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
            // for (var i = 1; i < allClients.length; i++) {
            //    if (allClients[i] !== ws && allClients[i].readyState === WebSocket.OPEN) {
            //        allClients[i].send(COMMAND2);
            //    }
            // } // don't send you yao
        } else if (msg.interval && msg.interval.length) {
            INTERVAL = parseInt(msg.interval) || 10;
            console.log(INTERVAL, '..interval...Change TO ', msg);

        } else if (msg.textFly && msg.textFly.length) {
            // wordsBuffer.push(msg.textFly);
            wordsBuffer.push(message);
        }
  	});
});

// limit, up speed is INTERVAL ms
setInterval(() => {
    if (wordsBuffer.length) {
        console.log('words buffer: ', wordsBuffer);
        const wordToSend = wordsBuffer.shift();
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(wordToSend);
            }
        });
        /*
        const client = wss.clients[0];
        if (client.readyState === WebSocket.OPEN) {
            client.send(wordToSend);
        }
        */
    }
}, INTERVAL);

module.exports = app;
