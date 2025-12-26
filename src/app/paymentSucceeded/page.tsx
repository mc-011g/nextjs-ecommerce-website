'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PaymentSucceededPage() {

    const router = useRouter();

    return (
        <main className="sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">

            <div className="flex flex-col place-items-center text-center max-w-[512px] w-full gap-4">

                <CheckCircleIcon className="w-30 h-30 color-red text-green-600"></CheckCircleIcon>

                <h1 className="text-3xl md:text-4xl lg:text-5xl" data-cy="paymentStatusTitle">Payment Succeeded</h1>
                <p className="text-gray-600">Thank you for your order.</p>

                <Button size="large" outline="" color="dark" className="" onClick={() => router.push("/")} data-cy="homePageButton">
                    Go To Home Page
                </Button>
            </div>

        </main>
    );
};