import z from "zod";
import { transportationBooking, statusEnum, accomodationBooking } from "../validations/booking-validation";

export type TransportationBooking = z.infer<typeof transportationBooking>
export type AccomodationBooking = z.infer<typeof accomodationBooking>
export type StatusEnum = z.infer<typeof statusEnum>