import { XCircleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function EmailVerificationFail() {

    const router = useRouter();

    return (
        <div className="px-4 sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">

            <div className="flex flex-col place-items-center text-center max-w-[512px] w-full gap-4">

                <XCircleIcon className="size-24 text-red-600" />

                <p className="text-center text-gray-600" data-cy="emailVerificationFailMessage">
                    There was an error verifying your email.
                </p>

                <div>
                    <Button size="large" color="dark" outline="" onClick={() => router.push("/")} data-cy="backToLoginButton">
                        Back to Login
                    </Button>
                </div>

            </div>

        </div>
    )
}