import { Request, Response } from "express";
import { accomodationRepositories } from "../repositories/accomodation.repositories";
import { handleImageUpload } from "../utils";

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
        const accomodations = await accomodationRepositories.getAllAccomodation();
        res.json(accomodations);
    },

    async getAccomodationById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if(!id) {
            res.status(400).json({ error: 'Accomodation ID is required' });
        }
        const accomodation = await accomodationRepositories.getAccomodation(id);
        res.json(accomodation);
    }
}