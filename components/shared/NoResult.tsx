
interface Props {
    title: string;
    description: string;
    link: string;
    linkTitle: string;
  
}

const NoResult = ({title,description, link, linkTitle}:Props) => {
    return(
        <div>
             <p> Welcome to NoResult part </p>
        </div>
    )
}
export default NoResult;