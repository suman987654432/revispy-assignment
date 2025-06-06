import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";
import { setServerAuthToken, setServerCookie } from "@/lib/utils/server-cookies";

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Email and OTP are required"
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "User not found"
                },
                { status: 404 }
            );
        }

        if (!user.otp || user.otp !== otp) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid OTP"
                },
                { status: 400 }
            );
        }

        if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "OTP has expired. Please request a new one"
                },
                { status: 400 }
            );
        }

        const userData = await User.findByIdAndUpdate(
            user._id,
            {
                otp: null,
                otpExpiresAt: null
            },
            { new: true }
        );

        const tokenData = {
            userId: userData._id,
            name: userData.name,
            email: userData.email
        };

        const token = generateToken(JSON.stringify(tokenData));

        await setServerAuthToken(token);
        await setServerCookie('userData', JSON.stringify(tokenData));

        return NextResponse.json(
            {
                success: true,
                message: "OTP verified successfully",
                user: tokenData,
                token
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to verify OTP. Please try again."
            },
            { status: 500 }
        );
    }
}
