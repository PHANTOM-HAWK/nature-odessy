const express = require('express');
const userController = require('./../controllers/userController.js');
//functions

//routers
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.editUser)
  .delete(userController.removeUser);

module.exports = router;
