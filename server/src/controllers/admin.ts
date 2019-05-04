import { Request, Response } from "express";

export let getAdminPage = (req: Request, res: Response) => {
  res.json({"id" : 1});
};
