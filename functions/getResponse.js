const errorResponse = "Internal Server Error";
const unauthorizedResponse = "Unauthorized"
const failResponse = "Bad Request"

function getErrorResponse(res) {
    return res.status(500).send(errorResponse);
}

function getFailResponse(res) {
    return res.status(400).send(failResponse);
}

function getUnauthorizedResponse(res) {
    return res.status(401).send(unauthorizedResponse);
}


module.exports = {
    getErrorResponse,
    getUnauthorizedResponse,
    getFailResponse
} 