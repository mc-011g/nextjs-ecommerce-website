import Button from "@/components/Button";
import Link from "next/link";

export default function Custom404() {
    return (
        
        <div className="sm:h-[calc(100vh-96px-96px)] h-[calc(100vh-96px-160px)] flex items-center justify-center">
            
            <div className="flex flex-col right-1/2 text-center gap-4 h-fit w-60">
                <h1 className="text-3xl md:text-4xl lg:text-5xl">404</h1>
                <p className="text-gray-600">This page does not exist.</p>

                <Link href={"/"}>
                    <Button color={"dark"} size={"large"} outline={""}>Back to Home Page</Button>
                </Link>
            </div>

        </div>

    );
}