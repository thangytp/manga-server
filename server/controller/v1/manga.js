const { EXISTED_CODE, SUCCESS_CODE } = require('../../helper/ResponseCode');
const ResponseTemplate = require('../../helper/ResponseTemplate');

class MangaController {
	async list(req, res) {

	}

	async create(req, res) {

	}

	async retrieve(req, res) {
		let manga = await Manga.where().fetch();
		if (!manga) {

		}

		return res.status(200).send(ResponseTemplate.success());
	}

	async delete(req, res) {

	}
}

const mangaController = new MangaController();
module.exports = mangaController;