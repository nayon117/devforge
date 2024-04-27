import React from "react";

interface Props {
    _id: string;
    name: string;

}

const RenderTag: React.FC<Props> = ({_id, name}) => {
    return(
        <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
        <p className="paragraph-semibold text-dark300_light900">
            {name}
        </p>
    </div>
    )
}
export default RenderTag;