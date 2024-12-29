import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResnponse.js"


const addProduct = asyncHandler( async (req, res) => {
    //get the all details from the admin
    //verify category exists or not
    //verify product exists or not
    //upload the image to cloudinery
    //get the url from clouninery
    //save the product in databse
    //send the respose

    const {name, description, price, category, stock} = req.body;

    if(
        [name, description, category].some(data => data?.trim() === "") 
    ){
            throw new ApiError(400, "Name, description, category needed for a product.");
    }

    const categoryExist = await Category.findOne({
        name: category
    });

    if(!categoryExist) {
        throw new ApiError(404, "Category not found.");
    }

    const productExist = await Product.findOne({
        name
    });

    if(productExist) {
        throw new ApiError(409, "Product already exists.");
    }

    const filePath = req.file?.path;

    if(!filePath) {
        throw new ApiError(404, "File not found.");
    }
    const cloudinaryUrl = await uploadonCloudinary(filePath);

    console.log(cloudinaryUrl);

    if(!cloudinaryUrl) {
        throw new ApiError(404, "Image url not found.");
    }

    const product = await Product.create({
        name,
        description,
        price,
        category: categoryExist._id,
        stock,
        productImage: cloudinaryUrl.url,
    })

    const productCreated = await Product.findById(product._id);

    if(!productCreated) {
        throw new ApiError(500, "product is not created.");
    }

    return res.status(200).
    json(
        new ApiResponse(200, productCreated, "Product created successfully.")
    );
})

const getProducts = asyncHandler( async(req, res) => {
    //get all the products from the user
    //send response to user
    const products = await Product.find({});

    if(products.length < 1) {
        throw new ApiError(404, "Products are not availble.");
    }

    return res.status(200).
    json(
        new ApiResponse(200, products, "Product fetch successfully"
        )
    );
})


export { addProduct, getProducts };