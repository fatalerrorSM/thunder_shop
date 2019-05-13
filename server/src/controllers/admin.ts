import { Request, Response, NextFunction } from "express";
import { default as Admin } from "../models/Admin";
import { Category } from "../models/Category";
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
          id : category._id,
          name : category.name,
          image : category.image
        }

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

export let postCategories = (req : Request, res : Response) => {
  req.assert("radio").notEmpty();
  req.assert("name").len({ min: 1, max: 15 });
  req.assert("image").notEmpty();


  const errors = req.validationErrors();

  console.log(errors);

  if (errors) {
    render("categories",{
      st:false,
      title: "categories",
      error : ""
    })
  }
}

export let getItems = (req: Request, res: Response) => {
  res.render("items", {
    title: "items"
  });
};

export let getManage = (req: Request, res: Response) => {
  res.render("manage", {
    title: "manage"
  });
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
