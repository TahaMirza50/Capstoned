import CapstonedLogo from "@/components/CapstonedLogo/CapstonedLogo";
import styles from "./loading.module.css";

export default function Loading(){
    return (
        <div className={`${styles.container} w-full flex items-center justify-center`}>
            
            <div className={`${styles.spacemanContainer} `}>
                <CapstonedLogo />
            </div>
        
        </div>
    );
}