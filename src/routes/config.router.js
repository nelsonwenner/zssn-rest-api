const bodyParser = require('body-parser');
const Express = require('express');

const router = Express();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

module.exports = router;