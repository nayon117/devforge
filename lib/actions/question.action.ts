"use server";

import { revalidatePath } from "next/cache";
import Question from "../../database/models/question.model";
import Tag from "../../database/models/tag.model";
import User from "../../database/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import Answer from "@/database/models/answer.model";
import Interaction from "@/database/models/interaction.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;

    // create question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];

    // create tags or get existing tags
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record for user asked question

    // increment authors reputation by 5 for asking a question
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if(hasupVoted){
      updateQuery = { $pull: { upvotes: userId } }
    }else if (hasdownVoted){
      updateQuery = { 
        $pull: { downvotes: userId },
        $push: { upvotes: userId } }
    }else{
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if(!question) throw new Error("Question not found");

    // Increment author reputation
    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if(hasdownVoted){
      updateQuery = { $pull: { downvotes: userId } }
    }else if (hasupVoted){
      updateQuery = { 
        $pull: { upvotes: userId },
        $push: { downvotes: userId } }
    }else{
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if(!question) throw new Error("Question not found");

    // Increment author reputation
    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId }});

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}