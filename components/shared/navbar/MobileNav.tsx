"use client"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
    const pathname = usePathname()
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length>1) || (pathname === item.route)
        return (
          <SheetClose asChild key={item.route}>
            <Link href={item.route}
             className={`${isActive ? 'primary-gradient rounded-lg text-gray-100 ' :'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4 `}
             >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
              />
              <p className={`${isActive? 'font-bold':'font-medium'}`} >{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="menu"
          className="text-gray-900 dark:text-white sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link className="flex items-center gap-1" href="/">
          <Image
            src="/assets/images/site-logo.svg"
            alt="devForge"
            height={23}
            width={23}
          />
          <p className="text-2xl font-bold text-gray-900 dark:text-white ">
            Dev<span className="text-orange-500">Forge</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="min-h-[41px] w-full rounded bg-gray-800 px-4 py-3 shadow-md">
                    <span className="text-orange-500">Login</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="light-border-2 min-h-[41px] w-full rounded bg-gray-800 px-4 py-3 shadow-md">
                    <span className="text-orange-500">Sign Up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
