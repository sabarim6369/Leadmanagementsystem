const express = require("express");
const {
    addadmin,
    updateadmin,
    deleteadmin,
    pauseadmin,
} = require("../controller/superadmin");

const router = express.Router();

router.post("/add", addadmin);

router.patch("/update/:adminId", updateadmin);

router.delete("/delete/:adminId", deleteadmin);

router.patch("/pause/:adminId", pauseadmin);

module.exports = router;
