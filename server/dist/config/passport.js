"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const lodash_1 = __importDefault(require("lodash"));
const Admin_1 = __importDefault(require("../models/Admin"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(undefined, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    Admin_1.default.findById(id, (err, user) => {
        done(err, user);
    });
});
/**
 * Sign in using Username and Password.
*/
passport_1.default.use(new LocalStrategy({ usernameField: 'user_name', passwordField: 'password' }, (usernameField, passwordField, done) => {
    Admin_1.default.findOne({ user_name: usernameField.toLocaleLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `${usernameField} not found.` });
        }
        user.verifyPassword(passwordField, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            ;
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid username or password." });
        });
    });
}));
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};
/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split("/").slice(-1)[0];
    if (lodash_1.default.find(req.user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect("/");
    }
};
