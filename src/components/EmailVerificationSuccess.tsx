import { useRouter } from "next/navigation";
import Button from "./Button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function EmailVerificationSuccess() {

    const router = useRouter();

    return (
        <div className="px-4 sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">

            <div className="flex flex-col place-items-center text-center max-w-[512px] w-full gap-4">

                <CheckCircleIcon className="size-24 text-green-600" />

                <p className="mb-4 text-center" data-cy="emailVerificationSuccessMessage">
                    Your email has been verified successfully. You can now log in to your account.
                </p>

                <Button size="large" color="dark" outline="" onClick={() => router.push("/login")}>
                    Back to Login
                </Button>
            </div>

        </div>
    )
}