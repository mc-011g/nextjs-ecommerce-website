import Button from "./Button";
import { useRouter } from "next/navigation";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function PasswordResetFail() {

    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-96px)]">
     
            <div className="flex flex-col gap-4 place-items-center">
                <XCircleIcon className="text-red-600 size-24" />
      
                <h1 className="text-2xl md:text-3xl lg:text-4xl">Password Reset Failed</h1>
                <p>
                    Something went wrong while trying to reset your password.
                </p>

                <Button size="large" color="dark" outline="" onClick={() => router.push("/login")}>
                    Login
                </Button>
            </div>
     
        </div>
    );
}