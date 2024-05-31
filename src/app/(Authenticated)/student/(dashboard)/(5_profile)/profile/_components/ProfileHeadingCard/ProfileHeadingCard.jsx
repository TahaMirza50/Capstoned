'use client'
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./ProfileHeadingCard.module.css";
import ProfileUpdateModal from "./_components/ProfileUpdateModal/ProfileUpdateModal";

function ProfileHeadingCard({industries, resume}) {
    const [openModal, setOpenModal] = useState(false);

    return (
    <div
      className= "flex flex-row items-center w-full justify-between"
    >
      <div className="flex flex-row items-center">
        <h1
          className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}
        >
          My Profile
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />
      </div>

      <FaEdit className="h-5 w-5 hover:text-red-500" onClick={()=>setOpenModal(true)}/>

      {openModal && <ProfileUpdateModal
          setOpenModal={setOpenModal}
          industries={industries}
          resume={resume}
        />}
    </div>
  );
}

export default ProfileHeadingCard;
