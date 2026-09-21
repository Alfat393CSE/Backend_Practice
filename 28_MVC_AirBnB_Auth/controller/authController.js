const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("../views/auth/login.ejs", {
    pageTitle: "Login Page",
    currentPage: "login",
    isLoggedIn: req.session.isLoggedIn,
    errorMessages: [],
    oldInput: {},
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("../views/auth/signup.ejs", {
    pageTitle: "SignUp Page",
    currentPage: "signup",
    isLoggedIn: req.session.isLoggedIn,
    errorMessages: [],
    oldInput: {},
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render("../views/auth/login.ejs", {
        pageTitle: "Login Page",
        currentPage: "login",
        isLoggedIn: false,
        errorMessages: "invalid email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("../views/auth/login.ejs", {
        pageTitle: "Login Page",
        currentPage: "login",
        isLoggedIn: false,
        errorMessages: "invalid password",
      });
    }

    req.session.user = {
      _id: user._id.toString(),
      firstName: user.firstName,
      userType: user.userType,
    };
    
    req.session.isLoggedIn = true;
    await req.session.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.postSignUp = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name is required")
    .matches(/[a-zA-Z\s]+$/)
    .withMessage("First name only be the charecters"),

  check("lastName")
    .matches(/[a-zA-Z\s]+$/)
    .withMessage("Last name only be the charecters"),

  check("email")
    .isEmail()
    .withMessage("please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 charecters")
    .matches(/[a-z]/)
    .withMessage("password must contain lowercase")
    .matches(/[A-Z]/)
    .withMessage("password must contain uppercase")
    .matches(/[!@#$%^&*(),.?":'{}<>]/)
    .withMessage("password must contain special charecters")
    .trim(),

  check("confirm-password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password invalid!");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("user type required")
    .isIn(["guest", "host"])
    .withMessage("invalid user type"),

  check("termAccepted")
    .notEmpty()
    .withMessage("you must accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("you must accept terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("../views/auth/signup.ejs", {
        pageTitle: "Sign Up",
        currentPage: "signup",
        isLoggedIn: false,
        errorMessages: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType,
        },
      });
    }

    bcrypt.hash(password, 12).then((hashedPass) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPass,
        userType: userType,
      });
      user
        .save()
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
];

exports.postLogOut = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
