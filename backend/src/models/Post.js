var mongoose = require('mongoose');


class Post {

    initSchema() {
        const schema = new mongoose.Schema({
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
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
            comments: [
                {
                    author: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                        required: true,
                    },
                    comment: {
                        type: String,
                        required: true,
                    }
                }
            ]

        }, { timestamps: true });

        mongoose.model('post', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('post');
    }
}

module.exports = new Post();