import Logout from "./_components/Logout/Logout.jsx";
import SideMenuItem from "./_components/SideMenuItem/SideMenuItem.jsx";
import styles from "./SideMenu.module.css";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes.js";

export default function SideMenu(props){
	return (
		<div className={`${styles.sideMenu} flex flex-col items-center justify-center w-full h-full`}>

			<div className={`${styles.secondaryContainer} w-full flex flex-col items-center `}>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_home_page}>
					Dashboard
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_fyp_groups_page}>
					My Group
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_my_project_page}>
					My Project
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_proposals_page}>
					Proposals
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_profile_page}>
					Profile
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_chats_page}>
					Chats
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_companies_page}>
					Companies
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.student_dashboard_users_page}>
					Users
				</SideMenuItem>


				<div className="flex flex-col flex-1"></div>

				<Logout/>
			</div>
			
		</div>
	);
}