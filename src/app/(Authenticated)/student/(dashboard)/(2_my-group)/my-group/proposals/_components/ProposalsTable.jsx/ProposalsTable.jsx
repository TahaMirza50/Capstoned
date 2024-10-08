import React from "react";
import ProposalRow from "./_components/ProposalRow/ProposalRow";
import styles from "./ProposalsTable.module.css";
import { cookies } from "next/headers";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { callAPI } from "@/utils/helpers/callAPI";
import NotFound from "./_components/NotFound/NotFound";
import { redirect } from "next/navigation";

async function ProposalsTable() {
  const proposals = await getProposals();

  if (!proposals) {
    return  (
      <div class="bg-white dark:bg-gray-800 border-2 m-5 relative shadow-lg rounded-xl overflow-hidden">
        <div class={`overflow-y-auto ${styles.container}`}>
          <table class="w-full text-sm text-left text-gray-500 table-auto">
            <thead class="sticky top-0 z-10 text-xs text-white bg-blue-500 uppercase text-center ">
              <tr>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
                <th scope="col" class="px-4 py-3 text-left">
                  Proposal Title
                </th>
                <th scope="col" class="px-4 py-3">
                  Status
                </th>
                <th scope="col" class="px-4 py-3">
                  Selected By
                </th>
                <th scope="col" class="px-4 py-3">
                  Mentorship
                </th>
                <th scope="col" class="px-4 py-3">
                  Proposal Doc
                </th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div class="bg-white dark:bg-gray-800 border-2 m-5 relative shadow-lg rounded-xl overflow-hidden">
      <div class={`overflow-y-auto ${styles.container}`}>
        <table class="w-full text-sm text-left text-gray-500 table-auto">
          <thead class="sticky top-0 z-10 text-xs text-white bg-blue-500 uppercase text-center ">
            <tr>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
              <th scope="col" class="px-4 py-3 text-left">
                Proposal Title
              </th>
              <th scope="col" class="px-4 py-3">
                Status
              </th>
              <th scope="col" class="px-4 py-3">
                Selected By
              </th>
              <th scope="col" class="px-4 py-3">
                Mentorship
              </th>
              <th scope="col" class="px-4 py-3">
                Proposal Doc
              </th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {proposals.length === 0 && (<NotFound/>)}
            {proposals.length !==0 &&  proposals.map((proposal) => (
              <ProposalRow
                key={proposal._id}
                proposalID={proposal._id}
                title={proposal.title}
                description={proposal.description}
                industries={proposal.industries}
                edit={proposal.edit}
                selectedBy={proposal.selectedBy?.name}
                mentorship={proposal.mentorship}
                createdAt={proposal.createdAt}
                updatedAt={proposal.updatedAt}
                proposalDoc={proposal.proposalDoc}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalsTable;

async function getProposals() {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    BACKEND_ROUTES.getGroupProposals
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  }
  if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
