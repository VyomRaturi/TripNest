const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// passportLocalMongoose defines a username, hash and salt field for storing the username, the hashed password and the salt value. Additionally Passport-Local Mongoose adds some methods to your Schema.
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
