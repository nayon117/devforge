"use server";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

// Get top interacted tags
export async function getTopInteractedTags(params:GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const {userId} = params;
    const user = await User.findById(userId)
    if(!user) throw new Error("User not found")

        // find interaction FOR THE users group by tag
        // sort by count
    
    return ['tag1', 'tag2', 'tag3']

  } catch (error) {
    console.log(error);
    throw error;
  }
}


// example
// export async function getUserById(params: any) {
//     try {
//       connectToDatabase();
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
