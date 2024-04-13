/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center  bg-gray-800 dark:bg-gray-100 shadow-light-300 fixed z-50 w-full gap-5 p-6 sm:px-12 dark:shadow-none">
      <Link className="flex items-center gap-1" href="/">
        <Image
          src="/assets/images/site-logo.svg"
          alt="devForge"
          height={23}
          width={23}
        />
        <p className="text-2xl font-bold font-spaceGrotesk text-gray-100 dark:text-gray-900 max-sm:hidden">
          Dev<span className="text-orange-500">Forge</span>
        </p>
      </Link>

      {/* globarl search */}
      <div>
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        
      </div>
    </nav>
  );
};
export default Navbar;
