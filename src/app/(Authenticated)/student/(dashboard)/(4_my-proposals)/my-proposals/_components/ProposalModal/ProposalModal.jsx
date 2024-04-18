import React, { useState } from "react";
import styles from "./ProposalModal.module.css";
import DropDown from "./_components/DropDown/DropDown";
import { FaTimes } from "react-icons/fa";

function ProposalModal({ setOpenModal, oldTitle, oldDescription, oldMentorship, oldList}) {
  const [title, setTitle] = useState(oldTitle || "");
  const [description, setDescription] = useState( oldDescription || "");
  const [mentorship, setMentorship] = useState(oldMentorship || false);

  const [list, setList] = useState(oldList || []);

  const handleAdd = (value) => {
    if (value === "All Categories") return;
    if (!list.includes(value)) {
      setList([...list, value]);
    }
  }

  const handleDelete = (indexToRemove) => {
    const updatedList = list.filter((_, index) => index !== indexToRemove);
    setList(updatedList);
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
            <h3 class="font-semibold text-base text-black">Add/Edit Proposal</h3>

            <button
              type="button"
              class="text-black bg-transparent hover:bg-red-500 hover:text-white rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="static-modal"
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
            </button>
          </div>

          <form className={`${styles.form} py-5 px-10  overflow-auto`}>
            <div className="flex flex-row mb-8 items-center justify-start">
              <label htmlFor="title" className="text-sm block mr-5 text-black">
                Title:
              </label>
              <input
                value={title}
                placeholder="E-Commerce Platform"
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                type="text"
                name="title"
                className="text-sm w-1/2 border-gray-300 text-black rounded-md p-1.5 border-2 focus:ring-1 mr-3 focus:ring-blue-500"
                maxlength="50"
              />
              <p className="text-xs">{title.length}/50</p>
            </div>

            <label htmlFor="description" className="text-sm text-black block mb-1">
              Description:
            </label>
            <textarea
              value={description}
              name="description"
              type="text"
              id="description"
              rows="3"
              className="block mb-1 p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Write description for your proposal...."
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="mb-2 w-full text-right text-xs">
              {description.length}/500
            </p>

            <label htmlFor="document" className="text-sm block mb-3 text-black">
              Proposal Document:
            </label>
            <input
              class="mb-8 block w-1/2 text-xs text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              id="document"
              type="file"
            />

            <div className="flex flex-row mb-8 items-center justify-start">
              <label htmlFor="mentorship" className="text-sm mr-5 inline-flex text-black">
                Availability for mentorship:
              </label>
              <input
                checked={mentorship}
                id="mentorship"
                name="mentorship"
                type="checkbox"
                onChange={(e) => setMentorship(!mentorship)}
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="flex flex-row items-center justify-start mb-3">
              <label htmlFor="dropdown" className="text-sm mr-5 text-black">
                Interests:
              </label>
                <DropDown list={list} handleAdd={handleAdd} placeHolder={"All categories"} />
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-2">
              {list.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="bg-blue-100 inline-flex justify-center items-center text-sm rounded-xl p-2 mr-2 my-1"
                >
                  {item}
                  <FaTimes className="ml-2 text-xs hover:text-red-500" onClick={() => handleDelete(index)}/>
                </button>
              ))}
            </div>
          </form>

          <div class="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 text-sm rounded-lg tracking-widest text-white bg-black border-2 border-black hover:text-gray-300"
              onClick={() => setOpenModal(false)}
            >
              Save
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 ms-3 rounded-lg text-sm tracking-widest text-black bg-white border-2 border-black hover:bg-gray-300 "
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalModal;
