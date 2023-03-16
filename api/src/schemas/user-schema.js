createSchema = {
  userName: {
    notEmpty: true,
    errorMessage: "Username is required",
  },
  email: {
    notEmpty: true,
    errorMessage: "Email is required",
  },
  password: {
    notEmpty: true,
    errorMessage: "Password is required",
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password2) {
          throw new Error("Passwords must match");
        }
        return true;
      },
    },
  },
  password2: {
    notEmpty: true,
    errorMessage: "Password confirmation is required",
  },
};

loginSchema = {
  email: {
    notEmpty: true,
    errorMessage: "Email is required",
  },
  password: {
    notEmpty: true,
    errorMessage: "Password is required",
  },
};

module.exports = {
  createSchema,
  loginSchema,
};
