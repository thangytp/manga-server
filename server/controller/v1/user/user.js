const crypto = require('crypto');
import ResponseCode from '../../../helper/ResponseCode';
import ResponseTemplate from '../../../helper/ResponseTemplate';
// Require Post model in our routes module
import User from '../../../models/User';

class UserController {
	async list(req, res) {
		try {
			let page = req.page || 0;
			let perpage = req.perpage || 50;

			let listUser = await User.fetchPage({
				pageSize: perpage,
				page: page,
			});
			console.log(listUser);
			return res.status(200).send(ResponseTemplate.success({
				"message" : "Success get list user!",
				"data" : listUser
			}));
		} catch (e) {
			console.log(e);
		}
	}
	async test(req, res) {
		console.log('test here');
		res.status(200).send(ResponseTemplate.success({"message": "Test controller", "data": "[]"}));
	}
	async create(req, res) {
		console.log(`Add new user ${req.body.name}`);
		let {name, email, password} = req.body;
		const {salt, hash} = saltHashPassword(password);

		//validate data
		if (!name || !email || !password) {
			return res.send(ResponseTemplate.error({"message": "Input empty!", 'code': ResponseCode.INPUT_DATA_WRONG_FORMAT, "data": ''}));
		}

		let userFind = await User.where({email: email}).fetch();
		if (userFind) {
			return res.send({"message": "The email is taken!", 'code': ResponseCode.EXISTED_CODE, "data": email});
		}

		let user = new User({
			name,
			email,
			salt,
			encrypted_password: hash
		});
		await user.save()
		.then(user => {
			res.status(200).json({"message": "Create user successfully", "code": ResponseCode.SUCCESS,"data": user});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send({"message": 'Unable to create user', "code": ResponseCode.EXISTED_CODE, 'data': ''});
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