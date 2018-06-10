const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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
app.use('/users', usersRouter);

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
wordsBuffer = ['hi', 'this', 'is', 'googie'];
let INTERVAL = 1000;

const COMMAND1 = '-----command1-----';
const COMMAND2 = '-----command2-----';
const COMMAND3 = '-----command3-----';
const COMMAND4 = '-----command4-----';
const INTERVAL_COMMAND = '***';


wss.on('connection', (ws, req) => {
	const ip = req.connection.remoteAddress;
  console.log('ip....', ip);
  // connectedClients.push(ip);
	ws.on('message', (message) => {
 		console.log(message);
    const allClients = wss.clients;
    if (message === COMMAND1) {
        console.log('message, command1', message);
        // for (var i = 1; i < allClients.length; i++) {
        //    if (allClients[i] !== ws && allClients[i].readyState === WebSocket.OPEN) {
        //        allClients[i].send(COMMAND1);
        //    }
        // } // don't send to yao
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(COMMAND1);
            }
        });
    } else if (message === COMMAND2) {
        console.log('message, command2', message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(COMMAND2);
            }
        });
        // for (var i = 1; i < allClients.length; i++) {
        //    if (allClients[i] !== ws && allClients[i].readyState === WebSocket.OPEN) {
        //        allClients[i].send(COMMAND2);
        //    }
        // } // don't send you yao
    } else if (message === COMMAND3) {
        console.log('message, command3', message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(COMMAND3);
            }
        });
        // for (var i = 1; i < allClients.length; i++) {
        //    if (allClients[i] !== ws && allClients[i].readyState === WebSocket.OPEN) {
        //        allClients[i].send(COMMAND3);
        //    }
        // } // don't send to yao
    } else if (message === COMMAND4) {
        console.log('message, command4', message);
        // for (var i = 1; i < allClients.length; i++) {
        //    if (allClients[i] !== ws && allClients[i].readyState === WebSocket.OPEN) {
        //        allClients[i].send(COMMAND4);
        //    }
        // } // don't send to yao
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(COMMAND4);
            }
        });
    } else if (message.indexOf(INTERVAL_COMMAND) !== -1) {
        INTERVAL = parseInt(message.slice(3)) || 10;
    } else if (typeof message === 'string') {
        wordsBuffer.push(message);
    }
	});
});

// limit, up speed is INTERVAL ms
setInterval(() => {
    if (wordsBuffer.length) {
        console.log('words buffer: ', wordsBuffer);
        const wordToSend = wordsBuffer.shift();
        wss.clients.forEach(function each(client) {
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
