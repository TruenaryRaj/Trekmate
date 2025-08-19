import { Request, Response } from "express";
import { transportationRepositories } from "../repositories";

export const transportationController = {
    async addTransportation(req: Request, res: Response) {
        const {
            destinationId,
            price,
            time,
            vehiclesType
        } = req.body;

        const result = await transportationRepositories.addTransportation({
            destinationId, price, time, vehiclesType});
        if (result) {
            res.json({
                message: "Transportation added successfully",
            });
        }
    }   
}