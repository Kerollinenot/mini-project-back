const db = require('../db');
const Users = db.users;

async function checkToken (res, token) {
    const user = await Users.findOne({
        where: {
          token: token
        }
      });
  
      if (!user) {
        return res.status(404).send('User is not assigned');
      }
} 

module.exports = {
    checkToken
}