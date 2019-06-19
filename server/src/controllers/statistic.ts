import { Request, Response, NextFunction } from "express";
import Statistic from "../models/Statistic";

export let getStat = (req: Request, res: Response) => {
  Statistic.find({}).then(result => {
    if (!result) {
      return res.status(404).send("Not found");
    } else {
      return res.status(200).json(result);
    }
  });
};
