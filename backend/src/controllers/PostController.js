var PostService = require('../services/PostService');

class PostController {

    constructor() {
        this.service = new PostService();
        this.getAll = this.getAll.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.comment = this.comment.bind(this);
    }

    async getAll(req, res) {
        return res.status(200).send(await this.service.getAll(req.query));
    }

    async insert(req, res) {
        req.body.author = req.user.id;
        console.log(req.body)
        let response = await this.service.insert(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }
    async comment(req, res) {
        const author = req.user.id;
        const { id } = req.params;
        const { comment } = req.body;
        console.log(req.body)
        let response = await this.service.comment(id, { author, comment });
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async update(req, res) {
        const { id } = req.params;

        let response = await this.service.update(id, req.body);

        return res.status(response.statusCode).send(response);
    }

    async delete(req, res) {
        const { id } = req.params;

        let response = await this.service.delete(id);

        return res.status(response.statusCode).send(response);
    }

}

module.exports = new PostController();