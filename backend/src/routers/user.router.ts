import { Router } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model";
import { userList } from "../data";

const router = Router();

router.get("/initDb", async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if(userCount > 0){
        res.send("Initialization already done");
        return;
    }

    await UserModel.create(userList);
    res.send("Initialization done");
})

router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const userFound = await UserModel.findOne({email, password});
    if(userFound){
        //Converts to object
        const user = userFound.toObject();
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Username or password is not valid");
    }
})
/**
 * This function takes a user object and generates a json web token, adds the token to the user object and returns
 * the updated user object. 
 * @param user  the user object to generate the token
 * @returns     the updated user object
 */
const generateTokenResponse = (user:any) => {
    const secretKey = process.env.JwtSecret as string;
    //Creates a token where the payload contains email and a flag to indicate if the user ia an administrator
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, secretKey, {
        expiresIn: "30d" 
    });
    //Adds the generated token as a property to the user object
    user.token = token;
    return user;
}

export default router;