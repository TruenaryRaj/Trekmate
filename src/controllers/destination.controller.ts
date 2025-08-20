import { NextFunction, Request, Response } from "express";
import { destinationRepositories } from "../repositories/destination.repositories";
import { handleImageUpload } from "../utils";

export const destinationController = {
    async addDestination (req: Request, res: Response) {
            const { name, description, shortDescription} = req.body;

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

            const result = await destinationRepositories.addDestination({name, description, shortDescription, urls: imageUrls});
            if(result) {
                res.json({
                    message: "inserted"
                })
            }
    },

    async getDestinations(req: Request, res: Response) {
        const destinations = await destinationRepositories.getAllDestination();
        res.json(destinations);
    },
}