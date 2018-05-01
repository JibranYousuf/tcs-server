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
        res.send(200);
      }
      else {
        next();
      }
});
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser({
    limit: '50mb'
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
            res.send("TCS server is working")
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