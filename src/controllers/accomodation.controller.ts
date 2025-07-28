import { NextFunction, Request, Response } from "express";
import { accomodationRepositories } from "../repositories/accomodation.repositories";

export const accomodationController = {
    async addAccomodation(req: Request, res: Response, next: NextFunction) {
        const { 
            name, 
            ownerName,
            phone,
            description,
            locationId
        } = req.body;

        const result = await accomodationRepositories.addAccomodation(name, ownerName, phone, description, locationId);
        if(result)
        {
            res.json({
                message: "accomodation added"
            })
        }
    }
}