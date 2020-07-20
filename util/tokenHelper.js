const jwt = require("jsonwebtoken");

const generateToken = (username) => {
    const token = {
        sessionToken: signjwt(username)
    };
    return token;
};

const signjwt = (username) => {
    return jwt.sign({
        data: username
    }, 'ferial', { expiresIn: '1h'})
};

const verifyToken = (tokenValue) => {
    return jwt.verify(tokenValue, 'ferial');
};

module.exports = {generateToken, verifyToken};