import { Request, Response, NextFunction, response } from "express";
import { default as Admin } from "../models/Admin";
import { Category } from "../models/Category";
import { default as Item } from "../models/Item";
import {default as Order} from "../models/Order";
import { render } from "pug";
import got from "got";

export let getAdmin = (req: Request, res: Response) => {
  res.render("admin", {
    title: "admin"
  });
};

export let getCategories = (req: Request, res: Response) => {
  const cursor = Category.find({});

  cursor.then(result => {
    if (!result) {
      res.render("categories", {
        st: false,
        title: "categories",
        err:
          "Categories can't be downloaded,please,ask your system administrator or try agait later"
      });
    } else {
      let formatResult: any = [];
      result.forEach(category => {
        let obj = {
          id: category._id,
          name: category.name,
          image: category.image
        };

        formatResult.push(obj);
      });

      res.render("categories", {
        st: true,
        title: "categories",
        data: formatResult
      });
    }
  });
};

export let postCategories = (req: Request, res: Response) => {
  req.assert("radio").notEmpty();
  req.assert("name").len({ min: 1, max: 15 });
  req.assert("image").notEmpty();
  req.assert("id");

  const errors = req.validationErrors();

  if (errors) {
    return res.redirect("categories");
  }

  switch (req.body.radio) {
    case "add-radio": {
      let options = {
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: req.body.name,
          image: req.body.image
        })
      };
      got
        .post(`${process.env.LOCAL_URL}/categories`, options)
        .then(response => {
          if (response.statusCode === 201) {
            return res.redirect("categories");
          } else {
            return res.redirect("categories");
          }
        })
        .catch((err: Error) => {
          console.error("79", err.message);
          res.redirect("categories");
        });
      break;
    }
    case "update-radio": {
      console.log(req.body.id);
      if (req.body.id) {
        const options = {
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            name: req.body.name,
            image: req.body.image
          })
        };
        got
          .put(`${process.env.LOCAL_URL}/categories/${req.body.id}`, options)
          .then(response => {
            if (response.statusCode === 200) {
              return res.redirect("categories");
            } else {
              return res.redirect("categories");
            }
          })
          .catch((err: Error) => {
            console.error(err.message);
            res.redirect("categories");
          });
      } else {
        res.render("categories", {
          st: false,
          title: "categories",
          error: "ID is not selected"
        });
      }
      break;
    }
    case "delete-radio": {
      if (req.body.id) {
        got
          .delete(`${process.env.LOCAL_URL}/categories/${req.body.id}`)
          .then(response => {
            if (response.statusCode === 200) {
              return res.redirect("categories");
            } else {
              return res.redirect("categories");
            }
          })
          .catch((err: Error) => {
            console.error(err.message);
            res.redirect("categories");
          });
      }
      break;
    }

    default:
      break;
  }
};


export let getDashboard = (req: Request, res: Response) => {
  res.render("dashboard", {
    title: "dashboard"
  });
};

export let postAdmin = (req: Request, res: Response, next: NextFunction) => {
  req
    .assert("name")
    .len({ min: 1, max: 15 })
    .notEmpty();
  req
    .assert("family_name")
    .len({ min: 1 })
    .notEmpty();
  req
    .assert("email")
    .isEmail()
    .notEmpty();
  req
    .assert("password")
    .len({ min: 6 })
    .notEmpty();
  req
    .assert("user_name")
    .len({ min: 4 })
    .notEmpty();
  req
    .assert("phone_number")
    .isMobilePhone("any")
    .notEmpty();
  req.assert("age").notEmpty();
  req.assert("city").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).end("Bad Request");
  }

  const admin = new Admin({
    name: req.body.name,
    family_name: req.body.family_name,
    email: req.body.email,
    password: req.body.password,
    user_name: req.body.user_name,
    phone_number: req.body.phone_number,
    age: req.body.age,
    city: {
      town: req.body.city.town,
      adress: req.body.city.adress,
      city_code: req.body.city.city_code
    }
  });

  Admin.findOne({ email: req.body.email }, (err, existngAdmin) => {
    if (err) {
      return next(err);
    }
    if (existngAdmin) {
      res.status(500).send("Admin is already exist");
    }
    admin.save(err => {
      if (err) {
        return next(err);
      }
      res.status(201).json(admin);
    });
  });
};

export let logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
};

