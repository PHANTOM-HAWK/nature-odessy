const express = require('express');
const tourControllers = require('./../controllers/tourControllers.js');
//routers
const router = express.Router();
router
  .route('/top5-best-cheap-route')
  .get(tourControllers.touralias, tourControllers.getAllTour);
router.route('/').get(tourControllers.getAllTour).post(tourControllers.addTour);
router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.patchy)
  .delete(tourControllers.remove);

module.exports = router;
