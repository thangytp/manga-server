const express = require('express');
const app = express();
const UserRoute = express.Router();
import userController from '../../controller/v1/user/user';

// Require Post model in our routes module
UserRoute.get('/', userController.list);

UserRoute.get('/test', userController.test);

UserRoute.post('/create', userController.create);

module.exports = UserRoute;