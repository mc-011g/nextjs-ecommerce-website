'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import PasswordResetFail from "@/components/PasswordResetFail";
import { PasswordResetSuccess } from "@/components/PasswordResetSuccess";
import { resetPassword } from "@/util/resetPassword";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function ResetPassword() {

    const { passwordResetCode } = useParams() as { passwordResetCode: string };

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState<boolean>(false);
    const [confirmPasswordVisibilityToggle, setConfirmPasswordVisibilityToggle] = useState<boolean>(false);

    const handleResetPassword = async () => {
        try {
            await resetPassword(passwordResetCode, password);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setIsFailure(true);
        }
    }

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisibilityToggle(!passwordVisibilityToggle);
    }

    const handleConfirmPasswordVisibilityToggle = () => {
        setConfirmPasswordVisibilityToggle(!confirmPasswordVisibilityToggle);
    }

    if (isSuccess) return <PasswordResetSuccess />
    if (isFailure) return <PasswordResetFail />

    return (
        <main className="px-4 sm:px-8 sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">


            <div className="flex flex-col gap-4 w-full max-w-[512px]" aria-live="polite">

                <h1 className="text-2xl md:text-3xl lg:text-4xl">Reset Password</h1>

                <p className="text-gray-600">Please enter a new password.</p>

                <div className="relative">
                    <label className="w-full">
                        Password
                        <Input type={`${passwordVisibilityToggle ? 'text' : 'password'}`} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} data-cy="newPasswordInput" required />
                    </label>
                    {passwordVisibilityToggle ?
                        <EyeIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordVisibilityToggle()} />
                        :
                        <EyeSlashIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordVisibilityToggle()} />
                    }
                </div>

                <div className="relative">
                    <label className="w-full">
                        Confirm Password
                        <Input type={`${confirmPasswordVisibilityToggle ? 'text' : 'password'}`} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} data-cy="newConfirmPasswordInput" required />
                    </label>
                    {confirmPasswordVisibilityToggle ?
                        <EyeIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handleConfirmPasswordVisibilityToggle()} />
                        :
                        <EyeSlashIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handleConfirmPasswordVisibilityToggle()} />
                    }
                </div>

                {password !== confirmPassword &&
                    <span className="text-left text-red-600" aria-live="polite">Passwords must match.</span>
                }

                <Button size="large" color="dark" outline=""
                    onClick={handleResetPassword}
                    disabled={!password || !confirmPassword || password !== confirmPassword}
                    data-cy="passwordResetButton">
                    Reset Password
                </Button>
            </div>
  
        </main>
    );
}