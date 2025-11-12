import { NextFunction, Request, Response } from "express";
import { destinationRepositories } from "../repositories/destination.repositories";
import { handleImageUpload } from "../utils";
import { SortOrder } from "../types/input.types";

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
       
        const destinations = await destinationRepositories.getDestinationById(id);
        res.json(destinations);
    },

    async getAllDestinations(req: Request, res: Response) {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
        const sortBy = req.query.sortBy as SortOrder || 'asc'; 
        const destinations = await destinationRepositories.getAllDestination({page, limit, sortBy});
        res.json(destinations);
    },

    async deleteDestination(req: Request, res: Response) {
        const id = req.body;
        try {
            await destinationRepositories.deleteDestination(id);
            res.status(200).json({ message: 'Destination deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete destination' });
        }   
    }
}