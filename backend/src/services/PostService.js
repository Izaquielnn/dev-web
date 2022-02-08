var mongoose = require('mongoose');
var Post = require('../models/Post');

class PostService {
    constructor() {
        this.model = Post.getInstance();
        this.getAll = this.getAll.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(query) {
        let { skip, limit } = query;

        let paginate = false;
        if (skip && limit) {
            paginate = true;
            skip = skip ? Number(skip) : 0;
            limit = limit ? Number(limit) : 10;
        }

        delete query.skip;
        delete query.limit;

        if (query._id) {
            try {
                query._id = new mongoose.mongo.ObjectId(query._id);
            } catch (error) {
                console.log('not able to generate mongoose id with content', query._id);
            }
        }

        try {

            let items = []

            if (paginate) {
                items = await this.model
                    .find(query)
                    .skip(skip)
                    .limit(limit);
            } else {
                items = await this.model
                    .find(query);
            }

            let total = await this.model.count();

            return {
                error: false,
                statusCode: 200,
                data: items,
                total
            };
        } catch (errors) {
            return {
                error: true,
                statusCode: 500,
                errors
            };
        }
    }

    async insert(data) {
        try {
            let item = await this.model.create(data);
            if (item)
                return {
                    error: false,
                    item
                };
        } catch (error) {
            console.log('error', error);
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || 'Not able to create post',
                errors: error.errors
            };
        }
    }

    async update(id, data) {
        try {
            let item = await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            return {
                error: false,
                statusCode: 202,
                item
            };
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                error
            };
        }
    }

    async delete(id) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            if (!item)
                return {
                    error: true,
                    statusCode: 404,
                    message: 'post not found'
                };

            return {
                error: false,
                deleted: true,
                statusCode: 202,
                item
            };
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                error
            };
        }
    }
}

module.exports = PostService;