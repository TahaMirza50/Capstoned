"use client";

// Imports for creating UI
import styles from "./CreateAdminAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";

// Imports for state management 
import { useState } from "react";

export default function CreateAdminAccountForm({setOpenModal}){
    let formId = `createAdminAccountForm`;

    // For managing state of entire admin
    const [admin, setAdmin] = useState({
        "role"                     : "Admin",
        "adminFirstName"           : "",
        "adminLastName"            : "",
        "adminGender"              : "",
        "adminEmailID"             : "",
    });

    // For updating admin state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;
        if(fieldName === "adminFirstName")
        {    
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminFirstName" : value
            }));
        }
        else if(fieldName === "adminLastName"){
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminLastName" : value
            }));
        }
        else if(fieldName === "adminGender"){
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminGender" : value
            }));
        }
        else if(fieldName === "adminEmailID"){
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminEmailID" : value
            }));
        }
        else {
            // Do nothing
        }
    }

    // Function for when form is submitted
    function submitForm(event){
        event.preventDefault();
        console.log("Submit Form");
    }

    return (
        <div className={`${styles.createAdminAccountFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createAdminAccountForm} flex flex-col items-center justify-start`}
                onSubmit={submitForm}
            >

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                    rowHeight={""}
                >

                    <FormTextInput 
                        labelText="First Name"
                        textInputName="adminFirstName"
                        placeholderText="First Name"
                        isRequired={true}
                        onChange={handleChange}
                        value={admin.adminFirstName}
                    />

                    <FormTextInput 
                        labelText="Last Name"
                        textInputName="adminLastName"
                        placeholderText="Last Name"
                        isRequired={true}
                        onChange={handleChange}
                        value={admin.adminLastName}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                    rowHeight={""}
                >

                    <FormDropDownSelect 
                        labelText="Gender"
                        dropDownSelectName={`adminGender`}
                        options={["Male", "Female"]}
                        isRequired={true}
                        placeholder={"Admin's Gender"}
                        selectedValue={admin.adminGender}
                        isOnChangePassed={true}
                        onChange={handleChange}
                    />

                    <FormEmailInput 
                        labelText="Email" 
                        emailInputName={"adminEmailID"} 
                        placeholderText="Admin's Email ID" 
                        isRequired={true}
                        value={admin.adminEmailID}
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-end"}
                    horizontalPlacement={"items-end"}
                    rowHeight={"h-56"}
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