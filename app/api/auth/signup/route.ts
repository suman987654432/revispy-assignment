import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getApiUrl } from '@/lib/api-url';

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const { email, name, password } = await request.json();

        if (!email || !name || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Email, name and password are required"
                },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Email already registered"
                },
                { status: 409 }
            );
        }

        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await User.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt
        });

        // Send OTP email
        await fetch(getApiUrl('/api/send-email'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful. Please verify your email.",
                email
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Registration failed. Please try again."
            },
            { status: 500 }
        );
    }
}
