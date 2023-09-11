import jwt from "jsonwebtoken";

export const setCookie = (res, user, message, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.NODE_JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      // secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
