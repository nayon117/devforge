
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber } from "@/lib/utils";

interface Props {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author:{ name: string; picture: string , _id?: string};
  upVotes: number;
  views: number;
  answers: number[]
  createdAt: string;
}


const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upVotes,
  views,
  answers,
  createdAt,
}: Props) => {
  return (
    <Card>
      <CardHeader>
       <Link href={`question/${_id}`} >
       <CardTitle>{title}</CardTitle>
       </Link>
         <div className="mt-3.5 flex flex-wrap gap-2">
          {tags.map((tag,index) => (
             <RenderTag key={index} _id={tag._id} name={tag.name} />
          ))}
         </div>

         <div className="flex-between mt-6 w-full flex-wrap gap-3">
            <Metric
            imgUrl= {author.picture}
            alt="user"
            value={author.name}
            // title={` - asked ${getTimestamp(createdAt)}`}
            title="user"
            href={`/profile/${author._id}`}
            isAuthor
            className="body-medium text-dark400_light700"
            />
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
      </CardHeader>
      <CardContent>
         
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  );
};
export default QuestionCard;
