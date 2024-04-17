
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  _id: string;
  title: string;
  tags: string[];
  author: string;
  upVotes: number;
  views: number;
  answers: number;
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
        <CardTitle>{title}</CardTitle>
         
      </CardHeader>
      <CardContent>
         
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  );
};
export default QuestionCard;
