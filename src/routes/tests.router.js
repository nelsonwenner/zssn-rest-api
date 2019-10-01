const router = require('./config.router');

module.exports = [
    
    router.get('/status', (request, response) => {
        return response.status(200).json({"status": true});
    })

];