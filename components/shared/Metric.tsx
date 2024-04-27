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
      <Image src={imgUrl} alt={alt} width={20} height={20} />
      <span>{value}</span>
      <span>{title}</span>
    </div>
  );
};

export default Metric;
