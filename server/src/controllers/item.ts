import { Request, Response, NextFunction, response } from "express";
import { default as Item } from "../models/Item";
import { Category } from "../models/Category";

export let getAllItems = (req: Request, res: Response) => {
  Item.find()
    .then((items: any) => {
      if (!items) {
        return res.status(404).send("Items is not found");
      } else {
        return res.status(200).json(items);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
};

export let getItem = (req: Request, res: Response) => {
  Item.findById(req.params.id)
    .then((foundItem: any) => {
      if (!foundItem) {
        return res.status(404).send("Item is not found");
      } else {
        return res.status(200).json(foundItem);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
};

export let addItem = (req: Request, res: Response, next: NextFunction) => {
  req.assert("name").len({ min: 1 });
  req.assert("price").len({ min: 1 });
  req.assert("discount");
  req.assert("release_date").len({ min: 1 });
  req.assert("activation").len({ min: 1 });
  req.assert("publisher").len({ min: 1 });
  req.assert("language").len({ min: 1 });
  req.assert("age_rating").len({ min: 1 });
  req.assert("OS").len({ min: 1 });
  req.assert("image").len({ min: 1 });
  req.assert("description").len({ min: 10 });
  req.assert("specification").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).end("Bad Request");
  }

  Category.findOne({ name: req.body.genre }).then((category: any) => {
    Item.findOne({ name: req.body.name })
      .then((existngItem: any) => {
        if (existngItem) {
          res.status(500).send("Category is already exist");
        } else {
          next();
        }
      })
      .catch((err: Error) => {
        console.error(err);
        return res.status(500);
      });

    Item.create({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      release_date: req.body.release_date,
      activation: req.body.activation,
      publisher: req.body.publisher,
      language: req.body.language,
      genre: category._id,
      age_rating: req.body.age_rating,
      OS: req.body.operating_system,
      image: req.body.image_URL,
      description: req.body.description,
      specification: {
        minimal: {
          os: req.body.specification.minimal.os,
          processor: req.body.specification.minimal.processor,
          RAM: req.body.specification.minimal.ram,
          GPU: req.body.specification.minimal.gpu,
          disk_space: req.body.specification.minimal.disk_space
        },
        maximal: {
          os: req.body.specification.maximal.os,
          processor: req.body.specification.maximal.processor,
          RAM: req.body.specification.maximal.ram,
          GPU: req.body.specification.maximal.gpu,
          disk_space: req.body.specification.maximal.disk_space
        }
      }
    })
      .then(item => {
        if (!item) return res.status(500);
        else return res.status(200).send(`Item with ${item._id} created`);
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  });
};

export let deleteItem = (req: Request, res: Response) => {
  Item.findByIdAndDelete(req.params.id)
    .then((result: any) => {
      if (!result) {
        return res
          .status(500)
          .send(`Can't delete document with id -> ${req.params.id}`);
      } else {
        return res
          .status(200)
          .send(`Document with id -> ${req.params.id} successfully deleted`);
      }
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
};

export let updateItem = (req: Request, res: Response) => {
  req.assert("name").len({ min: 1 });
  req.assert("price").len({ min: 1 });
  req.assert("discount");
  req.assert("release_date").len({ min: 1 });
  req.assert("activation").len({ min: 1 });
  req.assert("publisher").len({ min: 1 });
  req.assert("language").len({ min: 1 });
  req.assert("age_rating").len({ min: 1 });
  req.assert("OS").len({ min: 1 });
  req.assert("image").len({ min: 1 });
  req.assert("description").len({ min: 10 });
  req.assert("specification").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).end("Bad Request");
  }

  

  let item : any = Item.findOneAndUpdate(req.params.id,{
       
  })

};