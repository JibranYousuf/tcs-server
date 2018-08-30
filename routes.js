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
    router.route('/challans').get(challanCtrl.getAll);
    router.route('/challans/count').get(challanCtrl.count);
    router.route('/challan').post(challanCtrl.insert);
    router.route('/challan/:id').get(challanCtrl.get);
    router.route('/challan/:id').put(challanCtrl.update);
    router.route('/challan/insert/:id').post(challanCtrl.insert);
    router.route('/challan/:id').delete(challanCtrl.delete);
    router.route('/challans/confirmpay/:id').put(challanCtrl.confirmPay);
    router.route('/challans/processpay').post(challanCtrl.procssPay)

    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    

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