const { z } = require("zod");

const signup_validation = (req, res, next) => {

  const myschema = z.object({
    username: z.string().min(1), // no need of using 'required'
    email: z.string().email({ message: "Invalid email address from zod du" }),
    password: z.string().min(5),
  });
  const { error } = myschema.safeParse(req.body);
  if (error) {
    return res.status(400).json({
      msg: "badd request , invalid data",
      error,
    });
  }
  next();
};

const login_validation = (req, res, next) => {

  const myschema = z.object({
    email: z.string().email({ message: "Invalid email address from zod du" }),
    password: z.string().min(5),
  });
  const { error } = myschema.safeParse(req.body);
  if (error) {
    return res.status(400).json({
      msg: "baddu request , invalid data",
      error,
    });
  }
  next();
};

module.exports = { signup_validation, login_validation };
