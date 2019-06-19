import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { default as Admin, AdminModel } from "../models/Admin";
import { IVerifyOptions } from "passport-local";

export let index = (req: Request, res: Response) => {
  if (req.user) {
    res.redirect("/admin");
  } else {
    res.render("home", {
      title: "home"
    });
  }
};

export let postSignIn = (req: Request, res: Response, next: NextFunction) => {
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

  passport.authenticate(
    "local",
    (err: Error, user: AdminModel, info: IVerifyOptions) => {
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
    }
  )(req, res, next);
};
