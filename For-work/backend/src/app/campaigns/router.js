require('./model')
const express = require( "express" );
const router = express.Router();
const controller = require('./controller')

// returns the URLs of crawled job
router.get('/urls-visited', controller.getUrlsVisited)
router.post('/save-multiple', controller.saveMultipleCampaigns)


// cocup.com/v1/campaigns/...
router.get('/favorites', controller.getFavorites)
router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.patch('/:id', controller.toggleStatus)



module.exports = router
