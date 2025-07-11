import z from "zod";
import { bookingSchema, serviceEnum } from "../validations/booking-validation";

export type Booking = z.infer<typeof bookingSchema>
export type Service = z.infer<typeof serviceEnum>