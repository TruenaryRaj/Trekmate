import { Request, Response } from "express";
import { bookingRepositories } from "../repositories/booking.repositories";


export const bookingController = {
    async createBooking(req: Request, res: Response) {
        const userId = req.user?.id;
        console.log(userId, req.user?.email)
        if(!userId){
            throw new Error("unauthorized user");
            
        }
        const{ serviceType, serviceId, date} = req.body;
        console.log( userId, serviceType, serviceId, date);
        const result = await bookingRepositories.createBooking({ userId, serviceType, serviceId, date });
        if(result) {
            res.json({
                message: "booking done"
            })
        }
    },
    async editBooking(req: Request, res:Response) {
        const { serviceType, serviceid } = req.body;

    }
}