import Link from "next/link";
import Button from "./Button";
import Image from "next/image";

export default function HeroBannerImageContainer({ imageUrl, productLink, productTitle, imageAlt, isLCP, discount }: { imageUrl: string, productLink: string, productTitle: string, imageAlt: string, isLCP: boolean, discount: string }) {

    return (
        <div className="relative h-full">
            <div className="relative w-full h-full">
                <Image
                    className='object-cover'
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    priority={isLCP}
                />
            </div>

            <div
                className="
            sm:bg-gradient-to-r bg-gradient-to-b
             sm:from-black/85 from-black/80
              from-20%
               sm:via-60%
                sm:via-black/60
                 to-95%
                  to-bg-black/0
                   w-screen -translate-y-full h-full absolute z-20"></div>

            <div className="container text-center w-screen p-4 lg:p-8 text-white absolute h-full left-1/2 text-left -translate-x-1/2 -translate-y-full z-100 flex flex-col justify-center gap-6 lg:gap-8">

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Get <span className="text-yellow-400">{discount}% Off</span> on All {productTitle}</h1>

                <div className="flex flex-wrap gap-2 justify-left">
                    <Link href={productLink}>
                        <Button color="light" size="large" outline="">Browse {productTitle}</Button>
                    </Link>
                    <Link href="/products">
                        <Button color="dark" size="large" outline="">Shop All</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};