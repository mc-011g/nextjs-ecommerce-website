'use client';

import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { resendVerifyEmail } from "@/util/resendVerifyEmail";

export default function ResendVerifyEmail() {

    const [errorMessage, setErrorMessage] = useState("");
    const [showSentMessage, setShowSentMessage] = useState(false);

    const [localStorageUserId, setLocalStorageUserId] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setLocalStorageUserId(userId);
    }, []);

    const handleResendVerifyEmail = async () => {
        const userId: string | null = localStorageUserId;

        if (userId) {
            try {
                await resendVerifyEmail(userId);
                setShowSentMessage(true);
            } catch (error) {
                setErrorMessage("Error sending verification email: " + error);
            }
        } else {
            setErrorMessage("Error sending verification email.");
        }
    }

    return (
      <main className="px-4 lg:px-8 sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">

            <div className="flex flex-col gap-4 w-full max-w-[512px]">

                <h1 className="text-2xl md:text-3xl lg:text-4xl">Please Verify Your Email</h1>

                <p className="text-gray-600">To complete registration, please click the button below to get a email verification link sent to your inbox.</p>

                {errorMessage &&
                    <div className="text-red-600" aria-live="polite">{errorMessage}</div>
                }

                {!showSentMessage ? (
                    <Button type="button" color="dark" size="large" outline="" onClick={() => handleResendVerifyEmail()} data-cy="resendVerifyEmailButton">
                        Resend Verification Email
                    </Button>
                ) : (
                    <p className="text-green-600" aria-live="polite" data-cy="sentVerifyEmailMessage">A new verification email was sent to your inbox.</p>
                )}
            </div>

        </main>
    );
}