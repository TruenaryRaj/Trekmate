import z from "zod";
import { bookingInputSchema, serviceEnum } from "../validations/booking-validation";

export type BookingInput = z.infer<typeof bookingInputSchema>
export type Service = z.infer<typeof serviceEnum>