const express = require( "express" );
const router = express.Router();
const controller = require('./controller')

// /v1/tokens
router.get('/', controller.getAllTokens)
router.get('/new', controller.getNewTokens)
router.get('/:id', controller.getTokenById)

router.post('/redeem', controller.redeemToken)

router.get('/validate/:id', controller.validateToken)

// TODO remove this in production
router.post('/generate', controller.generateToken)

module.exports = router