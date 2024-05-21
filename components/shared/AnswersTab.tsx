import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
    const result = await getUserAnswers({
        userId,
        page: 1,
      });
  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          clerkId={clerkId} 
          author={item.author}
          upvotes={item.upvotes}
          question={item.question}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
};
export default AnswersTab;