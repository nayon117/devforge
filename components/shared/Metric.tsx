import Image from "next/image";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  isAuthor?: boolean;
  className?: string;
  textStyles?: string;
}

const Metric: React.FC<MetricProps> = ({ imgUrl, alt, value, title }) => {
  return (
    <div>
      <div className="mt-2.5 flex items-center gap-2">
        <Image
          src={imgUrl}
          alt={alt}
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-dark400_light700">{value}</span>
      </div>
      {/* <span>{title}</span> */}
    </div>
  );
};

export default Metric;
