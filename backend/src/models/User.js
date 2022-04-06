var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


class User {

    initSchema() {
        const schema = new mongoose.Schema({
            email: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },

        }, { timestamps: true });

        schema.methods.comparePassword = async function (candidatePassword) {
            return bcrypt.compare(candidatePassword, this.password);
        };

        schema.methods.generateToken = function () {
            const payload = { id: this._id, email: this.email, name: this.name };
            const token = jwt.sign(payload, 'superSecretPassword');

            return token;
        };

        schema.methods.hashPassword = async function (pass) {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(pass, salt);

            return hash;
        }

        schema.pre("save", function (next) {
            const user = this

            if (this.isModified("password") || this.isNew) {
                bcrypt.genSalt(10, function (saltError, salt) {
                    if (saltError) {
                        return next(saltError)
                    } else {
                        bcrypt.hash(user.password, salt, function (hashError, hash) {
                            if (hashError) {
                                return next(hashError)
                            }

                            user.password = hash
                            next()
                        })
                    }
                })
            } else {
                return next()
            }
        });

        mongoose.model('user', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('user');
    }
}

module.exports = new User();