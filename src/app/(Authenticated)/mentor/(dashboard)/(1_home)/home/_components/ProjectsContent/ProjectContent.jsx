import React from "react";
import styles from "./ProjectContent.module.css";
import ProgressBarChart from "./_components/ProgressBarChart/ProgressBarChart";

function ProjectContent({projects}) {

  return (
    <div
      className={`${styles.contentCardContainer} flex h-full flex-col items-start rounded-xl `}
    >
      <div className="mx-2 my-4 h-full w-full">
        <div className="flex flex-row items-center">
          <p
            className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}
          >
            Final Year Projects Progress
          </p>

          <div
            className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
          />
        </div>

        <div
          className={`${styles.fypProjectsWrapper}`}
        >
            {projects.length > 0 && <ProgressBarChart projects={projects}/>}
        </div>
      </div>
    </div>
  );
}

export default ProjectContent;
