function getResponse(code) {
    switch (code) {
        case 400:
            return "Bad Request"
            break

        case 401:
            return "Unauthorized"
            break

        case 500:
            return "Internal Server Error"
            break
    }
}

module.exports = {
    getResponse
} 