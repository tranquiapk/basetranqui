const express = require("express");
//controllers
const authControllers = require("../controllers/auth.controllers");
//midlewares
const validationMidlewares = require("../middlewares/validation.middleware");
const userMidlewares = require("../middlewares/users.middleware");
const authMidlewares = require("../middlewares/auth.middleware");

const router = express.Router();
router.post(
  "/registro",
  validationMidlewares.createUSersValidation,
  authControllers.registro
);
router.post("/logear",authControllers.logear);
router.use(authMidlewares.protect);
router.get("/renew", authControllers.renew);
router.patch(
  "/password/:id",
  validationMidlewares.updateUserValidation,
  userMidlewares.validUser,
  authMidlewares.protectAccountOwner,
  authControllers.updatePassword
);
module.exports = router;