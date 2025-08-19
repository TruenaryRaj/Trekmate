import {uploadFileToCloudinary } from './fileHelper';
import { v4 as uuidv4 } from 'uuid';
import { File } from '../types';
import path from 'path';
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage }); // 5MB limit
export default upload;



export async function handleImageUpload(file?: File): Promise<string | undefined> {
  if (!file) return;

  const ext = path.extname(file.originalname);
  const uniqueFilename = `${uuidv4()}${ext}`;
    
  // Multer memoryStorage uses file.buffer, so we create a stream for Cloudinary
  const { Readable } = require('stream');
  const stream = Readable.from(file.buffer);
  return uploadFileToCloudinary(stream, uniqueFilename);
}
