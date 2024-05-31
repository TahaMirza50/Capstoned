import React from "react";
import styles from "./StudentProfilePage.module.css";
import ProfileCardOne from "./_components/ProfileCardOne/ProfileCardOne";
import ProfileCardTwo from "./_components/ProfileCardTwo/ProfileCardTwo";
import ProfileHeadingCard from "./_components/ProfileHeadingCard/ProfileHeadingCard";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { redirect } from "next/navigation";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { callAPI } from "@/utils/helpers/callAPI";

export const metadata = {
  title: "Student Profile",
  description:
    "Capstoned Student Home | Final Year Project (FYP) Management Platform for College & University Students.",
};

async function Profile() {
  const profile = await getProfile();
  
  return (
    <div
      className={`${styles.contentWrapper} w-full h-full pt-6 px-5 flex flex-col justify-evenly items-start font-montserrat`}
    >
      <div
        className={`${styles.contentCardTitleContainer} p-3 flex flex-row w-full rounded-xl`}
      >
        <ProfileHeadingCard />
      </div>

      <div className="flex flex-row items-center justify-center w-full space-x-10 h-5/6">
        <div
          className={`${styles.contentCardContainer} h-full w-1/3 rounded-xl`}
        >
          <ProfileCardOne
            studentID={profile.student._id}
            firstName={profile.student.firstName}
            lastName={profile.student.lastName}
            gender={profile.student.gender}
            contact={profile.student.contact}
            email={profile.email}
            profileImage={profile.student.profileImage}
            erp={profile.student.studentID}
            resume={profile.student.resume}
            program={profile.student.program}
          />
        </div>
        <div
          className={`${styles.contentCardContainer} h-full w-2/3 rounded-xl`}
        >
          <ProfileCardTwo
          semester={profile.student.semester}
          gpa={profile.student.gpa}
          industries={profile.student.industriesOfInterest}
          groupID={profile.student.group}
          />
        </div>
      </div>
    </div>
  );


}

export default Profile;

async function getProfile() {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getProfile);
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  }
  if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}

