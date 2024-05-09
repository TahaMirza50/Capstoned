"use client";

import styles from "./FormFileInput.module.css";
import { useState } from "react";

export default function FormFileInput({isRequired, labelText, fileInputName}){
    const [proposalDoc, setProposalDoc] = useState(null);

    return (
        <div className={`${styles.fileInputPrimaryContainer}`}>

            <label htmlFor={fileInputName} className="font-montserrat block mb-3 text-black">
                {labelText} {isRequired && `*`}
            </label>

            {(isRequired) ? 
                <input
                    className={`${styles.fileInput} mb-8 block w-1/2 text-xs text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none`}
                    id={fileInputName}
                    type="file"
                    onChange={(e) => {
                            setProposalDoc(e.target.files[0]);
                        }
                    }
                    required
                />
                :
                <input
                    className={`${styles.fileInput} mb-8 block w-1/2 text-xs text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none`}
                    id={fileInputName}
                    type="file"
                    onChange={(e) => {
                            setProposalDoc(e.target.files[0]);
                        }
                    }
                />
            }

        </div>
    );
}