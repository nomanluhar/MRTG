const express = require("express");
const router = express.Router();
const {
  adminLogin,
  customers,
  addCustomer,
  updateCustomer,
  removeCustomer
} = require("./user-routes-functions.js");

const {
  loginValidation,
  customerValidation,
} = require("../middlewares/validationParam.js");
const {
  validationMiddleware,
} = require("../middlewares/validationMiddleware.js");

router.get("/", (req, res) => {
  res.send("Hello to MRTG");
});

router.post(
  "/superadmin/login",
  loginValidation,
  validationMiddleware,
  (req, res) => {
    adminLogin(req, res);
  }
);

router.get("/customers", (req, res) => {
  customers(req, res);
});

router.post(
  "/customers/add",
  customerValidation,
  validationMiddleware,
  (req, res) => {
    addCustomer(req, res);
  }
);

router.patch("/customers/:id", (req, res) => {
  updateCustomer(req, res);
});

router.delete("/customers/:id", (req, res) => {
  removeCustomer(req, res);
});

module.exports = router;
