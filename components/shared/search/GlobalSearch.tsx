import Image from "next/image";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="relative flex min-h-[56px] grow items-center gap-1 rounded-xl bg-gray-100 px-4 dark:bg-gray-800 ">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="search globaly"
          value=""
          className="placeholder text-dark400_light700 border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};
export default GlobalSearch;