export let addCategory = (req: Request, res: Response, next: NextFunction) => {
  req.assert("radio").notEmpty();
  req.assert("name").len({ min: 1, max: 15 });
  req.assert("image").notEmpty();

  req.assert("name").len({ min: 1, max: 15 });
  req.assert("image").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.render("categories", {
      st: false,
      title: "categories",
      error: ""
    });
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
  });
};

export let deleteCategory = (req: Request, res: Response) => {
  let category = Category.findByIdAndDelete(req.params.id)
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

export let updateCategory = (req: Request, res: Response) => {
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
};

export let getItems = (req: Request, res: Response) => {
  const cursor = Item.find({});
  const categoryCursor = Category.find({});
  cursor.then(items => {
    categoryCursor.then(categories => {
      if (!items && !categories) {
        res.render("items", {
          st: false,
          title: "items",
          err:
            "Items and Categories can't be downloaded,please,ask your system administrator or try agait later"
        });
      } else {
        let formatRes: any = [];
        let categoryNames: any = [];
        items.forEach(item => {
          let obj = {
            id: item._id,
            name: item.name
          };
          formatRes.push(obj);
        });

        categories.forEach(category => {
          categoryNames.push(category.name);
        });

        res.render("items", {
          st: true,
          title: "items",
          data: formatRes,
          categoryData: categoryNames
        });
      }
    });
  });
};

export let postItem = (req: Request, res: Response) => {
  switch (req.body.radio) {
    case "add-radio": {
      let options = {
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: req.body.name,
          price: req.body.price,
          discount: req.body.discount,
          release_date: req.body.release_date,
          activation: req.body.activation,
          publisher: req.body.publisher,
          language: req.body.language,
          genre: req.body.genre,
          age_rating: req.body.age_rating,
          os: req.body.os,
          image_url: req.body.image_url,
          description: req.body.description,
          minimal_specification: req.body.minimal_specification,
          maximal_specification: req.body.maximal_specification
        })
      };
      got
        .post(`${process.env.LOCAL_URL}/item`, options)
        .then(response => {
          console.log("Got answer : ", response.statusCode);
          if (response.statusCode === 201) {
            return res.redirect("items");
          } else {
            console.log("admin HERE");
            res.redirect("items");
          }
        })
        .catch((err: Error) => {
          console.error(err.message);
          res.redirect("items");
        });
      break;
    }
    case "update-radio": {
      if (req.body.id) {
        const options = {
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            release_date: req.body.release_date,
            activation: req.body.activation,
            publisher: req.body.publisher,
            language: req.body.language,
            genre: req.body.genre,
            age_rating: req.body.age_rating,
            os: req.body.os,
            image_url: req.body.image_url,
            description: req.body.description,
            minimal_specification: req.body.minimal_specification,
            maximal_specification: req.body.maximal_specification
          })
        };
        got
          .put(`${process.env.LOCAL_URL}/item/${req.body.id}`, options)
          .then(response => {
            if (response.statusCode === 200) {
              return res.redirect("items");
            } else {
              return res.redirect("items");
            }
          })
          .catch((err: Error) => {
            console.error(err.message);
            res.redirect("items");
          });
      } else {
        return res.redirect("items");
      }
    }
    case "delete-radio": {
      if (req.body.id) {
        got
          .delete(`${process.env.LOCAL_URL}/item/${req.body.id}`)
          .then(response => {
            if (response.statusCode === 200) {
              return res.redirect("items");
            } else {
              return res.redirect("items");
            }
          })
          .catch((err: Error) => {
            console.error(err.message);
            res.redirect("items");
          });
      }
      break;
    }
    default:
      break;
  }
};

export let getOrders = (req: Request , res : Response) => {
  const cursor = Order.find({});
  cursor.then(orders => {
    if (!orders) {
      res.render("orders", {
        st: false,
        title: "items",
        err:
          "Items and Categories can't be downloaded,please,ask your system administrator or try agait later"
      });
    } else {
      let formatRes: any = [];
      orders.forEach(order => {
        let obj = {
          id: order._id,
          customer : order.customer_first_name + " " + order.customer_last_name,
          customer_phone : order.customer_phone_number,
          order_: order.customer_order,
          order_price : order.price,
          status: order.order_status,
        };
        formatRes.push(obj);
      });

      res.render("orders", {
        st: true,
        title: "orders",
        data: formatRes,
      });
    }
  })
}