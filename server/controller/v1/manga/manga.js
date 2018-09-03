import ResponseCode from '../../../helper/ResponseCode';
import ResponseTemplate from '../../../helper/ResponseTemplate';
import Manga from '../../../models/Manga';

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
		let {name, slug, other_name, status, description, cover} = req.body;

		//validate data
		if (!name || !slug || !status || !cover) {
			return res.send(ResponseTemplate.error({
				"message": "Cannot empty",
				'code': ResponseCode.INPUT_DATA_NULL
			}));
		}

		let mangaFind = await Manga.where({name: name}).fetch();
		if (mangaFind) {
			return res.status(200).json({"message": "Manga existed", 'code': ResponseCode.EXISTED_CODE, "data": mangaFind});
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
			return res.status(200).json({"message": "Create manga successfully", "code": ResponseCode.SUCCESS,"data": manga});
		})
		.catch(err => {
			console.log(err);
			return res.status(400).send({"message": 'Unable to create manga', "code": ResponseCode.SERVER_INTERNAL_ERROR, 'data': ''});
		});
	}

	async update(req, res) {
		let id = req.params.id;
		let manga = await Manga.where({id: id}).fetch();
		if (!manga) {
			return res.send(ResponseTemplate.error({"message": "Manga is not exist", 'code': ResponseCode.DATA_NOT_FOUND}));
		}

		let {name, slug, other_name, status, description, cover} = req.body;

		//validate data
		if (!name || !slug || !status || !cover) {
			return res.send(ResponseTemplate.error({
				"message": "Cannot empty",
				'code': ResponseCode.INPUT_DATA_NULL
			}));
		}

		await manga.save({name, slug, other_name, status, description, cover}, {patch: true})
		.then(manga => {
			return res.status(200).json({"message": "Update manga successfully", "code": ResponseCode.SUCCESS,"data": manga});
		})
		.catch(err => {
			console.log(err);
			return res.status(400).send({"message": 'Unable to update manga', "code": ResponseCode.SERVER_INTERNAL_ERROR, 'data': ''});
		});
	}

	async retrieve(req, res) {
		let id = req.params.id;
		let manga = await Manga.where({id: id}).fetch();
		if (!manga) {
			return res.send(ResponseTemplate.error({"message": "Manga is not exist", 'code': ResponseCode.DATA_NOT_FOUND}));
		}

		return res.status(200).send(ResponseTemplate.success({
			'message': 'Success',
			'code': ResponseCode.SUCCESS,
			'data': manga
		}));
	}

	async delete(req, res) {
		let id = req.params.id;
		let manga = await Manga.where({id: id}).fetch();
		if (!manga) {
			return res.status(200).json({"message": "Manga is not exist", 'code': ResponseCode.DATA_NOT_FOUND});
		}

		await manga.destroy()
		.then(result => {
			return res.status(200).send(ResponseTemplate.success({
				'message': 'Success',
				'code': ResponseCode.SUCCESS,
				'data': {}
			}));
		})
		.catch(err => {
			console.log(err);
			return res.status(400).send({"message": 'Unable to delete manga', "code": ResponseCode.SERVER_INTERNAL_ERROR, 'data': ''});
		});
	}
}

const mangaController = new MangaController();
module.exports = mangaController;