import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/errorHandler.js";
import { setCookie } from "../utils/cookieSetter.js";

export const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if(password.length<8) return next(new ErrorHandler("Password must be atleast 8 characters", 400));

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already Exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ ...req.body, password: hashedPassword });

    setCookie(res, user, "User Created Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) return next(new ErrorHandler("Please Enter Email and Password", 400))

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return next(new ErrorHandler("Invalid email or password", 401));

    setCookie(res, user, `Logged in as ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  try {
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
};
