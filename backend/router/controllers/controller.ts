import { Request, Response } from "express";
import { Registers } from "../../src/app/models/User";
import { AppDataSource } from "../../src/database/data-source";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import 'dotenv/config';

var userRepository = AppDataSource.getRepository(Registers);

//Controller for get all users of database
export const getUsers = async (req: Request, res: Response) =>{
    const listUsers = await userRepository.find() 
    res.sendStatus(200).json(listUsers);
};

//Controller of register new users in database
export const registerUsers = async (req: Request, res: Response) => {
    const { email, pass } = req.body;
    
    const hashPassword = await bcrypt.hash(pass, 8);
    
    if(!email || !pass){
         return res.status(400).json({message: "Email and password required !"})
    };
        
    try{
        const alreadyExists = await userRepository.findOneBy({ email })
            
        if(alreadyExists){
            return res.status(409).json({message: "User already exists!!"})
        }
            
        const newUser = userRepository.create({email, pass: hashPassword})
        await userRepository.save(newUser)
        res.status(201).json({message: "User created with sucessful", user: newUser.email})
    } 
    catch(error) {
         console.log(`Isn't possible create a new user ${error}`)
         res.status(500).json({message: 'A errro acurred at crate a new user: ', error});
    };
};   

//Controller of login
export const loginUser = async(req: Request, res: Response) => {
   const { email, pass } = req.body;

   const user = await userRepository.findOne({ where: { email } });

   if(!user){
    return res.status(404).json({message: "User not found"})
   };

   const passowrdVerfy = bcrypt.compare(pass, user.pass);

   if(!passowrdVerfy){
    return res.sendStatus(401).json({message: "User or password incorrect!"})
   };

   const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1d'});
   return res.json({message: "Sucess login / Token generated", resToken: {token}});
}




//Rotas seguras para teste

export const protectRouter1 = (req: Request, res: Response) => {

    return res.sendStatus(200).json({message: "Rota projegida acessada por meio de JWT"})

}