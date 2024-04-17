"use server";

import Question from "../models/question.model";
import Tag from "../models/tag.model";
import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    connectToDatabase(); 
    const { title, content, tags, author } = params; // path

    // create question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];

    // create tags or get existing tags
    for(const tag of tags){
        const existingTag = await Tag.findOneAndUpdate(
            {name:{ $regex: new RegExp(`^${tag}$`, "i") }},
            {$setOnInsert:{name: tag}, $push: {question: question._id}},
            {upsert: true, new: true}
        )
        tagDocuments.push(existingTag._id)
    }
    await Question.findByIdAndUpdate(question._id, {$push: {tags: {$each: tagDocuments}}})
    
    // create an interaction record for user asked question

    // increment authors reputation by 5 for asking a question
  } catch (error) {}
}
