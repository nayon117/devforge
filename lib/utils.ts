import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getTimestamp(createdAt: string): string {
  // Assuming createdAt is a valid timestamp string
  const postDate = new Date(createdAt);
  const currentDate = new Date();

  const timeDifference = Math.abs(currentDate.getTime() - postDate.getTime());
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
  if (hoursDifference < 1) {
    // Less than an hour ago
    return 'just now';
  } else if (hoursDifference < 24) {
    // Hours ago
    return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
  } else if (hoursDifference < 48) {
    // Yesterday
    return 'yesterday';
  } else {
    // Days ago
    const daysDifference = Math.floor(hoursDifference / 24);
    return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
  }
}

export const formatAndDivideNumber = (num: number): string => {
  if(num >= 1000000){
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  }else if (num >=1000){
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  }else{
    return num.toString();
  }
}