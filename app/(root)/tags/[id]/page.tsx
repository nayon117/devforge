import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { IQuestion } from "@/database/models/question.model";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

const TagDetails =async ({params,searchParams}:URLProps) => {
    const result = await getQuestionsByTagId({
        tagId:params.id,
        page:searchParams.page ? +searchParams.page : 1,
        searchQuery:searchParams.q 
    })

    return (
        <>
        <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
  
        <div className="mt-11 w-full">
          <LocalSearchbar
            route={`/tags/${params.id}`}
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search Tag questions"
            otherClasses="flex-1"
          />
        </div>
      
  
        <div className="mt-10 flex w-full flex-col gap-6">
          {result.questions.length > 0 ? (
            result.questions.map((question:IQuestion) => (
              <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResult
              title="No Tags Found"
              description="No tags found for this search query. Please try again with a different search query."
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )}
        </div>
        <div className="mt-10">
      <Pagination
      pageNumber = {searchParams?.page ? +searchParams.page : 1}
      isNext = {result.isNext}
      />
      </div>
      </>
    )
}
export default TagDetails;