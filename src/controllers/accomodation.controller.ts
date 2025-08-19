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
            time
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

        const result = await accomodationRepositories.addAccomodation({name,  description, destinationId, price, time, urls: imageUrls});
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
}