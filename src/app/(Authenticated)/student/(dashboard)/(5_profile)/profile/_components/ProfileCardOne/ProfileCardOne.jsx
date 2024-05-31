import Image from "next/image";
import React from "react";
import { RiProfileLine } from "react-icons/ri";
import ProfileImageCard from "../ProfileImageCard/ProfileImageCard";

function ProfileCardOne({ studentID, firstName, lastName, gender, contact, email, profileImage, erp, program, resume }) {
  return (
    <div className="relative flex flex-col py-5 h-auto items-center justify-center bg-blue-50 m-5 rounded-xl">
      <div className="absolute top-4 left-4">
        <RiProfileLine className="h-6 w-6"/>
      </div>
      
      
        <ProfileImageCard studentID={studentID} profileImage={profileImage}/>

      <div className="flex flex-col w-full justify-start items-center p-5 space-y-1">
        <p className="font-montserrat font-semibold text-lg">{firstName} {lastName}</p>
        <p className="font-montserrat font-semibold text-base">{program}</p>
        {/* //Add link for resume */}
        <a
          href={resume.file}
          className="font-montserrat font-semibold text-sm text-blue-500" target="_blank" rel="noreferrer" > 
          Resume 
        </a>
        <p className="font-montserrat font-normal text-sm text-neutral-500">ERP: {erp}</p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
          {email}
        </p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            Gender: {gender}
        </p>
        {/* <p className="font-montserrat font-normal text-sm text-neutral-500">
            Role: Student
        </p> */}
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            Contact: {contact}
        </p>
      </div>
    </div>
  );
}

export default ProfileCardOne;
