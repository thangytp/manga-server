import Chapter from "../../../models/Chapter";
import Manga from "../../../models/Manga";
import ResponseCode from "../../../helper/ResponseCode";

const { EXISTED_CODE, SUCCESS_CODE } = require('../../../helper/ResponseCode');
const ResponseTemplate = require('../../../helper/ResponseTemplate');

class ChapterController {
	async list(req, res) {
        try {
            let page = req.page || 0;
            let perpage = req.perpage || 50;

            let listChapter = await Chapter.fetchPage({
                pageSize: perpage,
                page: page,
            });
            return res.status(200).send(ResponseTemplate.success({
                "message" : "Success get list chapter!",
                "data" : listChapter
            }));
        } catch (e) {
            console.log(e);
        }
	}

	// list chapter by manga
    async listByManga(req, res) {
        try {
            let page = req.page || 0;
            let perpage = req.perpage || 50;
            let manga_id = req.params.id;

            const manga = await Manga.where({id: manga_id}).count();
            if (!manga) {
                return res.send(ResponseTemplate.error({"message": "Manga does not exist", 'code': ResponseCode.DATA_NOT_FOUND}));
            }

            let listChapterByManga = await Chapter.where({mangas_id : manga_id}).fetchPage({
                pageSize: perpage,
                page: page,
            });
            return res.status(200).send(ResponseTemplate.success({
                "message" : "Success get list chapter by manga!",
                "data" : listChapterByManga
            }));
        } catch (e) {
            console.log(e);
        }
    }

	async create(req, res) {
        console.log(`Add new chapter ${req.body.name}`);
        let {manga_id, chap, name, slug, status, content} = req.body;

        //validate data
        if (!manga_id || !chap || !slug || !content) {
            return res.send(ResponseTemplate.error({
                "message": "Cannot empty",
                'code': ResponseCode.INPUT_DATA_NULL
            }));
        }

        const manga = await Manga.where({id: manga_id}).count();
        if (!manga) {
            return res.send(ResponseTemplate.error({"message": "Manga does not exist", 'code': ResponseCode.DATA_NOT_FOUND}));
        }

        let chapter = new Chapter({
            mangas_id: manga_id,
            chap,
            name,
            slug,
            status,
            content
        });
        await chapter.save()
            .then(chapter => {
                return res.status(200).json({"message": "Create manga successfully", "code": ResponseCode.SUCCESS,"data": chapter});
            })
            .catch(err => {
                console.log(err);
                return res.status(400).send({"message": 'Unable to create manga', "code": ResponseCode.SERVER_INTERNAL_ERROR, 'data': ''});
            });
	}

    async update(req, res) {
        let id = req.params.id;
        let chapter = await Chapter.where({id: id}).fetch();
        if (!chapter) {
            return res.send(ResponseTemplate.error({"message": "Chapter does not exist", 'code': ResponseCode.DATA_NOT_FOUND}));
        }

        let {manga_id, chap, name, slug, status, content} = req.body;

        //validate data
        if (!manga_id || !chap || !slug || !content) {
            return res.send(ResponseTemplate.error({
                "message": "Cannot empty",
                'code': ResponseCode.INPUT_DATA_NULL
            }));
        }

        await chapter.save({mangas_id: manga_id, chap, name, slug, status, content}, {patch: true})
            .then(chapter => {
                return res.status(200).json({"message": "Update chapter successfully", "code": ResponseCode.SUCCESS,"data": chapter});
            })
            .catch(err => {
                console.log(err);
                return res.status(400).send({"message": 'Unable to update chapter', "code": ResponseCode.SERVER_INTERNAL_ERROR, 'data': ''});
            });
    }

	async retrieve(req, res) {
        let id = req.params.id;
        let chapter = await Chapter.where({id: id}).fetch();
        if (!chapter) {
            return res.send(ResponseTemplate.error({"message": "Chapter is not exist", 'code': ResponseCode.DATA_NOT_FOUND}));
        }

        return res.status(200).send(ResponseTemplate.success({
            'message': 'Success',
            'code': ResponseCode.SUCCESS,
            'data': chapter
        }));
	}

	// retrieve with update view
    async retrieveWithUpdate(req, res) {
        let id = req.params.id;
        let chapter = await Chapter.where({id: id}).fetch();
        if (!chapter) {
            return res.send(ResponseTemplate.error({"message": "Chapter is not exist", 'code': ResponseCode.DATA_NOT_FOUND}));
        }

        const viewCount = chapter.view + 1;
        await chapter.save({views: viewCount}, {patch: true});

        return res.status(200).send(ResponseTemplate.success({
            'message': 'Success',
            'code': ResponseCode.SUCCESS,
            'data': chapter
        }));
    }

	async delete(req, res) {
        let id = req.params.id;
        let chapter = await Chapter.where({id: id}).fetch();
        if (!chapter) {
            return res.status(200).json({"message": "Chapter is not exist", 'code': ResponseCode.DATA_NOT_FOUND});
        }

        await chapter.destroy()
            .then(result => {
                return res.status(200).send(ResponseTemplate.success({
                    'message': 'Success',
                    'code': ResponseCode.SUCCESS,
                    'data': {}
                }));
            })
            .catch(err => {
                console.log(err);
                return res.status(400).send({"message": 'Unable to delete chapter', "code": ResponseCode.SERVER_INTERNAL_ERROR, 'data': ''});
            });
	}
}

const chapterController = new ChapterController();
module.exports = chapterController;