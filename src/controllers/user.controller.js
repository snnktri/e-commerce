import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
//import { enableCompileCache } from "node:module";
import { ApiResponse } from "../utils/ApiResnponse.js";
import mongoose from "mongoose";

const generateAccessAndRefreshToekn = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating access and refresh token.");
    }
}

const registerUser = asyncHandler( async (req, res) => {
    //register user
    //get the data from the form
    // res.status(200).json({
    //     message: "OK"
    // })

    //regiater user
    // get the data from the form
    //check email, password or username is not emty or not
    //check user is alreay exist or not
    //decrypt password
    //verify password
    //insert data in datamodel
    //remove password and refresh token field from response
    //check for ussr creattion
    //send response(return)

    const { username, email, password } = req.body;
    //console.log(req.body);


    if(
        [username, email, password].some((data) => data?.trim() === "")
    ) {
        throw new ApiError(400, "All fileds are required");
    }

   const existedUser = await User.findOne(
        {
            $or :[{username}, {email}]
        }
    )

    if(existedUser) {
        throw new ApiError(409, "User is already exist.")
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Error occured during creating user")
    }

    return res.status(201).
    json(
        new ApiResponse(200, createdUser, "Created user successfullu"
        )
    )
});

const loginUser = asyncHandler( async (req, res) => {
    //req -> data
    //username or email
    // find the user
    //password check
    //access and refresh token
    //send to user this token as cookie (secure)

    const { email, username, password } = req.body
    console.log(req.body)
    if(!username && !email) {
        throw new ApiError(400, "Username or Email is required.");
    } 

    const user = await User.findOne({
        $or: [ {email}, {username}]
    });

    if(!user) {
        throw new ApiError(404, "User not found.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Password is not correct.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToekn(user._id);

    const loggedUser =  await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.
    status(200).
    cookie("accessToken", accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json(
        new ApiResponse(200, {
            user: loggedUser, accessToken,
            refreshToken
        }, "User logged successfully")
    );
});

const logoutUser = asyncHandler( async (req, res) => {
    //remove cookies
    //remove refresh Token
    //finduser

    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined,
        }
    },
{
    new: true
})

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.
  status(200).
  clearCookie("accessToken", options).
  clearCookie("refreshToken", options).
  json(
    new ApiResponse(200, {}, "User logged out successfully")
    );
})


export { registerUser,
    loginUser,
    logoutUser
 }