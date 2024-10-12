import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"

export const encryptPassword = async (password: string) => {
    try{
        return await bcrypt.hash(password, 8);
    }
    catch(ee){
        return password
    }
};

export const decyptPassword = async (password:string, hashedPassword: string) => {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch
    }
    catch(err){
        return false
    }
}

export const tokenGenerator = async (payload:any) => {
    try{
        return await jwt.sign(payload, "HDJBDBD-kjfbkjabffaf", { expiresIn: '1h'})
    }
    catch(err){}
}

export const decodeToken = (token:any) => {
    return jwt.verify(token, "HDJBDBD-kjfbkjabffaf",)
}