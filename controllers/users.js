const db = require('../db');
const Users = db.users;
const bcrypt = require('bcrypt');
const Randomizer = require('@namopanda/random-generator');
const { getErrorResponse, getFailResponse, getUnauthorizedResponse } = require('../functions/getResponse');

async function getUsers(req, res, next) {
    try {
        const result = await Users.findAll();
        res.json(result);
    } catch (error) {
        getErrorResponse(res)
        next(error)
    }
}

async function authorization(req, res, next) {
    try {
        const result = await Users.findAll({
            where: { login: req.body.login },
        });

        if (!result.length) {
            return getUnauthorizedResponse(res)
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid) {
            const resBody = {
                id: user.id,
                login: user.login,
                username: user.username,
                token: user.token,
            };
            return res.status(200).json(resBody);
        } else {
            return getFailResponse(res)
        }

    } catch (error) {
        getErrorResponse(res)
        next(error)
    }
}

async function registration(req, res, next) {
    if (!req.body) return getFailResponse(res)
    if (!req.body.login || !req.body.password || !req.body.username) return res.status(400).json(getResponse(500))
    try {
        const existingUser = await Users.findAll({
            where: { login: req.body.login },
        });

        if (existingUser.length) {
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


    } catch (error) {
        getErrorResponse(res)
        next(error)
    }
}


module.exports = {
    getUsers,
    authorization,
    registration
};