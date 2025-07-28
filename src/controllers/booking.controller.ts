import { NextFunction, Request, Response } from "express";
import { bookingRepositories } from "../repositories/booking.repositories";

export const bookingController = {
    async createBooking(req: Request, res: Response, next: NextFunction) {
        const{ userId, serviceType, serviceId} = req.body;
        const result = await bookingRepositories.createBooking(userId, serviceType, serviceId);
        if(result) {
            res.json({
                message: "booking done"
            })
        }
    }
}