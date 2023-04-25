const jwt = require("jsonwebtoken")

const validatetoken = async (req, resp, next) => {
    let token;
    let authHeaders = req.headers.Authorization || req.headers.authorization

    if (authHeaders && authHeaders.startsWith("Bearer")) {
        token = authHeaders.split(" ")[1];

        // to verify weather the token is correct
        jwt.verify(token, process.env.ACCESS_TOKEN_SECREATE, (err, decoded) => {
            if (err) {
                resp.status(401);
                return resp.send("user is not authorised")
            }
            req.user = decoded.user;
            next();
        })
        if (!token) {
            resp.status(401);
            return resp.send("user is not authorized or token is expired")
        }
    }
}

module.exports = validatetoken