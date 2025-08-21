import { NextFunction, Request, Response } from "express";
import { destinationRepositories } from "../repositories/destination.repositories";
import { handleImageUpload } from "../utils";

export const destinationController = {
    async addDestination (req: Request, res: Response) {
            const { name, description, shortDescription, highestElivation, region } = req.body;

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

            const result = await destinationRepositories.addDestination({name, description, shortDescription, highestElivation, region, urls: imageUrls});
            if(result) {
                res.json({
                    message: "inserted"
                })
            }
    },

    async getDestinationById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({ error: 'Destination ID is required' });
        }
        const { page, limit, sortBy } = req.body;
       
        const destinations = await destinationRepositories.getDestinationById(id, {page, limit, sortBy});
        res.json(destinations);
    },

    async getAllDestinations(req: Request, res: Response) {
        const { page, limit, sortBy } = req.body;
        const destinations = await destinationRepositories.getAllDestination({page, limit, sortBy});
        res.json(destinations);
    }
}