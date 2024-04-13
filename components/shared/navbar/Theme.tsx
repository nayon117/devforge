/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
"use client";
import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger>
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun image"
              width={20}
              height={20}
              //   className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon image"
              width={20}
              height={20}
              //   className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] border py-2 rounded dark:border-gray-700 dark:bg-gray-900 bg-white text-gray-900">
          {themes.map((item) => (
            <MenubarItem 
            className="flex items-center gap-4  px-2.5 py-2"
            key={item.value} onClick={()=>{
              setMode(item.value)
              if(item.value !== 'system'){
                localStorage.theme = item.value
              }else{
                localStorage.removeItem('theme')
              }
            }}>
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                className={`${mode === item.value && "active-theme"}`}
              />
              <p className="text-gray-500">{item.label}</p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default Theme;
