"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var event_1 = require("./controllers/event");
var activity_1 = require("./controllers/activity");
var user_1 = require("./controllers/user");
var citizen_1 = require("./controllers/citizen");
var middlewares_1 = require("./middlewares");
var chat_1 = require('./controllers/chat')

var path = require('path');

function setRoutes(app) {
    var router = express.Router();
    var eventCtrl = new event_1.default();
    var userCtrl = new user_1.default();
    var citizenCtrl = new citizen_1.default();
    var activityCtrl = new activity_1.default();
    var middleWare = new middlewares_1.default();
    var chatCtrl = new chat_1.default();
    router.route('/user/:id').put(middleWare.hash);


    // events
    router.route('/events').get(eventCtrl.getAll);
    router.route('/events/count').get(eventCtrl.count);
    router.route('/events/processpay').post(eventCtrl.processPay);
    router.route('/event').post(eventCtrl.insert);
    router.route('/event/:id').get(eventCtrl.get);
    router.route('/event/:id').put(eventCtrl.update);
    router.route('/event/insert/:id').post(eventCtrl.insert);
    router.route('/event/:id').delete(eventCtrl.delete);
    router.route('/events/confirmpay/:id').put(eventCtrl.confirmPay);

    // activities
    router.route('/activities').get(activityCtrl.getAll);
    router.route('/activities/count').get(activityCtrl.count);
    router.route('/activity').post(activityCtrl.insert);
    router.route('/activity/:id').get(activityCtrl.get);
    router.route('/activity/:id').put(activityCtrl.update);
    router.route('/activity/insertInEvent/:id').post(activityCtrl.insertInEvent);
    router.route('/activity/insertInUser/:id').post(activityCtrl.insertInUser);
    router.route('/activity/:id').delete(activityCtrl.delete);

    // chat
    router.route('/chats').get(chatCtrl.getAll);
    router.route('/chats/count').get(chatCtrl.count);
    router.route('/chat').post(chatCtrl.insert);
    router.route('/chat/:id').get(chatCtrl.get);
    router.route('/chat/:id').put(chatCtrl.update);
    router.route('/chat/insert/:id').post(chatCtrl.insert);
    router.route('/chat/:id').delete(chatCtrl.delete);

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