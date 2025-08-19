import { Image } from "../types/image.types";
import { db } from "../db/db";
import { image } from "../db/schema";

export const imageRepositories = {
    async addImage(input : Image) {
        const { url, relatedId, relatedTypes } = input;

        const [result] = await db.insert(image).values({
            url,
            relatedId,
            relatedTypes
        });

        return result.insertId;
    }
}