"use server"

import { CloudFog } from "lucide-react";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose"


export async function getUserById(params:any) {
    try {
        connectToDatabase()

        const {userId} = params;
        const user  = await User.findOne({clerkId: userId})
        return user;

    } catch (error) {
        console.log(error);
    }
}