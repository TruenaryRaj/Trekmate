import { Request, Response } from "express";
import { locationRepositories } from '../repositories/locations.repositories'

export const locationController = {
    async addLocation(req: Request , res: Response) {
        const { name, description, estimatedTime, destinationId} = req.body;
        const result = await locationRepositories.addLocation(
            name,
            description,
            estimatedTime,
            destinationId
        );
        if(result){
            res.json({
                message: "location created"
            })
        }
    }
}