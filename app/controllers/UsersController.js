
import { loginService, profileService, profileUpdateService, registerService } from "../service/userService.js";

export const register = async (req, res) => {
  let result = await registerService(req);
  return res.json(result);
};
export const login = async (req, res) => {
  let result = await loginService(req, res);
  return res.json(result);
};
export const profileRead = async (req,res) => {
    let result = await profileService(req, res);
    return res.json(result);
};
export const profileUpdate = async (req,res) => {
    let result = await profileUpdateService(req);
    return res.json(result);
};
