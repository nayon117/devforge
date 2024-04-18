"use server";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";

// Get top interacted tags
export async function getTopInteractedTags(params:GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const {userId} = params;
    const user = await User.findById(userId)
    if(!user) throw new Error("User not found")

        // find interaction FOR THE users group by tag
        // sort by count
    
    return [{_id:"1", name:"tag1"},{_id:"2", name:"tag2"},{_id:"3", name:"tag3"}]

  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get all tags
export async function getAllTags(params: GetAllTagsParams) {
    try {
      connectToDatabase();
      
      const tags = await Tag.find({})
      return {tags}
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
