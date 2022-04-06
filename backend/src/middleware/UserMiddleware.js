var jwt = require("jsonwebtoken");

class UserMiddleware {

    authorize(req, res, next) {
        let token = req.header("Authorization");

        if (!token)
            return res.status(401).send({
                error: true,
                statusCode: 401,
                error: "Access denied. No token provided."
            });

        if (token.split(" ").length < 2)
            return res.status(401).send({
                error: true,
                statusCode: 401,
                error: "Invalid token, remember to put the Bearer prefix"
            });

        token = token.split(" ")[1];

        try {
            req.user = jwt.verify(token, 'superSecretPassword');
        } catch (error) {
            return res.status(401).send({
                error: true,
                statusCode: 401,
                error: "Invalid token"
            });
        }
        next();

    }

}

module.exports = new UserMiddleware();