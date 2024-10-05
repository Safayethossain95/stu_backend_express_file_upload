import UserModel from "../model/UserModel.js";
import md5 from "md5";
import { EncodeToken } from "../utils/tokenUtility.js";
export const registerService = async (req)=>{

    try{
        let md5crypt = md5(req.body.password)
        req.body.password = md5crypt;
        const data = await UserModel.create(req.body);
        return {status:"success",data:data}
    }catch(err){
        return { status: "error", error: err.toString() };
    }
}
export const loginService = async (req,res)=>{

    try{
        let reqBody = req.body;
        let md5crypt = md5(reqBody.password)
        const data = await UserModel.aggregate([
            { $match: { email: reqBody.email, password:md5crypt } },
            { $project: { _id:0,password:0 } }  // Projection to remove _id field
        ])
        if(data.length > 0){

            let token = EncodeToken(data[0].email)

            let options = {
                maxAge: 30*24*60*60*1000,
                httpOnly: true,
                sameSite:"none",
                secure:true
            }

            res.cookie("Token", token,options)

            return {status:"success",token:token,data:data[0]}

        }else{
            return {status:"login failed! wrong email or password."}
        }
    }catch(err){
        return { status: "error", error: err.toString() };
    }
}

export const profileService = async (req)=>{
    try{
        let data = await UserModel.aggregate([
            {
              $match: { email: req.body.email },
            },
            {
                $project:{
                    email:1,
                    firstName:1,
                    lastName:1,
                }
            }
          ]);
          return {status:"success", data:data[0]}
      }
      catch(err){
        return { status: "error", error: err.toString() };
      }
}
export const profileUpdateService = async (req)=>{
    try{
        let md5crypt = md5(req.body.password)
        req.body.password=md5crypt
        let data = await UserModel.findOneAndUpdate({email:req.body.email},req.body)
          return {status:"updated"}
      }
      catch(err){
        return { status: "error", error: err.toString() };
      }
}