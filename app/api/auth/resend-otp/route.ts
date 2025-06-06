import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Email is required"
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

        const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await User.findByIdAndUpdate(user._id, {
            otp,
            otpExpiresAt
        });

        // Send OTP email
        await fetch(`/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        return NextResponse.json(
            {
                success: true,
                message: "OTP sent successfully"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Request OTP error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to send OTP. Please try again."
            },
            { status: 500 }
        );
    }
}
