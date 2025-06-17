import { Router } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model";
import { userList } from "../data";
import bcrypt from 'bcryptjs';
import { JerseyModel } from "../models/jersey.model";

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

router.post("/addProduct", async (req, res) => {
    const {team, year, type, size, image, price} = req.body;
    const productFound = await JerseyModel.findOne({team, year, type, size, image, price});

    if(productFound){
        res.status(400).send("Product already present");
        return;
    }else{
        const newProduct = {id: '', team, year, type, size, image, price};
        const dbProduct = await JerseyModel.create(newProduct);
        res.send(dbProduct);
    }
})

router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const userFound = await UserModel.findOne({email});
    const passwordValid = await bcrypt.compare(password, userFound?.password as string);

    if(userFound && passwordValid){
        //Converts to object
        const user = userFound.toObject();
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Username or password is not valid");
    }
})

router.post("/register", async (req, res) => {
    const {name, email, password, address} = req.body;
    const userFound = await UserModel.findOne({email});
    if(userFound){
        res.status(400).send("User already register, please login");
        return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id:'',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
    }
    const dbUser = await UserModel.create(newUser);
    const user = dbUser.toObject();
    res.send(generateTokenResponse(user));
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
        expiresIn: "3h" 
    });
    //Adds the generated token as a property to the user object
    user.token = token;
    return user;
}


export default router;