import { Image, RelatedType } from "../types/image.types";
import { db } from "../db/db";
import { image } from "../db/schema";
import { and, eq } from "drizzle-orm";

export const imageRepositories = {
    async addImage(input : Image) {
        const { url, relatedId, relatedTypes } = input;

        const [result] = await db.insert(image).values({
            url,
            relatedId,
            relatedTypes
        });

        return result.insertId;
    },

    async deleteImageByRelatedId(relatedId: number, relatedTypes: RelatedType) {
        try {
            await db.delete(image).where(and(eq(image.relatedId, relatedId), eq(image.relatedTypes, relatedTypes)));
        } catch (error) {
            throw new Error('Failed to delete images');
        }
    }
}