import Link from "next/link"
import NavLink from "./NavLink"

export const Footer = () => {

    return (
        <div className="w-screen bg-black h-[160px] sm:h-[96px] text-gray-50">

            <footer className="container mx-auto h-full items-center lg:p-8 p-4 flex flex-row justify-between gap-4">
                <Link href={"/"} className="text-lg lg:text-2xl font-bold">
                    Ecommerce Website
                </Link>

                <div className="flex flex-col sm:flex-row gap-4">
                    <NavLink link="/products/category/shoes">Shoes</NavLink>
                    <NavLink link={"/products/category/boots"}>Boots</NavLink>
                    <NavLink link={"/products/category/athletic"}>Athletic Shoes</NavLink>
                </div>
            </footer>

        </div>
    )
}