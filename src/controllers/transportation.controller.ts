import { Request, Response } from "express";
import { transportationRepositories } from "../repositories";
import { handleImageUpload } from "../utils";
import { SortOrder } from "../types/input.types";

export const transportationController = {
    async addTransportation(req: Request, res: Response) {
        const {
            destinationId,
            price,
            vehiclesType,
            grade, 
        } = req.body;

        const files = req.files as Express.Multer.File[]; // Multer files
                let imageUrls = [] ;
                if (files) {
                for (const file of files ) {
                    try {
                    const imageUrl = await handleImageUpload(file);
                    if(imageUrl) imageUrls.push(imageUrl);
                    } catch (error) {
                        res.status(500).json({ error: (error as Error).message });
                    }
                }
                } else {
                    res.status(400).json({ error: 'No images provided' });
                }

        const result = await transportationRepositories.addTransportation({
            destinationId, price, vehiclesType, grade, urls: imageUrls
        });
        if (result) {
            res.json({
                message: "Transportation added successfully",
            });
        }
    },

    async getTranspotrationById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if(!id) {
            res.status(400).json({ error: 'Transpotration ID is required' });
        }
        const Transpotration = await transportationRepositories.getTransportation(id);
        res.json(Transpotration);
    },

    async getTransportations(req: Request, res: Response) {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
        const sortBy = req.query.sortBy as SortOrder || 'asc'; 
        const transportations = await transportationRepositories.getAllTransportation({ page, limit, sortBy });
        res.json(transportations);
    },

    async deleteTransportation(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            await transportationRepositories.deleteTransportation(id);
            res.status(200).json({ message: 'Transportation deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }   
    }
}