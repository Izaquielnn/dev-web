var UserService = require('../services/UserService');

class UserController {

    constructor() {
        this.service = new UserService();
        this.createUser = this.createUser.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.me = this.me.bind(this);
    }

    async getAll(req, res) {
        return res.status(200).send(await this.service.getAll());
    }

    async update(req, res) {
        const { id } = req.params;

        let response = await this.service.update(id, req.body);

        return res.status(response.statusCode).send(response);
    }

    async createUser(req, res) {
        let response = await this.service.createUser(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async authenticate(req, res) {
        let { email, password } = req.body;
        let response = await this.service.authenticate(email, password);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async me(req, res) {
        let response = await this.service.findById(req.user.id);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

}

module.exports = new UserController();