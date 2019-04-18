import ResponseCode from "../helper/ResponseCode";

let jwt = require('jsonwebtoken');
import config from '../config/config';

function error(res, code, message) {
    return res.status(code).send({
        "message": message,
        "code": ResponseCode.ACCESS_DENIED,
        'data': ''
    });
}

const middleware = {
    async checkToken(req, res, next) {
        try {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (token) {
                if (token.startsWith('Bearer ')) {
                    // Remove Bearer from string
                    token = token.slice(7, token.length);
                }

                //decode token

                let result = jwt.verify(token, config.secret);
                req.jwt = result;
                next();
            } else {
                error(res, 403, 'Token is not supplied');
            }

        } catch (e) {
            console.error(e);
            console.log('- error check token -');
            error(res, 401, 'Token is not valid');
        }
    }
};

export default middleware;