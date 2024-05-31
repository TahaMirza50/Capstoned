import React from "react";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { redirect } from "next/navigation";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { callAPI } from "@/utils/helpers/callAPI";

async function ProfileCardTwo({semester, gpa, industries, groupID}) {
  
  const group = await getGroup(groupID);

  const tailwindColorClasses = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-gray-100",
  ];

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColorClasses.length);
    return tailwindColorClasses[randomIndex];
  };

  return (
    <div className="flex flex-col ml-5 mr-14 my-5 items-center justify-start font-montserrat text-black">
      <form className="w-full">
        <div className="flex flex-row items-center mb-5 text-sm justify-start">
          <h1 className="block font-semibold">Group :</h1>
          <p className="block ml-2 font-normal">{group ? group.data.name: "Group has not been created."}</p>
        </div>
        <div className="flex flex-row items-center mb-5 text-sm justify-start">
          <h1 className="block font-semibold">Semester :</h1>
          <p className="block ml-2 font-normal">{semester}</p>
        </div>
        <div className="flex flex-row items-center mb-5 text-sm justify-start">
          <h1 className="block font-semibold">GPA :</h1>
          <p className="block ml-2 font-normal">{gpa}</p>
        </div>

        <h1 className="block font-semibold text-sm mb-2">
          Industries Interest :
        </h1>

        {industries.map((item, index) => {
          const randomColorClass = generateRandomColor();
          return (
            <button
              key={index}
              type="button"
              className={`${randomColorClass} inline-flex justify-center items-center rounded-xl p-2 text-xs mr-2 my-1 `}
            >
              {item}
            </button>
          );
        })}

       
        
      </form>
    </div>
  );
}

export default ProfileCardTwo;

async function getGroup(groupID) {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getGroupDetails +"?id=" + groupID);
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  }
  if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
