import styles from "./FormTextArea.module.css";

export default function FormTextArea({labelText, textAreaName, placeholderText, isRequired}){
    return (
        <div className={`${styles.textAreaContainer} `}>
                    
            <label htmlFor={textAreaName} className={`${styles.textAreaLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <textarea 
                    type="email" 
                    name={textAreaName} 
                    id={textAreaName}
                    placeholder={placeholderText}
                    className={`${styles.textArea}`}
                    required
                    rows={9}
                    cols={35}
                />
                :
                <textarea 
                    type="email" 
                    name={textAreaName} 
                    id={textAreaName}
                    placeholder={placeholderText}
                    className={`${styles.textArea}`}
                    rows={9}
                    cols={35}
                />
            }
            
        </div>
    );
}