"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var challan_1 = require("./controllers/challan");
var user_1 = require("./controllers/user");
var citizen_1 = require("./controllers/citizen");
var middlewares_1 = require("./middlewares");

var path = require('path');

function setRoutes(app) {
    var router = express.Router();
    var challanCtrl = new challan_1.default();
    var userCtrl = new user_1.default();
    var citizenCtrl = new citizen_1.default();
    var middleWare = new middlewares_1.default();
    router.route('/user/:id').put(middleWare.hash);


    // challans
    router.route('/events').get(challanCtrl.getAll);
    router.route('/events/count').get(challanCtrl.count);
    router.route('/events/processpay').post(challanCtrl.processPay);
    router.route('/event').post(challanCtrl.insert);
    router.route('/event/:id').get(challanCtrl.get);
    router.route('/event/:id').put(challanCtrl.update);
    router.route('/event/insert/:id').post(challanCtrl.insert);
    router.route('/event/:id').delete(challanCtrl.delete);
    router.route('/events/confirmpay/:id').put(challanCtrl.confirmPay);

    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    router.route('/register').post(userCtrl.register)
    
    /* citizens */
    router.route('/citizens').get(citizenCtrl.getAll);
    router.route('/citizens/count').get(citizenCtrl.count);
    router.route('/citizen').post(citizenCtrl.insert);
    router.route('/citizen/:id').get(citizenCtrl.get);
    router.route('/citizen/:id').put(citizenCtrl.update);
    router.route('/citizen/:id').delete(citizenCtrl.delete);

    // Apply the routes to our applichallanion with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map