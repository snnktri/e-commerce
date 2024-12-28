import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req, res) => {
    //register user
    //get the data from the form
    res.status(200).json({
        message: "OK"
    })

})


export { registerUser }