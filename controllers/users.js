const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let url = req.file.path;
        let {
            username,
            firstname,
            lastname,
            phone,
            address,
            city,
            state,
            email,
            password,
        } = req.body;
        let filename = username;
        const profileImage = { url, filename };
        const newUser = new User({
            email,
            username,
            firstname,
            lastname,
            profileImage,
            phone,
            address,
            city,
            state,
        });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to TripNest");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.renderProfile = (req, res) => {
    res.render("users/profile.ejs");
};

module.exports.renderEditProfile = async (req, res) => {
    let currUser = req.user;
    let username = currUser.username;
    let user = await User.findOne({ username: username });
    let originalImageUrl = user.profileImage.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("users/edit.ejs", { originalImageUrl, user });
};

module.exports.updateProfile = async (req, res) => {
    oldUser = res.locals.currUser.username;
    newUser = req.body.username;
    let { id } = req.params;
    let user = await User.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true }
    );
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        user.profileImage = { url, filename };
        await user.save();
    }
    req.flash("success", "Profile Updated");
    if (oldUser !== newUser) {
        res.redirect("/listings");
    } else res.redirect("/profile");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to TripNest!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
};
