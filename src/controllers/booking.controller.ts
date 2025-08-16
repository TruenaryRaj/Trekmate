import { Request, Response } from "express";
import { transportationBookingRepositories } from "../repositories/transportation-booking.repositories";


export const bookingController = {
    async createBooking(req: Request, res: Response) {
        const userId = req.user?.id;
        console.log(userId, req.user?.email)
        if(!userId){
            throw new Error("unauthorized user");
            
        }
        const{ transportationId, date} = req.body;
        const result = await transportationBookingRepositories.createBooking({ userId, transportationId, date });
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