const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const user = require("../models/user.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(upload.single("profileImage[url]"), wrapAsync(userController.signup));

router.route("/profile").get(userController.renderProfile);
router.route("/profile/edit").get(userController.renderEditProfile);

router
    .route("/profile/:id")
    .put(
        upload.single("profileImage[url]"),
        wrapAsync(userController.updateProfile)
    );

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login
    );

router.get("/logout", userController.logout);

module.exports = router;
