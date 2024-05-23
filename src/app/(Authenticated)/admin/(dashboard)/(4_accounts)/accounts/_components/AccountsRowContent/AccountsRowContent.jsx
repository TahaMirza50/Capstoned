import styles from "./AccountsRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

export default function AccountsRowContent({dataID, data}){
    console.log("AccountsRowContent", data);
    return (
        <div className={`w-full h-full`}>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Role:
                </ModalContentHeading>

                <ModalContentText>
                    {data.role}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Account Activated:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.activated ? "Yes" : "No"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Email:
                </ModalContentHeading>

                <ModalContentText>
                    {data.email}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Gender:
                </ModalContentHeading>

                <ModalContentText>
                    {data.profileID.gender}
                </ModalContentText>

            </ModalContent>
        
        </div>
    );
}