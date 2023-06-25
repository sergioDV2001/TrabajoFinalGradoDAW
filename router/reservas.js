const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("reservas");
});


module.exports = router;