"use client";

// Imports below for creating ui
import styles from "./UpdateMilestoneForm.module.css";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormRow from "../../../../_components/FormRow/FormRow";   
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton"; 
import FormDateInput from "../../../../_components/FormDateInput/FormDateInput";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormTextArea from "../../../../_components/FormTextArea/FormTextArea";
import toast from 'react-hot-toast';

// Imports below for state management & api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { updateMilestoneAPICall } from "@/utils/admin_frontend_api_calls/MilestoneAPICalls";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function UpdateMilestoneForm({setOpenModal, data, setDataChanged}){
    let formId = `updateMilestoneForm`;

    // For managing state of entire milestone
    const [milestone, setMilestone] = useState({
        "assignmentNumber"   : data.assignmentNumber,
        "title"              : data.title,
        "description"        : data.description,
        "deadline"           : data.deadline,
        "percentage"         : data.percentage,
        "resources"          : [],
        "year"               : data.year,
    });

    // For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

    // For routing back to landing page if 
	const dispatch = useDispatch();
	const router = useRouter();

    // For updating milestone state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;

        if(fieldName === "milestoneAssignmentNumber")
        {    
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "assignmentNumber" : value
            }));
        }
        else if(fieldName === "milestoneTitle"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "title" : value
            }));
        }
        else if(fieldName === "milestoneDeadline"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "deadline" : value
            }));
        }
        else if(fieldName === "milestonePercentageWorth"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "percentage" : value
            }));
        }
        else if(fieldName === "milestoneYear"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "year" : value
            }));
        }
        else if(fieldName === "milestoneDescription"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "description" : value
            }));
        }
        else if(fieldName === "milestoneResources"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "resources" : [...value]
            }));
        }
        else {
            // Do nothing
        }
    }

    // Function for when form is submitted
    async function submitForm(event){
        event.preventDefault();
        let dataToSend = milestone;
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.updateMilestone + `${data._id}`;

        try{
            let apiCall = await updateMilestoneAPICall(apiURL, accessToken, dataToSend);
            if(apiCall.status === HttpStatusCode.Ok){
                let apiCallResponse = await apiCall.json();
                console.log("updateMilestone:", apiCallResponse);
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
                console.log("updateMilestone:", apiCall);
                throw new Error(`Can't update milestone. Try again.`);
            }
        }
        catch(error){
            throw error;
        }
    }

    // Calls toast message
	function callToast(event){
        const submitFormResult = submitForm(event);

		toast.promise(
			submitFormResult,
			{
				loading: 'Updating milestone...',
				success: 'Milestone updated!',
				error: (err) => `Failed to update milestone. Try again.`
			}
		);

        submitFormResult.then(() => {
            setOpenModal(false);
            setDataChanged(true);
        }).catch((error) => {
			console.log("UpdateMilestoneFormToast error", error.message);
		});	
	}

    // For testing only
    useEffect(() => {
        // console.log("UpdateMilestoneForm:", milestone)
    }, [milestone])

    return (
        <div className={`${styles.updateMilestoneFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.updateMilestoneForm} flex flex-col items-center justify-start`} 
                onSubmit={callToast}
            >
                
                <FormRow 
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormNumberInput 
                        labelText="Assignment Number"
                        numberInputName="milestoneAssignmentNumber"
                        placeholderText="Assignment Number"
                        isRequired={true}
                        value={milestone.assignmentNumber} 
                        onChange={handleChange}
                    />

                    <FormTextInput 
                        labelText={"Title"} 
                        textInputName={"milestoneTitle"} 
                        placeholderText={"Milestone Title"}
                        isRequired={true}
                        value={milestone.title} 
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormDateInput
                        labelText="Deadline"
                        dateInputName="deadline"
                        placeholderText="Milestone Deadline"
                        isRequired={true}
                        setState={setMilestone} 
                        value={milestone.deadline}
                    />

                    <FormNumberInput 
                        labelText="Milestone Worth"
                        numberInputName="milestonePercentageWorth"
                        placeholderText="Percentage"
                        isRequired={true}
                        value={milestone.percentage} 
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormNumberInput 
                        labelText="Milestone Year"
                        numberInputName="milestoneYear"
                        placeholderText="Year"
                        isRequired={true}
                        value={milestone.year} 
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-start"} 
                    horizontalPlacement={"items-start"}
                >

                    <FormTextArea
                        labelText="Description"
                        textAreaName="milestoneDescription"
                        placeholderText="Milestone Description"
                        isRequired={true}
                        value={milestone.description}
                        onChange={handleChange}
                    />

                </FormRow>
            
                <FormRow
                    verticalPlacement={"justify-end"}
                    horizontalPlacement={"items-center"}
                >
                    <FormActionButton 
                        buttonText={`Save`}
                        buttonClickAction={callToast}
                        formId={formId}
                        isCancel={false}
                    />

                    <FormActionButton 
                        buttonText={`Cancel`}
                        buttonClickAction={() => setOpenModal(false)}
                        formId={null}
                        isCancel={true}
                    />

                </FormRow>

            </form>

        </div>
    );
}