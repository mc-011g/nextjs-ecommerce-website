'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import { sendForgotPasswordEmail } from "@/util/sendForgotPasswordEmail";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const result = await sendForgotPasswordEmail(email);
            setSuccess(result);
        } catch (error) {
            setErrorMessage("Error sending email." + error);
        }

    }

    return (
        <main className="sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">
           
            <div className="flex flex-col gap-4 w-full max-w-[512px]" aria-live="polite">
                {success ? (
                    <>
                        <div className="inline-flex gap-4 mb-4 items-center">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl" data-cy="linkSentTitle">Password Reset Link Sent</h1>
                            <CheckCircleIcon className="size-12 text-green-600" />
                        </div>

                        <p>Check your email for a reset link.</p>
                        
                        <Button size="large" color="dark" outline="" onClick={() => { router.push("/login") }}>
                            Back to Login
                        </Button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">Forgot Password</h1>

                        <p>Please enter your email address to get a password reset email link.</p>

                        <label className="w-full">
                            Email:
                            <Input id="email" type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="emailInput" required />
                        </label>

                        <Button size="large" color="dark" outline=""
                            onClick={() => handleSubmit()} disabled={!email} data-cy="sendResetLink">
                            Send Reset Link
                        </Button>

                        {errorMessage && <p className="text-red-600" aria-live="polite">{errorMessage}</p>}
                    </>
                )}
            </div>
        </main>
    );
}