import { Request, Response } from "express";

export let index = (req: Request, res: Response) => {
  res.render("home", {
    title: "home"
  });
};

export let postSignIn = (req: Request, res: Response) => {
  console.log("enter");
};
