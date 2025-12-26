import { useRouter } from "next/navigation";
import Button from "./Button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const PasswordResetSuccess = () => {
    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-96px)]">

            <div className="flex flex-col gap-4 place-items-center">
                <CheckCircleIcon className="text-green-600 size-24" />

                <h1 className="text-2xl md:text-3xl lg:text-4xl" data-cy="passwordResetSuccessMessage">Password Reset Success</h1>
                <p>
                    Your password has been reset, you can now login with your new password.
                </p>

                <Button onClick={() => router.push('/login')} color={"dark"} size={"large"} outline={""} data-cy="passwordResetLoginButton">Login</Button>
            </div>


        </div>
    );
}