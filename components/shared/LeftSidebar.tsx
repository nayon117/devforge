"use client";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r bg-white p-6 pt-36 shadow-gray-100 dark:bg-gray-800 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${isActive ? "primary-gradient rounded-lg text-gray-100 " : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
              />
              <p className={`${isActive ? "font-bold" : "font-medium text-gray-500"} max-lg:hidden`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="min-h-[41px] w-full rounded bg-gray-800 px-4 py-3 shadow-md">
                <Image 
                src='/assets/icons/account.svg'
                alt="login"
                width={20}
                height={20}
                className="lg:hidden"
                 />
              <span className="text-orange-500 max-lg:hidden">Log In</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="light-border-2 min-h-[41px] w-full rounded bg-gray-800 px-4 py-3 shadow-md">
            <Image 
                src='/assets/icons/sign-up.svg'
                alt="sign up"
                width={20}
                height={20}
                className="lg:hidden"
                 />
              <span className="text-orange-500 max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};
export default LeftSidebar;
