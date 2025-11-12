import { Request, Response } from "express";
import { accomodationRepositories } from "../repositories/accomodation.repositories";
import { handleImageUpload } from "../utils";
import { SortOrder } from "../types/input.types";

export const accomodationController = {
    async addAccomodation(req: Request, res: Response) {
        const { 
            name, 
            description,
            destinationId,
            price,
        } = req.body;
      
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

        const result = await accomodationRepositories.addAccomodation({name,  description, destinationId, price, urls: imageUrls});
        if(result)
        {
            res.json({
                message: "accomodation added"
            })
        }
    },

    async getAccomodations(req: Request, res: Response) {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
        const sortBy = req.query.sortBy as SortOrder || 'asc'; 
        try {
        const accomodations = await accomodationRepositories.getAllAccomodation({ page, limit, sortBy });
        res.json(accomodations);
        } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve accomodations' });
        }
    },

    async getAccomodationById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if(!id) {
            res.status(400).json({ error: 'Accomodation ID is required' });
        }
        const accomodation = await accomodationRepositories.getAccomodation(id);
        res.json(accomodation);
    },

    async deleteAccomodation(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            await accomodationRepositories.deleteAccomodation(id);
            res.status(200).json({ message: 'Accomodation deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}