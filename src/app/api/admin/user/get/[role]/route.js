import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import User from "@/models/User";
import { paginationParams } from "@/utils/helpers/paginationParams";
import { Role } from "@/utils/constants/enums";

export const GET = async (request, { params }) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const query = RoleToQuery[params.role]
        if(!query) {
            return NextResponse.json({ message: "Invalid request." }, { status: HttpStatusCode.BadRequest });
        }

        let users, totalUsers;
        if (params.role === "supervisors") {
            users = await User.find(query).populate({
                path: 'profileID',
                select: 'canSupervise',
                match: { canSupervise: true }
            }).select('-password').skip(skip).limit(limit);

            users = users.filter(user => user.profileID !== null);

            const allSupervisors = await User.find(query).populate({
                path: 'profileID',
                select: 'canSupervise',
                match: { canSupervise: true }
            });
            totalUsers = allSupervisors.filter(user => user.profileID && user.profileID.canSupervise).length;
        } else {
            users = await User.find(query).select('-password').skip(skip).limit(limit);
            totalUsers = await User.countDocuments(query);
        }

        const totalPages = Math.ceil(totalUsers/limit);

        return NextResponse.json({message: "Success.", data: {page, totalUsers, totalPages, users}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve users."}, {status: HttpStatusCode.InternalServerError});
    }
}

const RoleToQuery = {
    all: {},
    students: { role: Role.Student },
    mentors: { role: Role.Mentor },
    supervisors: { role: Role.Mentor },
    admins: { role: Role.Admin }
};