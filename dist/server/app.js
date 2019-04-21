const expressApp = require('express');
const app = expressApp();
const socketServer = require('http').Server(app);
const ioApp = require('socket.io').listen(socketServer);
const next = require('next');
const routes = require("./routes/routes");
const path = require("path");
const serveStatic = require("serve-static");
//const dev = process.env.NODE_ENV !== 'production';
const dev = false;
const port = process.env.PORT || 9000;
//const ROOT_URL = dev ? `http://localhost:${port}` : `http://localhost:${port}`;
const nextApp = next({
    dev
});
const nextHandler = nextApp.getRequestHandler();
// Nextjs's app prepared
nextApp.prepare().then(() => {
    console.log("test");
    app.use(expressApp.json());
    // app.use(function (req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });
    app.use(routes);
    //console.log("serve static: ", path.join(__dirname, 'public'));
    app.use(serveStatic(path.join(__dirname, 'public')));
    app.get('*', (req, res) => {
        //    console.log ("get something", req);
        return nextHandler(req, res);
    });
    // starting express app
    //let socketapp = app.listen(port);
    //  io = require('socket.io').listen(socketapp);
    //console.log ("io: ", io);
    console.log("app listening on port ", port);
    // app.listen(port, (err) => {
    //   if (err) throw err;
    //   console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
    // });
    socketServer.listen('9000', () => {
        console.log('socket listening on port 9000');
    });
    //const app = require("../app.js");
    //console.log("app.io: ", app.io);
}).catch((err) => {
    console.log("app prepare error: ", err);
});
ioApp.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('my other event', function (data) {
        console.log("other event", data);
    });
});
module.exports.sendSomething = function (aoContacts) {
    console.log("sending something: ", JSON.stringify(aoContacts));
    ioApp.emit('news', {
        something: JSON.stringify(aoContacts)
    });
};
//# sourceMappingURL=app.js.map