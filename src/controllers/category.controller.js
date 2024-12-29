import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResnponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//only used by admin
const addCategory = asyncHandler( async(req, res) => {
    //get a caregory name from admin
    //check if it exists or not
    //if not exists make a categry
    //send a response to admin

    const { name } = req.body;

    if(name === "") {
        new ApiError(400, "Category field can not be empty.");
    }

    const category = await Category.findOne({name});

    if(!category) {
        new ApiError(409, "Category already Exist.");
    }

    const newCategory = await Category.create({name});

    const createdCategory = await Category.findById(newCategory._id);

    if(!createdCategory) {
        new ApiError(500, "Category creation is unsuccessful.");
    }

    return res.status(200).
    json(
        new ApiResponse(200, createdCategory, "Sucessfully created!.")
    );

})


const getAllCategory = asyncHandler( async (req, res) => {
    //get all the categories from db
    //send it as response

    try {
        const allCategory = await Category.find({});

        if(allCategory.length < 0) {
            new ApiError(404, "Category not found");
        }

        return res.status(200).
        json(
            new ApiResponse(200, allCategory, "All are here.......")
        );
    } catch (error) {
        new ApiError(401, error?.message, "Message during finding categories");
    }

})


export { addCategory, getAllCategory };