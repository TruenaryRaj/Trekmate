import { Request, Response } from "express";
import { transportationRepositories } from "../repositories";
import { handleImageUpload } from "../utils";

export const transportationController = {
    async addTransportation(req: Request, res: Response) {
        const {
            destinationId,
            price,
            time,
            vehiclesType
        } = req.body;


        console.log(req.body);

        const files = req.files as Express.Multer.File[]; // Multer files
                let imageUrls = [] ;
                if (files) {
                for (const file of files ) {
                    try {
                    const imageUrl = await handleImageUpload(file);
                    if(imageUrl) imageUrls.push(imageUrl);
                    } catch (error) {
                    res.status(500).json({ error: 'Failed to upload image' });
                    }
                }
                } else {
                    res.status(400).json({ error: 'No images provided' });
                }

        const result = await transportationRepositories.addTransportation({
            destinationId, price, time, vehiclesType, urls: imageUrls});
        if (result) {
            res.json({
                message: "Transportation added successfully",
            });
        }
    },
    
    async getTransportations(req: Request, res: Response) {
        const transportations = await transportationRepositories.getAllTransportation();
        res.json(transportations);
    },
}