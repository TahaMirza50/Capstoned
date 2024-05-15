import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Mentor from "@/models/Mentor";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Proposal from "@/models/Proposal";
import { Approval } from "@/utils/constants/enums";

export async function PATCH(request, { params }) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const id = params.id

        const student = await Student.findById(profileID);

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BadRequest });

        const group = await Group.findById(student.group);

        if (profileID != group.lead)
            return NextResponse.json({ message: 'You are not the lead of the group' }, { status: HttpStatusCode.BadRequest });

        if (group.supervisor === null)
            return NextResponse.json({ message: 'Group does not have a supervisor' }, { status: HttpStatusCode.BadRequest });

        selectedProposal = group.selectedProposal.filter(selected => (selected.proposal !== id && selected.status !== Approval.Pending));

        if (!selectedProposal)
            return NextResponse.json({ message: 'Proposal not found' }, { status: HttpStatusCode.NOT_FOUND });

        const proposal = { proposal: id, status: Approval.AwaitingApproval };

        selectedProposal.push(proposal);
        group.selectedProposal = selectedProposal;

        await group.save();

        return NextResponse.json({ message: 'Proposal sent for approval' }, { status: HttpStatusCode.Ok });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }

}