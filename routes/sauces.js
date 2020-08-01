const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createType);

router.post('/:id/like' auth, saucesCtrl.)

  router.put('/:id', auth, multer, saucesCtrl.modifyType);

  router.delete('/:id', auth, saucesCtrl.deleteType);

  router.get('/:id', auth, saucesCtrl.getOneType);

  router.get('/', auth, saucesCtrl.getAllType);

  module.exports = router;