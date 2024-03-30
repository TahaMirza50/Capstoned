import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Request from "@/models/Request";

export const DELETE = async (request) => {
    await connectToDB();
    const profileID = request.headers.get('profileID');

    try {
        const requestID = request.nextUrl.searchParams.get('id');
        const requestToDelete = await Request.findById(requestID);
        if(!requestToDelete) {
            return NextResponse.json({message: "Request not found."}, {status: HttpStatusCode.NotFound});
        }

        if(requestToDelete.sender!=profileID) {
            return NextResponse.json({message: "Unauthorized."}, {status: HttpStatusCode.Unauthorized});
        }

        await Request.findByIdAndDelete(requestID);

        return NextResponse.json({message: "Request deleted."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to delete request."}, {status: HttpStatusCode.InternalServerError});
    }
}