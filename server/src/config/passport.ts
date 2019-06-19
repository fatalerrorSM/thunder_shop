import passport from "passport";
import passportLocal from "passport-local";
import _ from "lodash";
import { default as Admin } from "../models/Admin";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err, user: Document) => {
    done(err, user);
  });
});

/**
 * Sign in using Username and Password.
 */

passport.use(
  new LocalStrategy(
    { usernameField: "user_name", passwordField: "password" },
    (usernameField, passwordField, done) => {
      Admin.findOne(
        { user_name: usernameField.toLocaleLowerCase() },
        (err, user: any) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(undefined, false, {
              message: `${usernameField} not found.`
            });
          }
          user.verifyPassword(passwordField, (err: Error, isMatch: boolean) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(undefined, user);
            }
            return done(undefined, false, {
              message: "Invalid username or password."
            });
          });
        }
      );
    }
  )
);

export let isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];
  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect("/");
  }
};
