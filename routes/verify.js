/*
  Path: 'api/verify'
*/

const { Router } = require('express');

const router = Router();

const { verify } = require('../controllers/verify.controller');


router.get('/:video/:img1/:img2/:img3', verify);


module.exports = router;
