import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import User from "@/models/User";
import isEmail from "validator/lib/isEmail";
import crypto from "crypto";
import { transporter } from "@/utils/constants/emailConstant";
import { Role } from "@/utils/constants/enums";
import bcrypt from "bcrypt";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";
import Admin from "@/models/Admin";

export async function POST(request) {
    await connectToDB();

    try {
        const data = await request.json()

        const userExists = await User.findOne({ email : data.email });

        if (userExists) return NextResponse.json({ message: "User already exists" }, { status: HttpStatusCode.BAD_REQUEST });

        if (data.role == null || data.role === "")
            return NextResponse.json({ message: "Role is required" }, { status: HttpStatusCode.BAD_REQUEST });

        if (data.role !== Role.Mentor && data.role !== Role.Student && data.role !== Role.Admin)
            return NextResponse.json({ message: "Role is invalid" }, { status: HttpStatusCode.BAD_REQUEST });

        if (data.email == null || data.email === "" || !isEmail(data.email))
            return NextResponse.json({ message: "Correct email is required" }, { status: HttpStatusCode.BAD_REQUEST });

        const generatedPassword = crypto.randomBytes(15).toString('hex');
        const encryptedPass = await bcrypt.hash(generatedPassword, 10);

        const user = new User({
            email: data.email,
            password: encryptedPass,
            role: data.role
        });

        if (data.role === Role.Mentor) {
            const mentor = new Mentor(data.details);
            user.profileID = mentor._id;
            await mentor.save();
        }

        if (data.role === Role.Student) {
            const student = new Student(data.details);
            user.profileID = student._id;
            await student.save();
        }

        if (data.role === Role.Admin) {
            const admin = new Admin(data.details);
            user.profileID = admin._id;
            await admin.save();
        }

        await user.save();
        const createAccountOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: 'Account Created',
            text: `Welcome to Capstoned ${data.details.firstName}! \n \nYour account has been created. Your password is ${generatedPassword} \nYou can change your password on first login. \n`
        };
        transporter.sendMail(createAccountOptions, (error, info) => {
            if (error) {
                return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
            }
        })

        return NextResponse.json({ message: `${data.role} created` }, { status: HttpStatusCode.OK });

    } catch (error) {
        if (error.name === "ValidationError")
            return NextResponse.json({ message: "Please provide the correct or necessary fields." }, { status: HttpStatusCode.BAD_REQUEST });
        return NextResponse.json({ message: "Account could not be created." }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}