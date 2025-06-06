"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useParams } from "next/navigation"

const FormSchema = z.object({
    code: z.string().min(8, {
        message: "Your verification code must be 8 characters.",
    }),
})

const VerifyOtp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { email: encodedURL } = useParams<{ email: string; }>()

    const email = decodeURIComponent(encodedURL)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            toast("Email verified successfully!", {
                description: "Welcome to ECOMMERCE!",
            })
            console.log({ data })
        } catch (error) {
            console.error("Verification failed:", error)
            toast.error("Verification failed!")
        } finally {
            setIsLoading(false)
        }
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    if (!email || !isValidEmail(email)) {
        return (
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-red-500">Invalid Email</h2>
                    <p className="text-sm text-gray-600">
                        The email address provided is invalid. Please check the URL and try again.
                    </p>
                </CardHeader>
                <CardContent className="flex gap-x-4">
                    <Link
                        href="/login"
                        prefetch={false}
                        className="block w-full"
                    >
                        <Button
                            className="w-full bg-black hover:bg-gray-800"
                        >
                            Back to Login
                        </Button>
                    </Link>
                    <Link
                        href="/signup"
                        prefetch={false}
                        className="block w-full"
                    >
                        <Button
                            variant="outline"
                            className="w-full"
                        >
                            Back to Sign Up
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        )
    }

    const maskedEmail = email.replace(/(.{3}).*(@.*)/, "$1***$2")


    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Verify your email</h2>
                <p className="text-sm text-gray-600">
                    Enter the 8 digit code you have received on
                    <br />
                    {maskedEmail}
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="self-start">Code</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={8} {...field}>
                                            <InputOTPGroup className="gap-0.5 sm:gap-2">
                                                {Array.from({ length: 8 }).map((_, i) => (
                                                    <InputOTPSlot
                                                        key={i}
                                                        index={i}
                                                        className="rounded-lg border border-gray-300 w-10 h-10"
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
                            {isLoading ? "VERIFYING..." : "VERIFY"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default VerifyOtp
