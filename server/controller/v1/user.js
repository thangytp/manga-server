const crypto = require('crypto');
const { EXISTED_CODE, SUCCESS_CODE } = require('../../helper/ResponseCode');
import ResponseTemplate from '../../helper/ResponseTemplate';
// Require Post model in our routes module
import User from '../../models/User';

class UserController {
	async list(req, res) {
		res.status(200).send('yyyyy');
	}
	async test(req, res) {
		console.log('test here');
		res.status(200).send(ResponseTemplate.success({"message": "Test controller", "data": "[]"}));
	}
	async create(req, res) {
		console.log(`Add new user ${req.body.name}`);
		let name = req.body.name;
		let email = req.body.email;
		let password = req.body.password;
		// let {name, email, email} = {req.body.name, req.body.email, req.body.password};
		const {salt, hash} = saltHashPassword(password);

		//validate data
		if (!name || !email || !password) {
			// res.send
		}

		let userFind = await User.where({email: email}).fetch();
		if (userFind) {
			return res.status(200).json({"message": "User existed", 'code': EXISTED_CODE, "data": userFind});
		}

		let user = new User({
			name,
			email,
			salt,
			encrypted_password: hash
		});
		await user.save()
		.then(user => {
			res.status(200).json({"message": "Create user successfully", "code": SUCCESS_CODE,"data": user});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send({"message": 'Unable to create user', "code": EXISTED_CODE, 'data': ''});
		});
	}
}

function saltHashPassword (password) {
	const salt = randomString();
	const hash = crypto.createHmac('sha512', salt).update(password);

	return {
		salt,
		hash: hash.digest('hex')
	}
}

function randomString () {
	return crypto.randomBytes(4).toString('hex');
}

const userController = new UserController();
module.exports = userController;