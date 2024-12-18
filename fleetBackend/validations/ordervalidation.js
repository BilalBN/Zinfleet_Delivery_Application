const {body} = require('express-validator');
const createOrderValidation = [
    body('orderData.orderId').isInt().withMessage('Order id must be an integer'),
    body('orderData.storeId').isInt().withMessage('Store id must be an integer'),
    body('orderData.orderStatus').isInt().withMessage('Order status must be an integer')
];

module.exports= {
    createOrderValidation
}