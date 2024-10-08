import Image from "next/image";
import React from "react";
import { RiProfileLine } from "react-icons/ri";

function ProfileCardOne() {
  return (
    <div className="relative flex flex-col py-5 h-auto items-center justify-center bg-blue-50 m-5 rounded-xl">
      <div className="absolute top-4 left-4">
        <RiProfileLine className="h-6 w-6"/>
      </div>
      
      <div className="relative h-36 w-36 rounded-full overflow-hidden mb-3">
        <Image
          alt={"Image Cannot be loaded"}
          src="https://firebasestorage.googleapis.com/v0/b/capstoned-5463f.appspot.com/o/profile_picture%2F65df4b533c513b8b0d83b69d.jpg?alt=media&token=cab7f3cb-a892-4175-a69d-afb8c1e58ff6"
          fill
        />
      </div>

      <div className="flex flex-col w-full justify-start items-center p-5 space-y-1">
        <p className="font-montserrat font-semibold text-lg">Taha Mirza</p>
        <p className="font-montserrat font-semibold text-base">BSCS</p>
        {/* //Add link for resume */}
        <a
          href="https://firebasestorage.googleapis.com/v0/b/capstoned-5463f.appspot.com/o/resume%2F65df4b533c513b8b0d83b69d.pdf?alt=media&token=1d8b3e2d-6d6a-4e3d-9c5a-3b0b1f5b3b5b"
          className="font-montserrat font-semibold text-sm text-blue-500" target="_blank" rel="noreferrer" > 
          Resume 
        </a>
        <p className="font-montserrat font-normal text-sm text-neutral-500">ERP: 23010</p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
          t.mirza.22808@khi.iba.edu.pk
        </p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            Gender: Male
        </p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            Role: Student
        </p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            Contact: 03123456789
        </p>
      </div>
    </div>
  );
}

export default ProfileCardOne;
