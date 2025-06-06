import { NextResponse } from "next/server"
import axios, { AxiosError } from "axios"

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json()

        const htmlContent = `
            <!DOCTYPE html>
            <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <div style="max-width: 500px; margin: 0 auto; text-align: center;">
                        <h2>Verify Your Email</h2>
                        <p>Please verify ${email} using the code below:</p>
                        <p style="font-size: 32px; letter-spacing: 8px; padding: 20px; background: #f5f5f5; border-radius: 5px; margin: 20px 0;">
                            ${otp}
                        </p>
                        <p style="color: #666;">This code will expire in 10 minutes</p>
                    </div>
                </body>
            </html>
        `

        const data = {
            sender: {
                name: "ECOMMERCE",
                email: process.env.OWNER_EMAIL_ID,
            },
            to: [{
                email: email,
                name: email.split('@')[0]
            }],
            subject: "Your Email Verification Code",
            htmlContent
        }

        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            data,
            {
                headers: {
                    "accept": "application/json",
                    "api-key": process.env.BREVO_EMAIL_SERVICE_API_KEY!,
                    "content-type": "application/json",
                }
            }
        )

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        )

    } catch (error) {
        console.error("Email send error:", error)
        if (error instanceof AxiosError) {
            return NextResponse.json(
                { message: error.response?.data?.message || "Failed to send email" },
                { status: 500 }
            )
        }
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
