"use client";

// Imports for creating UI
import styles from "./CreateMentorAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormToggleButton from "../../../../_components/FormToggleButton/FormToggleButton";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";

// Imports for state management & API calls
import { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { createAccountAPICall } from "@/utils/admin_frontend_api_calls/AccountsAPICalls";
import { HttpStatusCode } from "axios";


export default function CreateMentorAccountForm({setOpenModal}){
    let formId = `createMentorAccountForm`;

    // For managing state of entire mentor
    const [mentor, setMentor] = useState({
        "role"                      : "Mentor",
        "mentorFirstName"           : "",
        "mentorLastName"            : "",
        "mentorGender"              : "",
        "mentorContact"             : "",
        "isMentorUniversityTeacher" : false,
        "canMentorSupervise"        : false,
        "mentorEmailID"             : "",
    });

    // For access token retrieval
    const authDetails = useSelector((state) => state.AuthDetails);

    // For updating mentor state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;
        if(fieldName === "mentorFirstName")
        {    
            setMentor((prevMentor) => ({
                ...prevMentor,
                "mentorFirstName" : value
            }));
        }
        else if(fieldName === "mentorLastName"){
            setMentor((prevMentor) => ({
                ...prevMentor,
                "mentorLastName" : value
            }));
        }
        else if(fieldName === "mentorGender"){
            setMentor((prevMentor) => ({
                ...prevMentor,
                "mentorGender" : value
            }));
        }
        else if(fieldName === "mentorContact"){
            setMentor((prevMentor) => ({
                ...prevMentor,
                "mentorContact" : value
            }));
        }
        // else if(fieldName === "isMentorUniversityTeacher"){
        //     setMentor((prevMentor) => ({
        //         ...prevMentor,
        //         "isMentorUniversityTeacher" : value
        //     }));
        // }
        // else if(fieldName === "canMentorSupervise"){
        //     setMentor((prevMentor) => ({
        //         ...prevMentor,
        //         "canMentorSupervise" : value
        //     }));
        // }
        else if(fieldName === "mentorEmailID"){
            setMentor((prevMentor) => ({
                ...prevMentor,
                "mentorEmailID" : value
            }));
        }
        else {
            // Do nothing
        }
    }

    // Function for when form is submitted
    async function submitForm(event){
        event.preventDefault();
        let dataToSend = {
            "email"   : mentor.mentorEmailID,
            "role"    : mentor.role,
            "details" : {
                "isUniversityTeacher" : mentor.isMentorUniversityTeacher,
                "canSupervise"        : mentor.canMentorSupervise,
                "firstName"           : mentor.mentorFirstName,
                "lastName"            : mentor.mentorLastName,
                "gender"              : mentor.mentorGender,
                "contact"             : mentor.mentorContact
            } 
        }
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.createUser;
        
        let apiCall = await createAccountAPICall(apiURL, accessToken, dataToSend);
        if(apiCall.status === HttpStatusCode.Ok){
            let apiCallResponse = await apiCall.json();
            console.log("A", apiCallResponse);
        }
        else{
            console.log("B", "Error");
        }
    }

    return (
        <div className={`${styles.createMentorAccountFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createMentorAccountForm} flex flex-col items-center justify-start`}
                onSubmit={submitForm}
            >

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormTextInput 
                        labelText="First Name"
                        textInputName="mentorFirstName"
                        placeholderText="First Name"
                        isRequired={true}
                        value={mentor.mentorFirstName}
                        onChange={handleChange}
                    />

                    <FormTextInput 
                        labelText="Last Name"
                        textInputName="mentorLastName"
                        placeholderText="Last Name"
                        isRequired={true}
                        value={mentor.mentorLastName}
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormDropDownSelect 
                        labelText="Gender"
                        dropDownSelectName="mentorGender"
                        options={["Male", "Female"]}
                        isRequired={true}
                        placeholder={"Mentor's Gender"}
                        selectedValue={mentor.mentorGender}
                        onChange={handleChange}
                        isOnChangePassed={true}
                    />
                    
                    <FormNumberInput 
                        labelText="Contact Number"
                        numberInputName="mentorContact" 
                        placeholderText="Mentor's Contact Number" 
                        isRequired={false}
                        value={mentor.mentorContact}
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormToggleButton 
                        inactiveLabelText="No"
                        activeLabelText="Yes"
                        isRequired={true}
                        labelText="Is University Teacher?"
                        toggleInputName={"isMentorUniversityTeacher"}
                        setState={setMentor}
                    />

                    <FormToggleButton 
                        inactiveLabelText="No"
                        activeLabelText="Yes"
                        isRequired={true}
                        labelText="Can Mentor Supervise?"
                        toggleInputName={"canMentorSupervise"}
                        setState={setMentor}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormEmailInput 
                        labelText="Email" 
                        emailInputName="mentorEmailID" 
                        placeholderText="Mentor's Email ID" 
                        isRequired={true}
                        value={mentor.mentorEmailID}
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-end"}
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormActionButton 
                        buttonText={`Save`}
                        buttonClickAction={submitForm}
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