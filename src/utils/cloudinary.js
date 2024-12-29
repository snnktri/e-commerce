import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECTET
});

const uploadonCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return;
        //upload on cloudinary

        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("Sucess of image uploaded")
        console.log(responce.url);
        return responce;
        //fs.unlinkSyn(localFilePath);
    }
    catch(error) {
        fs.unlinkSync(localFilePath);
        console.error("Error on uploading image: "+error.message);
        return null
    }
}



export { uploadonCloudinary };

