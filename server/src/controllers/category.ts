import { Request, Response, NextFunction } from "express";
import { Category, CategoryModel } from "../models/Category";

const request = require("express-validator");

export let getAllcategories = (req: Request, res: Response) => {
  Category.find()
    .then((categories: any) => {
      if (!categories) {
        return res.status(404).send("Categories is not found");
      } else {
        return res.status(200).json(categories);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
};

export let addCategory = (req: Request, res: Response, next: NextFunction) => {
  req.assert("name").len({ min: 1, max: 15 });
  req.assert("image").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).send("Bad Request");
  }

  const category = new Category({
    name: req.body.name,
    image: req.body.image
  });

  Category.findOne({ name: req.body.name }, (err, existngCategory) => {
    if (err) {
      return next(err);
    }
    if (existngCategory) {
      res.status(500).send("Category is already exist");
    }
    category.save(err => {
      if (err) {
        return next(err);
      }
      res.status(201).json(category);
    });
  }).catch((err : Error) => {
    console.error(err);
  });
};

export let getCategory = (req: Request, res: Response) => {
  if(req.params.id){
    let category = Category.findById(req.params.id)
    .then((foundCategory: any) => {
      if (!foundCategory) {
        return res.status(404).send("Category is not found");
      } else {
        return res.status(200).json(foundCategory);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
  }else{
    return res.status(400).send("Bad Request");
  }
};

export let deleteCategory = (req: Request, res: Response) => {
  if(req.params.id){
    let category = Category.findByIdAndDelete(req.params.id).then((result : any) => {
      if(!result) {return res.status(500).send(`Can't delete document with id -> ${req.params.id}`)}
      else{
        return res.status(200).send(`Document with id -> ${req.params.id} successfully deleted`);
      }
    }).catch((err : Error) => {
      console.error(err.message);
    })
  }else{
    return res.status(400).send("Bad Request");
  }
};

export let updateCategory = (req: Request, res: Response) => {
  if(req.params.id){
    if (!req.body.name && !req.body.image) {
      return res.status(202).send("Object with options for update is empty");
    } else if (req.body.name && !req.body.image) {
      let category: any = Category.findOneAndUpdate(req.params.id, {
        name: req.body.name
      }).then((result: any) => {
        if (!result) {
          return res
            .status(500)
            .send(
              `Cannot update category with id ${
                req.params.id
              } , and body parametrs ${req.body.name}`
            );
        } else {
          return res.status(200).json(category);
        }
      });
    } else if (!req.body.name && req.body.image) {
      let category: any = Category.findOneAndUpdate(req.params.id, {
        image: req.body.image
      }).then((result: any) => {
        if (!result) {
          return res
            .status(500)
            .send(
              `Cannot update category with id ${
                req.params.id
              } , and body parametrs ${req.body.image}`
            );
        } else {
          return res.status(200).json(category);
        }
      });
    } else if (req.body.name && req.body.image) {
      let category: any = Category.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image
      }).then((result: any) => {
        if (!result) {
          return res
            .status(500)
            .send(
              `Cannot update category with id ${
                req.params.id
              } , and body parametrs ${req.body.name} ${req.body.image}`
            );
        } else {
          return res.status(200).json(category);
        }
      });
    }
  }else{
    return res.status(400).send("Bad Request");
  }
};
