"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = (req, res) => {
    res.render("home", {
        title: "home"
    });
};
exports.postSignIn = (req, res) => {
    console.log("enter");
};
