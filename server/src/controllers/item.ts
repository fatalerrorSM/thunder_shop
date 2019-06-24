import { Request, Response, NextFunction, response } from "express";
import { default as Item } from "../models/Item";
import { Category } from "../models/Category";

export let getAllItems = (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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

export let getItemsByGenre = (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  Item.find({ genre: req.params.id }).then((items: any) => {
    if (!items) {
      return res
        .status(404)
        .send(`Items with genre id ${req.params.id} not found`);
    } else {
      return res.status(200).json(items);
    }
  });
};

export let getItem = (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.params.id) {
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
  } else {
    return res.status(400).send(`Bad Request`);
  }
};

export let addItem = (req: Request, res: Response, next: NextFunction) => {
  req.assert("name").len({ min: 1 });
  req.assert("price").len({ min: 1 });
  req.assert("discount");
  req.assert("release_date").len({ min: 1 });
  req.assert("activation").len({ min: 1 });
  req.assert("publisher").len({ min: 1 });
  req.assert("language").len({ min: 1 });
  req.assert("genre").notEmpty();
  req.assert("age_rating").len({ min: 1 });
  req.assert("os").len({ min: 1 });
  req.assert("image_url").len({ min: 1 });
  req.assert("description").len({ min: 10 });
  req.assert("minimal_specification").notEmpty();
  req.assert("maximal_specification").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    console.error(errors);
    return res.status(400).end("Bad Request");
  }

  Category.findOne({ name: req.body.genre }).then((category: any) => {
    Item.findOne({ name: req.body.name })
      .then((existngItem: any) => {
        if (existngItem) {
          return res.status(500).send("Item is already exist");
        } else {
          return next();
        }
      })
      .catch((err: Error) => {
        console.error(err);

        res.status(500);
      });

    let min_spec = req.body.minimal_specification.split("\r\n");
    let max_spec = req.body.maximal_specification.split("\r\n");

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
      OS: req.body.os,
      image: req.body.image_url,
      description: req.body.description,
      specification: {
        minimal: {
          os: min_spec[0],
          processor: min_spec[1],
          RAM: min_spec[2],
          GPU: min_spec[3],
          disk_space: min_spec[4]
        },
        maximal: {
          os: max_spec[0],
          processor: max_spec[1],
          RAM: max_spec[2],
          GPU: max_spec[3],
          disk_space: max_spec[4]
        }
      }
    })
      .then(item => {
        if (!item) return res.status(500);
        else return res.status(201).send(`Item with ${item._id} created`);
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  });
};

export let deleteItem = (req: Request, res: Response) => {
  if (req.params.id) {
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
  } else {
    return res.status(400).send(`Bad Request`);
  }
};

export let updateItem = (req: Request, res: Response) => {
  if (
    req.body.id &&
    req.body.name &&
    req.body.price &&
    req.body.discount &&
    req.body.release_date &&
    req.body.activation &&
    req.body.publisher &&
    req.body.language &&
    req.body.genre &&
    req.body.age_rating &&
    req.body.os &&
    req.body.image_url &&
    req.body.description &&
    req.body.minimal_specification &&
    req.body.maximal_specification
  ) {
    let min_spec = req.body.minimal_specification.split("\r\n");
    let max_spec = req.body.maximal_specification.split("\r\n");

    Category.findOne({ name: req.body.genre })
      .then((result: any) => {
        let item: any = Item.findOneAndUpdate({_id : req.params.id}, {
          name: req.body.name,
          price: req.body.price,
          discount: req.body.discount,
          release_date: req.body.release_date,
          activation: req.body.activation,
          publisher: req.body.publisher,
          language: req.body.language,
          genre: result._id,
          age_rating: req.body.age_rating,
          OS: req.body.os,
          image: req.body.image_url,
          description: req.body.description,
          specification: {
            minimal: {
              os: min_spec[0],
              processor: min_spec[1],
              RAM: min_spec[2],
              GPU: min_spec[3],
              disk_space: min_spec[4]
            },
            maximal: {
              os: max_spec[0],
              processor: max_spec[1],
              RAM: max_spec[2],
              GPU: max_spec[3],
              disk_space: max_spec[4]
            }
          }
        })
          .then(up_res => {
            if (!up_res) {
              return res
                .status(500)
                .send(`Cannot update category with id ${req.params.id}`);
            } else {
              return res.status(200).json(item);
            }
          })
          .catch((err: Error) => {
            console.error(err.message);
          });
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  } else {
    res.status(500).send("Some field is empty or null");
  }
};
