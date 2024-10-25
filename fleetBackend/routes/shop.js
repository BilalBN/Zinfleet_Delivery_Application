const express = require('express');
const shopController = require('../controllers/shopController');
const {
    createShopValidation,
    updateShopValidation,
    getShopByIdValidation,
    deleteShopValidation
  } = require('../validations/shopValidation');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// CRUD routes for drivers
router.post('/getshops', authMiddleware,getShopByIdValidation,shopController.getAllShops);
router.post('/id', authMiddleware,getShopByIdValidation,shopController.getShopsById);
router.post('/', authMiddleware,createShopValidation,shopController.createShop);
router.put('/:id', authMiddleware,updateShopValidation,shopController.updateShop);
router.delete('/:id', authMiddleware,deleteShopValidation,shopController.deleteShop);

module.exports = router;
