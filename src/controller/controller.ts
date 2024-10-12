import { Request, Response } from "express";
import userModel from "../model/user.model";
import { decyptPassword, encryptPassword, tokenGenerator } from "../utils/helper";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    if (!name || !email || !password)
      return res.status(400).send({ msg: "Required data not passed" });
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res.status(400).send({ msg: "User already found" });
    }
    const user = new userModel({
      name,
      email,
      password,
    });

    const created = await user.save();

    if (created) {
      const token = await tokenGenerator({ email });
      return res
        .status(201)
        .send({ msg: "User registered successfully", user, token });
    }
  } catch (err) {
    console.error("errere", err);

    return res.status(500).send({ msg: err });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    if (!email || !password)
        return res.status(400).send({ msg: "Required data not passed" })

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(400).send({ msg: "No user found with thsi email" });
    }
    const isMatched = await decyptPassword(password,findUser.password)
    if(isMatched){
        const token = await tokenGenerator({ email });
        return res
        .status(200)
        .send({ msg: "Login success", findUser, token });
    }
    return res
    .status(401)
    .send({ msg: "invalid password" });
  } catch (err) {
    return res.status(500).send({ msg: err });
  }
};
