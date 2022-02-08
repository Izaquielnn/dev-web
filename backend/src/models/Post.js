var mongoose = require('mongoose');


class Post {

    initSchema() {
        const schema = new mongoose.Schema({
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            imgUrl: {
                type: String,
                required: true,
            },

        }, { timestamps: true });

        mongoose.model('post', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('post');
    }
}

module.exports = new Post();