const { checkToken }  = require('../functions/CheckToken');

// function authenticateUser(req, res, next) {
//     const token = req.headers['authorization'];

//     let isTokenCorrect = token ? checkToken(token) : false

//     if (isTokenCorrect) next()
//     else return getUnauthorizedResponse(res);
// }

function authenticateUser(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
      checkToken(res, token)
      next()
    }
    else return getUnauthorizedResponse(res);
}

module.exports = {
    authenticateUser
}