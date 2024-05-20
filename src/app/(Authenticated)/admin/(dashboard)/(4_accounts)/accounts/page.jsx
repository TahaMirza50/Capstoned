"use client";

// Imports below for UI creation
import styles from "./AccountPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell";
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell";
import AccountHeadingAndButton from "./_components/AccountsHeadingAndButton/AccountHeadingAndButton";
import Modal from "../../_components/Modal/Modal";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { getUsersAPICall } from "@/utils/admin_frontend_api_calls/AccountsAPICalls";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";


// export const metadata = {
// 	title: "Admin Accounts Management",
// 	description: "Capstoned Admin Accounts Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardAccountsPage(props){
	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing users shown in the table
	// for managing skeleton loading indicator 
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [users, setUsers] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);
	const [userRole, setUserRole] = useState("all");

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching all fyp groups
	async function getUsers(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getUsers;
		setLoadingIndicator(true);

		let apiResponse = await getUsersAPICall(apiURL, accessToken, userRole);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setUsers(apiResponseData.data.users);
			// console.log("A:", apiResponseData);
		}
		else if (apiResponse.status === HttpStatusCode.Unauthorized) {
			const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
			  method: "POST",
			});
			if (responseLogOut.status === HttpStatusCode.Ok) {
			  dispatch(removeAuthDetails());
			  router.replace(FRONTEND_ROUTES.landing_page);
			}
		}
		else{
			console.log("B:", "error");
		}
	}

	// API Call for displaying users in the table 
	// when the page is loaded 
	useEffect(() => {
		getUsers();
	}, [])


	// Turn skeleton loading indicator off when 
	// users are fetched successfully
	useEffect(() => {
		if(users.length > 0){
			setLoadingIndicator(false);
		}
		console.log("A:", users)
	}, [users]);


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<AccountHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
				/>

				<ContentTable
					isLoading={loadingIndicator}
				>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Name`}/>

						<TableHeadDataCell isNumberCell={false} text={`Project`}/>

						<TableHeadDataCell isNumberCell={false} text={`Members`}/>

						<TableHeadDataCell isNumberCell={false} text={`Supervisor`}/>

						<TableHeadDataCell isNumberCell={false} text={`Mentors`}/>

						<TableHeadDataCell isNumberCell={false} text={`Confirmed`}/>

					</TableHead>
					
					<tbody>

						{!loadingIndicator && users.map((user) => {
							return (
								<TableRow
									setOpenModal={setOpenModal} 
									setModalTitle={setModalTitle}
									setModalContent={setModalContent}
									key={user._id}
									userId={user._id}
								>

									<TableBodyDataCell 
										text={String("milestone.assignmentNumber")} 
									/>

									<TableBodyDataCell 
										text={String("milestone.title")}
									/>

									<TableBodyDataCell 
										text={String("milestone.description")}
									/>
									
									<TableBodyDataCell 
										text={String("extractDate(milestone.deadline)")}
									/>
									
									<TableBodyDataCell 
										text={String("milestone.percentage")}
									/>
									
									<TableBodyDataCell 
										text={String("milestone.year")}
									/>
									
								</TableRow>
							)
						})}
						
					</tbody>
					
				</ContentTable>
				
			</div>

			{
				openModal 
				&&
				<Modal 
					closeModal={() => setOpenModal(false)}
					modalHeadingText= {modalTitle}
				>
					{modalContent}
				</Modal>
			}

		</div>
	);
}