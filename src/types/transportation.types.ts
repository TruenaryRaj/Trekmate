import z from "zod";
import { transportationSchema } from "../validations";
import { vehiclesTypeSchema } from "../validations";

export type Transportation = z.infer< typeof transportationSchema>
export type VehiclesType = z.infer<typeof vehiclesTypeSchema>;

export type File = {
  fieldname: string;         // the name of the input field
  originalname: string;      // original filename uploaded by the user
  encoding: string;
  mimetype: string;          // file type, e.g., 'image/jpeg'
  buffer: Buffer;            // file contents as a Buffer
  size: number;              // file size in bytes
  stream: NodeJS.ReadableStream; // stream to read the file
};
