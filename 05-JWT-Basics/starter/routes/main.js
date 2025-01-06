const express = require('express'); 
const router = express.Router();

const {login, dashb} = require('../controllers/main');  

router.route('/dashb').get(dashb);
router.route('/login').post(login);

module.exports = router;