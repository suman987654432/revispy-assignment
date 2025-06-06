import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Email and password are required"
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid email or password"
                },
                { status: 401 }
            );
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid email or password"
                },
                { status: 401 }
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
                message: "Login OTP sent successfully",
                email
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to send login OTP. Please try again."
            },
            { status: 500 }
        );
    }
}
