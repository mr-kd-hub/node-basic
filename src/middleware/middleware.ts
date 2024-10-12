import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/helper";
import userModel from "../model/user.model";

export const middlewareFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.header("Authorization");
    const decodeUser: any = decodeToken(token);
    const data = await userModel.findOne({ email: decodeUser.email });
    if (!data) {
      throw new Error();
    }
    // req.currentUser = data;
    // req._id = data._id;
    console.log(`Request ${req.method} to ${req.url}`);

    // Call the next middleware function in the stack
    next();
  } catch (err) {
    res.status(401).send({ msg: "unauthorised" });
  }
};
