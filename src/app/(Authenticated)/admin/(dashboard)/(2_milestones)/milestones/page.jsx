"use client";

// Imports below for UI creation
import styles from "./MilestonesPage.module.css";
import MilestoneHeadingAndButton from "./_components/MilestoneHeadingAndButton/MilestoneHeadingAndButton";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell";
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell";
import Modal from "../../_components/Modal/Modal";
import MilestoneRowContent from "./_components/MilestoneRowContent/MilestoneRowContent";
import DataTableMessage from "../../_components/DataTableMessage/DataTableMessage";
import toast from "react-hot-toast";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { getAllMilestonesAPICall, assignMilestoneAPICall } from "@/utils/admin_frontend_api_calls/MilestoneAPICalls";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

// export const metadata = {
// 	title: "Admin Milestones",
// 	description: "Capstoned Milestones | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardMilestonesPage(props){

	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing milestones shown in the table
	// for managing skeleton loading indicator 
	// for managing when retrieved data is 0 in size
	// for managing when error occurs in retrieval api call
	// for managing when data is changed so that modal closes
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [milestones, setMilestones] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);
	const [retrievedDataIsZero, setRetrievedDataIsZero] = useState(false);
	const [errorRetrievingData, setErrorRetrievingData] = useState(false);
	const [dataChanged, setDataChanged] = useState(false);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);
	
	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching all milestones
	async function getAllMilestones(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getAllMilestones + `?limit=${10000}`;
		let apiCallMethod = "GET";
		setLoadingIndicator(true);

		let apiResponse = await getAllMilestonesAPICall(apiURL, apiCallMethod, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setLoadingIndicator(false);
			setMilestones(apiResponseData);

			console.log("getAllMilestones:", apiResponseData);
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
			setErrorRetrievingData(true);
			console.log("getAllMilestones error:", "error");
		}
	}

	// Function for assigning milestone
    async function assignMilestone(id){
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.assignMilestone + `${id}`;

        try{
            let apiCall = await assignMilestoneAPICall(apiURL, accessToken);
            if(apiCall.status === HttpStatusCode.Ok){
                let apiCallResponse = await apiCall.json();
                console.log("assignMilestone:", apiCallResponse);
                return apiCallResponse;
            }
            else if (apiCall.status === HttpStatusCode.Unauthorized) {
                const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
                    method: "POST",
                });
                if (responseLogOut.status === HttpStatusCode.Ok) {
                    dispatch(removeAuthDetails());
                    router.replace(FRONTEND_ROUTES.landing_page);
                }
                throw new Error('Unauthorized');
            }
            else{
                console.log("assignMilestone:", apiCall);
                throw new Error(`Can't assign milestone. Try again.`);
            }
        }
        catch(error){
            throw error;
        }
    }

	// Calls toast message
	function callAssignMilestoneToast(id){
        const assignMilestoneResult = assignMilestone(id);

		toast.promise(
			assignMilestoneResult,
			{
				loading: 'Assigning milestone...',
				success: 'Milestone assigned!',
				error: (err) => `Can't assign milestone. Try again.`
			}
		);

        assignMilestoneResult.then(() => {
            setOpenModal(false);
            setDataChanged(true);
        }).catch((error) => {
			console.log("callAssignMilestoneToast error", error.message)
		});
	}

	// API Call for displaying milestones in the table 
	// when the page is loaded 
	useEffect(() => {
		getAllMilestones();
	}, [])


	// When retrieved data is 0 in size.
	useEffect(() => {
		if(milestones.length === 0){
			setRetrievedDataIsZero(true);
		}
	}, [milestones]);

	// When error occurs in retrieving data.
	useEffect(() => {
		if(errorRetrievingData){
			setLoadingIndicator(false);
		}
	}, [errorRetrievingData])

	// Reload the data when data is changed when modal closes
	// such as when milestones is created or updated
	useEffect(() => {
		if(!openModal && dataChanged){
			getAllMilestones();
			setDataChanged(false);
		}
	}, [dataChanged, openModal])

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<MilestoneHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
					setDataChanged={setDataChanged}
				/>

				<ContentTable 
					isLoading={loadingIndicator}
				>
			
					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Title`}/>

						<TableHeadDataCell isNumberCell={false} text={`Description`}/>

						<TableHeadDataCell isNumberCell={false} text={`Deadline`}/>

						<TableHeadDataCell isNumberCell={false} text={`Percentage`}/>

						<TableHeadDataCell isNumberCell={false} text={`Year`}/>

					</TableHead>
					
					<tbody>

						{
							!loadingIndicator

							?

							milestones.map((milestone) => {
								return (
									<TableRow
										key={milestone._id}
										setOpenModal={setOpenModal} 
										setModalContent={setModalContent}
										setModalTitle={() => setModalTitle(milestone.title)}
										content={<MilestoneRowContent 
													data={milestone} 
													dataID={milestone._id}
													setModalContent={setModalContent}
													setOpenModal={setOpenModal}
													setDataChanged={setDataChanged}
													callAssignMilestoneToast={callAssignMilestoneToast}
												/>}
									>

										<TableBodyDataCell 
											text={String(milestone.assignmentNumber)} 
										/>

										<TableBodyDataCell 
											text={String(milestone.title)}
										/>

										<TableBodyDataCell 
											text={String(milestone.description)}
										/>
										
										<TableBodyDataCell 
											text={String(extractDate(milestone.deadline))}
										/>
										
										<TableBodyDataCell 
											text={String(milestone.percentage)}
										/>
										
										<TableBodyDataCell 
											text={String(milestone.year)}
										/>
										
									</TableRow>
								)
							})

							:

							retrievedDataIsZero
							
							?

							<DataTableMessage>
								Nothing to show. Please, add some data.
							</DataTableMessage>
							
							:

							errorRetrievingData
							
							?

							<DataTableMessage>
								Error fetching milestones. Please, try again later.
							</DataTableMessage>

							:

							<div></div>
						}
						
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


