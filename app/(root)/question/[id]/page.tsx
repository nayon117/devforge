import { getQuestionById } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }) => {
  const result = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
          className="flex items-center justify-center gap-1"
          href={`/profile/${result.author.clerkId}`}>
            <Image
              src={result.author.picture}
              alt="profile picture"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            Voting
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left" >
            {result.title}
        </h2>
      </div>

      <div>
      <Metric
            imgUrl= "/assets/icons/like.svg"
            alt="upvotes"
            value={formatAndDivideNumber(upVotes)}
            title="votes"
            textStyles="small-medium text-dark400_light800"
            />
            <Metric
            imgUrl= "/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers.length)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
            />
            <Metric
            imgUrl= "/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
            />
      </div>
    </>
  );
};
export default page;
