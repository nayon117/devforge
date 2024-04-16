import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 fixed z-50 flex  w-full items-center justify-between gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link className="flex items-center gap-1" href="/">
        <Image
          src="/assets/images/site-logo.svg"
          alt="devForge"
          height={23}
          width={23}
        />
        <p className="h2-bold  font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Forge</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex items-center">
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
        <MobileNav />
      </div>
    </nav>
  );
};
export default Navbar;
