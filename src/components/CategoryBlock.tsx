import Image from "next/image"
import Button from "./Button"
import Link from "next/link"

export default function CategoryBlock({ categoryName, content, imageURL }: { categoryName: string, content: string, imageURL: string }) {
    return (
        <Link href={`/products/category/${categoryName}`} className="relative cursor-pointer grow">
            <div className="relative rounded-xl overflow-hidden">

                <div className="min-w-[128px] min-h-[300px] bg-linear-to-t from-black to-black/0 relative rounded-xl overflow-hidden">
                    <Image
                        src={imageURL}
                        className="h-full object-cover"
                        alt={categoryName}
                        fill
                        sizes="85vh, 90vh, 95vh"
                        objectFit="cover" />
                </div>

                <div className="absolute w-24 top-55 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center flex flex-col gap-2 z-1">
                    <h1 className="text-white font-bold text-xl text-center">{content}</h1>
                    <Button size="" color="light" outline="">Shop</Button>
                </div>

                <div className="absolute top-0 bg-linear-to-t from-black/75 to-black/0 from-15% via-black/60 via-30% to-75% h-full w-full"></div>
            </div>
        </Link>
    )
}