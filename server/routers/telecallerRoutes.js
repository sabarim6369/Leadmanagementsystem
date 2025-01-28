const express = require("express");
const {
  updateLeadResult,
  getAssignedLeads,
  getTelecallerHistory,
} = require("../controller/telecaller");

const router = express.Router();

router.post("/update-lead", (req, res) => updateLeadResult(req, res, req.db));
router.get("/leads/:telecallerId", (req, res) => getAssignedLeads(req, res, req.db));
router.get("/history/:telecallerId", (req, res) => getTelecallerHistory(req, res, req.db));

module.exports = router;
