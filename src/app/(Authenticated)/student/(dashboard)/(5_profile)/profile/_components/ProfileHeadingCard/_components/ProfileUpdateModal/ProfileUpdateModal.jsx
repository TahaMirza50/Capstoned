import React, { useEffect, useState } from "react";
import styles from "./ProfileUpdateModal.module.css";
import DropDown from "./_components/DropDown/DropDown";
import TimeTable from "./_components/TimeTable/TimeTable";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { callAPI } from "@/utils/helpers/callAPI";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import DropDownIndustries from "./_components/DropDownIndustries/DropDownIndustries";
import { FaTimes } from "react-icons/fa";
import { set } from "mongoose";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";

function ProfileUpdateModal({
  resume,
  industries,
  setOpenModal
}) {
  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const [list, setList] = useState(industries);
  const [resumeDoc, setResumeDoc] = useState(null);

  const [loading,setLoading] = useState(false)

  const handleAdd = (value) => {
    if (value === "All Categories") return;
    if (!list.includes(value)) {
      setList([...list, value]);
    }
  };

  const handleDelete = (indexToRemove) => {
    const updatedList = list.filter((_, index) => index !== indexToRemove);
    setList(updatedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = authDetails.accessToken;
    console.log(list, resumeDoc);

    setLoading(true)
    const response = await callAPI('PATCH', accessToken, BACKEND_ROUTES.updateProfileStudent, 
    {
      resume: resumeDoc,
      industries: list,
    }) 

    if(response.status === HttpStatusCode.Ok){
      setLoading(false)
      setOpenModal(false)
      router.refresh();
    }
    if(response.status === HttpStatusCode.Unauthorized){
      const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
        method: "POST",
      });
      if (responseLogOut.status === HttpStatusCode.Ok) {
        dispatch(removeAuthDetails());
        router.replace(FRONTEND_ROUTES.landing_page);
      }
    }

  };
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      class="backdrop-blur-md flex h-screen bg-gray-500 bg-opacity-50 items-center justify-center overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full overflow-y-auto"
    >
      <div class="p-4 w-full max-w-3xl max-h-full">
        <div class="bg-white shadow">
          <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
            <h3 class="font-semibold">Update Your Profile</h3>

            <button
              type="button"
              class="text-black bg-transparent hover:bg-red-500 hover:text-white rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="static-modal"
              disabled={loading}
              onClick={() => setOpenModal(false)}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Update Your Profile</span>
            </button>
          </div>

          <form className={`${styles.form} py-5 px-10  overflow-auto`}>

            <h1 className="font-semibold">Industries Details</h1>
            <hr className={`${styles.line} mb-6`} />

            <div className="flex flex-row items-center justify-start mb-3">
              <label htmlFor="dropdown" className="text-sm mr-5 text-black">
                Interests:
              </label>
              <DropDownIndustries
                list={list}
                handleAdd={handleAdd}
                placeHolder={"All categories"}
              />
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-2">
              {list.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="bg-blue-100 inline-flex justify-center items-center text-sm rounded-xl p-2 mr-2 my-1"
                >
                  {item}
                  <FaTimes
                    className="ml-2 text-xs hover:text-red-500"
                    onClick={() => handleDelete(index)}
                  />
                </button>
              ))}
            </div>

            <div className="pt-6">
            <h1 className="font-semibold">Resume</h1>
            <hr className={`${styles.line} mb-6`} />
            </div>

            <label htmlFor="document" className="text-sm block mb-3 text-black">
              Proposal Document: (File should be PDF format only and less than
              5MB)
            </label>
            <input
              class="mb-8 block w-1/2 text-xs text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              id="document"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setResumeDoc(e.target.files[0]);
              }}
            />

          </form>

          <div class="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 text-sm rounded-lg tracking-widest text-white bg-black border-2 border-black hover:text-gray-300"
              onClick={handleSubmit}
              disabled={loading}
            >
              Save
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 ms-3 rounded-lg text-sm tracking-widest text-black bg-white border-2 border-black hover:bg-gray-300 "
              onClick={() => setOpenModal(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdateModal;
