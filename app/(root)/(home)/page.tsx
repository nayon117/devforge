import NoResult from "@/components/cards/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

const Home = async () => {
  const result = await getQuestions({});
  console.log(result.questions);
  return (
    <>
      <div className="flex w-full flex-row-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[48px] px-4 py-3 !text-light-900">
            {" "}
            Ask a Question{" "}
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
       {result.questions.length > 0 ? (
        result.questions.map((question)=>(
          <QuestionCard  
          key={question._id}
          _id={question._id}
          title={question.title} 
          tags={question.tags}
          author={question.author}
          upVotes={question.upVotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
          />
        ))
       ) : (
        <NoResult 
        title="No Questions Found"
        description="No questions found in the database. Please check back later"
        link= "/ask-question"
        linkTitle="Ask a Question"
        />
       )}
      </div>
    </>
  );
};
export default Home;
