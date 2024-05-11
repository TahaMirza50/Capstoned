"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHistory } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaC } from "react-icons/fa6";

function TabButtons() {
  const router = useRouter();
  const route = usePathname();

  const getPageName = (route) => {
    let firstSlash = route.indexOf("/");
    let secondSlash = route.substring(firstSlash + 1).indexOf("/");
    let thirdSlash = route
      .substring(firstSlash + 1)
      .substring(secondSlash + 1)
      .indexOf("/");
    let pageName = route
      .substring(firstSlash + 1)
      .substring(secondSlash + 1)
      .substring(thirdSlash + 1);
    
    if (pageName !== "my-proposals") {
      return (
        <ul class="flex flex-row w-full justify-evenly text-sm text-center text-gray-500 dark:text-gray-400 font-semibold">
          <li className="w-1/2 border-b-2 border-gray-300">
            <button
              onClick={() => {
                router.replace("/student/my-proposals");
              }}
              className="inline-flex items-center justify-center p-3 hover:text-gray-600 group"
              aria-current="page"
            >
              My Proposals 
            </button>
          </li>
          <li className="w-1/2 border-t-2 border-x-2 rounded-t-lg border-gray-300 flex items-end justify-center">
            <button
              disabled
              class="inline-flex items-center justify-center p-3 text-blue-500 border-b-2 border-blue-500 rounded-t-lg active cursor-default group"
              aria-current="page"
            >
              Proposals By Others
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex flex-row w-full justify-evenly text-sm text-center text-gray-500 dark:text-gray-400 font-semibold">
          <li className="w-1/2 border-t-2 border-x-2 rounded-t-lg border-gray-300 flex items-end justify-center">
            <button
              disabled
              class="inline-flex items-center justify-center p-3 text-blue-500 border-b-2 border-blue-500 rounded-t-lg active cursor-default group"
              aria-current="page"
            >
              My Proposals
            </button>
          </li>
          <li className="w-1/2 border-b-2 border-gray-300">
            <button
              onClick={() => {
                router.replace("/student/other-proposals");
              }}
              className="inline-flex items-center justify-center p-3 hover:text-gray-600 group"
              aria-current="page"
            >
              Proposals By Others
            </button>
          </li>
        </ul>
      );
    }
  };

  return <div>{getPageName(route)}</div>;
}

export default TabButtons;
