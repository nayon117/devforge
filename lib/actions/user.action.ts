"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, UpdateUserParams } from "./shared.types";

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