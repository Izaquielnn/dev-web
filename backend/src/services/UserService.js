var User = require('../models/User');

class UserService {
    constructor() {
        this.model = User.getInstance();
    }

    async getAll() {
        try {
            let items = await this.model.find();
            return {
                error: false,
                statusCode: 200,
                data: items,
            };
        } catch (errors) {
            return {
                error: true,
                statusCode: 500,
                errors
            };
        }
    }


    async findById(id) {
        try {
            let user = await this.model.findById(id);
            if (user) {
                return { error: false, user };
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'user not found.'
                }
            }

        } catch (error) {
            console.log('error', error);
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || 'Not able to find user',
                errors: error.errors
            };
        }
    }

    async createUser(data) {
        try {
            let user = await this.model.create(data);
            if (user) {
                return { error: false, user };
            }

        } catch (error) {
            console.log('error', error);
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || 'Not able to create user',
                errors: error.errors
            };
        }
    }

    async update(id, data) {
        try {
            let item = await this.model.findByIdAndUpdate(
                id, data, { new: true, runValidators: true }
            );
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

    async authenticate(email, password) {

        try {
            let user = await this.model.findOne({ 'email': email });
            if (!user) {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'user not found.'
                };
            }

            if (! await user.comparePassword(password)) {
                return {
                    error: true,
                    statusCode: 401,
                    message: 'incorrect password.'
                };
            }
            if (user) {
                return { error: false, user, token: user.generateToken() };
            }

        } catch (error) {
            console.log('error', error);
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || 'Not able to authenticate user',
                errors: error.errors
            };
        }
    }
}

module.exports = UserService;