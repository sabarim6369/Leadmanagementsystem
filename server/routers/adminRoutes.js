const express = require("express");
const {
    addtelecaller,
    updatetelecaller,
    deletetelecaller,
    assignleads,
    swapleads,
    addleads,
    login
} = require("../controller/admin");

const router = express.Router();
router.post("/login",login)
router.post("/add", addtelecaller);

router.patch("/update/:telecallerId", updatetelecaller);

router.delete("/delete/:telecallerId", deletetelecaller);

router.post("/assign-leads", assignleads);

router.post("/swap-leads", swapleads);

router.post("/addleads", addleads);

module.exports = router;
