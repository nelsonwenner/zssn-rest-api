const Express = require('express');

const server = Express();

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, (msg) => {
    console.log('\nServer start with successfully!');
});

module.exports = server;