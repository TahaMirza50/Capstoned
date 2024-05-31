"use client";
import React, { useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import ResourceButton from "../ResourceButton/ResourceButton";
import MarkSection from "../MarkSection/MarkSection";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/app/(Authenticated)/mentor/(dashboard)/(2_groups)/groups/_components/Loader/Loader";
import { HttpStatusCode } from "axios";
import { callAPI } from "@/utils/helpers/callAPI";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { convertDate } from "@/utils/helpers/date";
import SubmitButton from "../SubmitButton/SubmitButton";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import AutoProjectButton from "../AutoProjectAssessment/UniqueScoreButton";

function MilestoneTab({ role, marked, milestoneNumber, assignedMilestoneID, projectID }) {
  const [isMarked, setIsMarked] = useState(marked);

  const [marksObtained, setMarksObtained] = useState(null);
  const [milestoneDetailsDisplay, setMilestoneDetailsDisplay] = useState(false);
  const [milestoneDetails, setMilestoneDetails] = useState(null);
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  const [reload,setReload] = useState(false);

  const [loading, setLoading] = useState(false);

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getMilestoneDetails = async () => {
      setLoading(true);
      const accessToken = authDetails.accessToken;
      const response = await callAPI(
        "GET",
        accessToken,
        `${BACKEND_ROUTES.getMilestoneDetails}/${assignedMilestoneID}`
      );
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        setMarksObtained(responseData.data.obtainedMarks);
        setMilestoneDetails(responseData.data);
        handleDeadlinePassed(responseData.data.milestoneID.deadline);
        setLoading(false);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        dispatch(removeAuthDetails());
        router.push(FRONTEND_ROUTES.login_page);
      }
    };

    if (milestoneDetailsDisplay) {
      getMilestoneDetails();
    } else console.log("nothing happens");
  }, [
    milestoneDetailsDisplay,
    authDetails.accessToken,
    dispatch,
    router,
    assignedMilestoneID,
    reload
  ]);

  const handleDeadlinePassed = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    if (currentDate > deadlineDate) {
      setDeadlinePassed(true);
    }
  };

  return (
    <div>
      <div
        onClick={() => setMilestoneDetailsDisplay(!milestoneDetailsDisplay)}
        className="hover:bg-gray-100 border-2 rounded-full border-blue-500 h-16 flex flex-row items-center justify-between px-10 font-bold text-base"
      >
        <h1>Milestone - {milestoneNumber}</h1>
        <div className="flex flex-row items-center">
          {isMarked && (
            <div className="mr-5 group flex flex-row bg-red-500 text-white rounded-full px-2.5 py-1.5 text-sm space-x-3 items-center justify-center">
              <span>Marked</span>
              <TiTick />
            </div>
          )}
          {milestoneDetailsDisplay ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {loading && <Loader />}
      {!loading && milestoneDetailsDisplay && milestoneDetails && (
        <div className="grid grid-cols-4 gap-y-5 my-7">
          <h2 className="font-semibold">Title:</h2>
          <h2 className="col-span-3">{milestoneDetails.milestoneID.title}</h2>
          <h2 className="font-semibold">Description:</h2>
          <h2 className="col-span-3">
            {milestoneDetails.milestoneID.description}
          </h2>
          <h2 className="font-bold">Deadline:</h2>
          <h2
            className={`col-span-3 font-semibold ${
              deadlinePassed ? "text-red-500" : "text-green-500"
            }`}
          >
            {convertDate(milestoneDetails.milestoneID.deadline)}
          </h2>
          <h2 className="font-semibold">Percentage:</h2>
          <h2 className="col-span-3">
            {milestoneDetails.milestoneID.percentage + "%"}
          </h2>
          <h2 className="font-semibold">Resources:</h2>
          <div className="col-span-3 flex flex-row">
            {milestoneDetails.milestoneID.resources.map((resource, index) => (
              <ResourceButton
                key={index}
                name={resource.name}
                link={resource.file}
                extension={resource.extension}
              />
            ))}
          </div>
          <line className="col-span-4 border-t-2 border-gray-300"></line>
          <h2 className="font-semibold">Submission Files:</h2>
          <div className="col-span-3 flex flex-row">
          {!deadlinePassed ? (
                <div className="col-span-3 flex flex-row">
                  {milestoneDetails.submissionFile.map((item, index) => (
                    <ResourceButton
                      key={index}
                      name={item.name}
                      link={item.doc}
                      extension={item.extension}
                    />
                  ))}
                </div>
              ) : (
                <h2 className="col-span-3 text-red-500">No files submitted.</h2>
              )}
          </div>
          {deadlinePassed && (
            <>
              {marksObtained && (
                <>
                  <h2 className="font-semibold">Overall Marks:</h2>
                  <h2 className="col-span-3 font-bold text-red-500">
                    {`${marksObtained} / 100`}
                  </h2>
                </>
              )}
              <h2 className="font-semibold">Marks:</h2>
              <div className="col-span-3">
                <MarkSection
                  isMarked={isMarked}
                  members={milestoneDetails.marks}
                />
              </div>
            </>
          )}
          <div className="flex flex-row col-span-4 items-center justify-end">
            <AutoProjectButton template_document_URL={"https://firebasestorage.googleapis.com/v0/b/supapay-d5baf.appspot.com/o/Template%2Fproposal_template.pdf?alt=media&token=44ae1e42-daa8-4bdc-a710-d8791dcfe29c"} 
            project_document_URL={"https://firebasestorage.googleapis.com/v0/b/supapay-d5baf.appspot.com/o/Proposals%2FFYP-MS%20Proposal.pdf?alt=media&token=4c383543-775b-4b60-b99a-023e39f9ad52"} 
            deadlinePassed={deadlinePassed}
            template_document_type={"pdf"}
            project_document_type={"pdf"}
          />
            </div>
          <SubmitButton deadlinePassed={deadlinePassed} submitted={milestoneDetails.submitted} assignedMilestoneID={assignedMilestoneID} setReload={setReload} reload={reload} projectID={projectID}/>
        </div>
      )}
    </div>
  );
}

export default MilestoneTab;
