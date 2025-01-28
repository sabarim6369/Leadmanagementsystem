const express = require("express");
const {
    updateLeadResult,
    getAssignedLeads,
    getTelecallerHistory,
} = require("../controller/telecaller");

const router = express.Router();

router.post("/update-lead", updateLeadResult);

router.get("/leads/:telecallerId", getAssignedLeads);

router.get("/history/:telecallerId", getTelecallerHistory);

module.exports = router;
