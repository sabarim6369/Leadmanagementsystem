const express = require("express");
const {
  addadmin,
  updateadmin,
  deleteadmin,
  pauseadmin,
} = require("../controller/superadmin");

const router = express.Router();

router.post("/add", (req, res) => addadmin(req, res, req.db));
router.patch("/update/:adminId", (req, res) => updateadmin(req, res, req.db));
router.delete("/delete/:adminId", (req, res) => deleteadmin(req, res, req.db));
router.patch("/pause/:adminId", (req, res) => pauseadmin(req, res, req.db));

module.exports = router;
