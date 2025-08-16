import { NextFunction, Request, Response } from "express";
import { destinationRepositories } from "../repositories/destination.repositories";

export const destinationController = {
    async addDestination (req: Request, res: Response) {
            const { name, description, shortDescription} = req.body;
            const result = await destinationRepositories.addDestination({name, description, shortDescription});
            if(result) {
                res.json({
                    message: "inserted"
                })
            }
    }
}