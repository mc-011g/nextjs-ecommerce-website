'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function PaymentCancelledPage() {

    const router = useRouter();

    return (
        <main className="container sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">

            <div className="flex flex-col place-items-center text-center max-w-[512px] w-full gap-4">

                <XCircleIcon className="w-30 h-30 color-red text-red-600"></XCircleIcon>

                <h1 className="text-3xl md:text-4xl lg:text-5xl" data-cy="paymentStatusTitle">Payment Cancelled</h1>
                <p className="text-gray-600">You cancelled your purchase.</p>

                <Button size="large" outline="" color="dark" className="" onClick={() => router.push("/")} data-cy="homePageButton">
                    Go To Home Page
                </Button>
            </div>

        </main>
    );
};