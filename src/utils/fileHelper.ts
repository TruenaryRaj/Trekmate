import fs from 'fs';
import path from 'path';
import  { v2 as cloudinary}  from 'cloudinary';
import env from 'dotenv';

env.config();

//function to store in the cloud 

 cloudinary.config({
    cloud_name: process.env.BUCKET_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
export const uploadFileToCloudinary = (stream: any, filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `${process.env.BUCKET_FOLDER_NAME}`, 
        public_id: filename,       
      },
      (error, result) => {
        if (error) return reject(error);
        if (result?.secure_url) return resolve(result.secure_url);
        reject(new Error('Upload failed without an error.'));
      }
    );

    stream.pipe(uploadStream);
  });
}
