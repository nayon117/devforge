"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, UpdateUserParams } from "./shared.types";
import Question from "../models/question.model";

// Get USER BY ID
export async function getUserById(params:any) {
    try {
        connectToDatabase()

        const {userId} = params;
        const user  = await User.findOne({clerkId: userId})
        return user;

    } catch (error) {
        console.log(error);
        throw error
    }
}

// CREATE USER
export async function createUser(userData:CreateUserParams) {
    try {
        connectToDatabase()
        const newUser = await User.create(userData)
        return newUser
    } catch (error) {
        console.log(error);
        throw error
    }
}

// UPDATE USER
export async function updateUser(params:UpdateUserParams) {
    try {
        connectToDatabase()
       
        const {clerkId, updateData , path} = params;
        await User.findOneAndUpdate({clerkId}, updateData, {new: true})
        revalidatePath(path)
    } catch (error) {
        console.log(error);
        throw error
    }
}

// DELETE USER
export async function deleteUser(params:DeleteUserParams) {
    try {
        connectToDatabase()
       
       const {clerkId} = params;
       const user = await User.findOneAndDelete({clerkId})
       if(!user) throw new Error("User not found")

        // TODO: Delete all user related data
        // get user questions id
        // const userQuestionIds = await Question.find({author: user._id}).distinct("_id")

        // delete user questions
        await Question.deleteMany({author: user._id})

        // todo:delete answers of user

        const deletedUser = await User.findByIdAndDelete(user._id)
        return deletedUser;

    } catch (error) {
        console.log(error);
        throw error
    }
}

// Get all user
export async function getAllUsers(params:GetAllUsersParams) {
    try {
        connectToDatabase()

        // const {page=1, pageSize=20, filter, searchQuery} = params;
        const users  = await User.find({})
        .sort({createdAt: -1})
        
        return{users};

    } catch (error) {
        console.log(error);
        throw error
    }
}