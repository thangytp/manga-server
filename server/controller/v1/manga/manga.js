const { EXISTED_CODE, SUCCESS_CODE } = require('../../../helper/ResponseCode');
const ResponseTemplate = require('../../../helper/ResponseTemplate');
const Manga = require('../../../models/Manga');

class MangaController {
	async list(req, res) {
		try {
			let page = req.page || 0;
			let perpage = req.perpage || 50;

			let listManga = await Manga.fetchPage({
				pageSize: perpage,
				page: page,
			});
			console.log(listManga);
			return res.status(200).send(ResponseTemplate.success({
				"message" : "Success get list manga!",
				"data" : listManga
			}));
		} catch (e) {
			console.log(e);
		}
	}

	async create(req, res) {
		console.log(`Add new manga ${req.body.name}`);
		let name = req.body.name;
		let slug = req.body.slug;
		let other_name = req.body.other_name;
		let status = req.body.status;
		let description = req.body.description;
		let cover = req.body.cover;
		// let {name, email, email} = {req.body.name, req.body.email, req.body.password};

		//validate data
		if (!name || !slug || !status || !cover) {
			res.send(ResponseTemplate.error({
				"message": "Cannot empty",
				'code': EXISTED_CODE
			}));
		}

		let mangaFind = await Manga.where({name: name}).fetch();
		if (mangaFind) {
			return res.status(200).json({"message": "Manga existed", 'code': EXISTED_CODE, "data": mangaFind});
		}

		let manga = new Manga({
			name,
			slug,
			other_name,
			status,
			description,
			cover
		});
		await manga.save()
		.then(manga => {
			res.status(200).json({"message": "Create manga successfully", "code": SUCCESS_CODE,"data": manga});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send({"message": 'Unable to create manga', "code": EXISTED_CODE, 'data': ''});
		});
	}

	async retrieve(req, res) {
		let manga = await Manga.where().fetch();
		if (!manga) {

		}

		return res.status(200).send(ResponseTemplate.success({
			'message': 'Success',
			'code': SUCCESS_CODE,
			'data': manga
		}));
	}

	async delete(req, res) {
		let manga = await Manga.where().fetch();
		if (!manga) {

		}

		await manga.destroy()
		.then(result => {
			return res.status(200).send(ResponseTemplate.success({
				'message': 'Success',
				'code': SUCCESS_CODE,
				'data': {}
			}));
		})
		.catch(err => {
			console.log(err);
			res.status(400).send({"message": 'Unable to delete manga', "code": EXISTED_CODE, 'data': ''});
		});
	}
}

const mangaController = new MangaController();
module.exports = mangaController;