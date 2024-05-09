"use client";

import styles from "./ProjectsPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow"; 
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell"; 
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell"; 
import ProjectsHeadingAndButton from "./_components/ProjectsHeadingAndButton/ProjectsHeadingAndButton";
import { useState } from "react";
import Modal from "../../_components/Modal/Modal";

// export const metadata = {
// 	title: "Admin Projects Management",
// 	description: "Capstoned Admin Projects Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardProjectsPage(props){
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<ProjectsHeadingAndButton />

				<ContentTable>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Name`}/>

						<TableHeadDataCell isNumberCell={false} text={`Group`}/>

						<TableHeadDataCell isNumberCell={false} text={`Progress`}/>

						<TableHeadDataCell isNumberCell={false} text={`Status`}/>

						<TableHeadDataCell isNumberCell={false} text={`Finished`}/>

						<TableHeadDataCell isNumberCell={false} text={`Year`}/>

					</TableHead>
					
					<tbody>

						<TableRow
							setOpenModal={setOpenModal} 
							setModalTitle={setModalTitle}
							setModalContent={setModalContent}
						>

							<TableBodyDataCell text={'1'}/>
								
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'This is dummy text. This is dummy text. This is dummy text. This is dummy text.'}/>
								
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>

							<TableBodyDataCell text={'True'}/>
							
						</TableRow>

						<TableRow
							setOpenModal={setOpenModal} 
							setModalTitle={setModalTitle}
							setModalContent={setModalContent}
						>

						<TableBodyDataCell text={'1'}/>
								
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'This is dummy text. This is dummy text. This is dummy text. This is dummy text.'}/>
								
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>

							<TableBodyDataCell text={'True'}/>
						
						</TableRow>
						
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