const db = require('../db');
const Users = db.users;
const bcrypt = require('bcrypt');
const Randomizer = require('@namopanda/random-generator');
const { getFailResponse, getUnauthorizedResponse } = require('../functions/getResponse');

async function getUsers(req, res, next) {
    await Users.findAll()
        .then(users => res.json(users))
        .catch(err => next(err))
}

async function authorization(req, res, next) {
    

    const sendResponse = async (users) => {
        if (!users.length) {
            return getUnauthorizedResponse(res)
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    
        if (isPasswordValid) {
            const resBody = {
                id: user.id,
                login: user.login,
                username: user.username,
                token: user.token,
            };
            res.status(200).json(resBody);
        } else {
            return getFailResponse(res)
        }
        
    }

    await Users.findAll({
        where: { login: req.body.login },
    })
        .then(users => sendResponse(users))
        .catch(err => next(err))
}

async function registration(req, res, next) {
    if (!req.body.login || !req.body.password || !req.body.username) return getFailResponse(res);
    
    const registrateUser = async (users) => {
        if (users.length) {
            return getFailResponse(res)
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const token = Randomizer.generateRandomString(30);
        const newUser = {
            id: null,
            login: req.body.login,
            password: hashedPassword,
            username: req.body.username,
            token: token,
        }

        const user = await Users.create(newUser)

        res.status(200).send({
            id: user.null,
            login: user.login,
            username: user.username,
            token: user.token
        });
    }

    await Users.findAll({
        where: { login: req.body.login },
    })
    .then(users => registrateUser(users))
    .catch(err => next(err))
}


module.exports = {
    getUsers,
    authorization,
    registration
};