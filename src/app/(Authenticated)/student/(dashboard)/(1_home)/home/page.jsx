import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import MilestonesContent from "./_components/MilestonesContent/MilestonesContent.jsx";
import MeetingsContent from "./_components/MeetingsContent/MeetingsContent.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";
import MessagesContent from "./_components/ProposalsContent/ProposalsContent.jsx";
import CalendarContent from "./_components/CalendarContent/CalendarContent.jsx";

import styles from "./StudentHomePage.module.css";

export const metadata = {
	title: "Student Home",
	description: "Capstoned Student Home | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function MentorDashboardHomePage(props){
	return (
		<div className={`${styles.pageContainer} w-full h-full flex flex-row items-center justify-center `}>
			
			<div className={`${styles.primaryContainer} overflow-auto flex flex-row `}>
				
				<div className={`${styles.left} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<WelcomeContent 
							name={`Student Name`} 
							deadlineCount={2}
							meetingCount = {4}
						/>
					
					</ContentCard>

					<ContentCard>

						<MeetingsContent 
							location={`Faculty Lounge`} 
							meetingDate={`Jan 12, 2024`}
						/>
					
					</ContentCard>

				</div>

				<div className={`${styles.center} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<MilestonesContent 
							deadlineDate={`Jan 15, 2024`}
							milestone={`Milestone 3`}
						/>

					</ContentCard>

					<ContentCard>

						<FYPGroupsContent />

					</ContentCard>

				</div>

				<div className={`${styles.right} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<MessagesContent />

					</ContentCard>

					<ContentCard>

						<CalendarContent />
					
					</ContentCard>

				</div>

			</div>
		
		</div>
	);
}