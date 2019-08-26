"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var routes_1 = require("./routes");
var app = express();
// const server = require("http").createServer(app);


// const http = require('http').Server(app);
// const io = require("socket.io")(http);
// const port = process.env.PORT || 3000

// io.on("connection", socket => {
//     console.log("a user connected :D");
//     socket.on("message", msg => {
//         //Write Your Code Blow to Save a message in Database.
//         //Blow is the Data As Message Received 
//         //msg = { 
//         // 	msg: 'user Input message',
//         // 	name: 'User"s First Name',
//         // 	id: 1
//         //}
//       console.log(msg);
//       io.emit("message", msg);
//     });
//   });
  
//   //For Development Un Comment blow Code.
//   server.listen(process.env.PORT, () => console.log("server running on port:" + process.env.PORT));

// app.listen(port, () => console.log("server running on port:" + port));

exports.app = app;
dotenv.load({
    path: '.env'
});
app.set('port', (process.env.PORT || 3000));
app.use('/',function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
      }
      else {
        next();
      }
});
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true

}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
let mongodbURI = process.env.MLAB_URI;

mongoose.Promise = global.Promise;
var mongodb = mongoose.connect(mongodbURI, {
    useMongoClient: true
});
mongodb
    .then(function (db) {
        console.log('Connected to MongoDB on', db.host + ':' + db.port);
        routes_1.default(app);
        app.get('/*', function (req, res) {
            res.status(200).json("TCS server is working")
        });
        if (!module.parent) {
            app.listen(app.get('port'), function () {
                console.log('TCS server listening on port ' + app.get('port'));
            });
        }
    })
    .catch(function (err) {
        console.error(err);
    });