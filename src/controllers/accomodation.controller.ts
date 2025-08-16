import { NextFunction, Request, Response } from "express";
import { accomodationRepositories } from "../repositories/accomodation.repositories";

export const accomodationController = {
    async addAccomodation(req: Request, res: Response) {
        const { 
            name, 
            description,
            destinationId,
            price,
            time
        } = req.body;

        const result = await accomodationRepositories.addAccomodation({name,  description, destinationId, price, time});
        if(result)
        {
            res.json({
                message: "accomodation added"
            })
        }
    }
}