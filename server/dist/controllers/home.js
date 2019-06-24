"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
exports.index = (req, res) => {
    if (req.user) {
        res.redirect("/admin");
    }
    else {
        res.render("home", {
            title: "home"
        });
    }
};
exports.postSignIn = (req, res, next) => {
    req.assert("user_name", " is not valid").len({ min: 1 });
    req.assert("password", "Password cannot be blank").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        console.error("errors", errors);
        return res.render("home", {
            st: false,
            msg: "User name or password incorrect"
        });
    }
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render("home", {
                st: false,
                msg: "User name or password incorrect"
            });
        }
        req.logIn(user, err => {
            if (err) {
                return next(err);
            }
            res.redirect("/admin");
        });
    })(req, res, next);
};
