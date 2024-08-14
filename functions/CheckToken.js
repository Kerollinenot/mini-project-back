const db = require('../db');
const { getUnauthorizedResponse } = require('./getResponse');
const Users = db.users;




async function checkToken(res, token) {
  try {
    const user = await Users.findOne({
      where: {
        token: token
      }
    });

    if (!user) {
      return getUnauthorizedResponse(res)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  checkToken
}