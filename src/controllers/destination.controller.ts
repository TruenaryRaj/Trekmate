import { NextFunction, Request, Response } from "express";
import { Destination } from "../types/destination.types";
import { destinationRepositories } from "../repositories/destination.repositories";

export const destinationController = {
    async addDestination (req: Request, res: Response) {
            const { name, description } = req.body;
            const result = await destinationRepositories.addDestination(name, description);
            if(result) {
                res.json({
                    message: "inserted"
                })
            }
    }
}