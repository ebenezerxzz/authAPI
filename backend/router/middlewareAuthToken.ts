import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from '../src/database/data-source';
import { Registers } from '../src/app/models/User';

import { IGetUserAuthInfoRequest } from '../express';

const userRepository = AppDataSource.getRepository(Registers);

interface JwtPayload {
    id: number,
};

export const authToken = async(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json({message: 'User is not authorized for this route'})
    };

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

        const user = await userRepository.findOne({ where: {id: decoded.id}})
        
        if(!user) {
            return res.status(401).json({message: "User not found !"})
        }
        req.user = user
        next()  
    }
    catch(error) {
        return res.status(403).json({message: "Invalid token !"})
    }
}

