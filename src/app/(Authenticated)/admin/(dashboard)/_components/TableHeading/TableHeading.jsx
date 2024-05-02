import styles from "./TableHeading.module.css";
import ContentHeadingLine from "../ContentHeadingLine/ContentHeadingLine";

export default function TableHeading({children}){
    return (
        <div className={`${styles.tableHeadingContainer} flex flex-row items-center `}>

            <h1 className={`${styles.tableHeading} font-montserrat font-semibold text-black`}>
                {children}
            </h1>

            <ContentHeadingLine />

        </div>
    );
}