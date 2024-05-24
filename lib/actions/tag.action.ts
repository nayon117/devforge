"use server";
import Question from "@/database/models/question.model";
import Tag, { ITag } from "../../database/models/tag.model";
import User from "../../database/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";

// Get top interacted tags
export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // find interaction FOR THE users group by tag
    // sort by count

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get all tags
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery,filter,page = 1, pageSize = 2 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query:FilterQuery<typeof Tag> = {}

    if(searchQuery){
      query.$or = [
        {name: { $regex: new RegExp(searchQuery, "i") } }
      ]
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 }
        break;
      case "recent":
        sortOptions = { createdAt: -1 }
        break;
      case "name":
        sortOptions = { name: 1 }
        break;
      case "old":
        sortOptions = { createdAt: 1 }
        break;
    
      default:
        break;
    }

    const tags = await Tag.find(query)
    .skip(skipAmount)
    .limit(pageSize)
    .sort(sortOptions);
   
    const totalTags = await Tag.countDocuments(query);

      const isNext = totalTags > skipAmount + tags.length;

    return { tags,isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// example
export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 2, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = {_id:tagId}
    
    const tag = await Tag.findOne(tagFilter).populate({
      path:'questions',
     model:Question,
      match:searchQuery 
      ? { title: { $regex: searchQuery,$options:'i' } } : {},
      options:{
        sort:{createdAt:-1},
        skip:skipAmount,
        limit:pageSize+1
      },
      populate:[
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name picture'}
      ]
    })
    const isNext = tag.questions.length > pageSize;

    if(!tag) throw new Error('Tag not found')

      const questions = tag.questions;
      return {tagTitle:tag.name, questions,isNext}


  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" }}},
      { $sort: { numberOfQuestions: -1 }}, 
      { $limit: 5 }
    ])

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}