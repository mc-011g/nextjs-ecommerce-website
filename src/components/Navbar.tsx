"use client";

import { fetchSearchResults } from "@/util/fetchSearchResults";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import NavLink from "./NavLink";
import Input from "./Input";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SmallProductCard from "./SmallProductCard";
import { useSelector } from "react-redux";
import { getCart, getUser } from "@/redux/selectors";
import { Product } from "@/types/types";

export default function Navbar() {
    const user = useSelector(getUser);
    const cart = useSelector(getCart) || [];
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingSearchResults, setLoadingSearchResults] = useState<boolean | null>(null);
    const [displayCollapseMenu, setDisplayCollapseMenu] = useState(false);

    const router = useRouter();
    const urlPathName = usePathname();

    useEffect(() => {
        setDisplaySearchResults(false);
        setSearchResults([]);

        //Enable scroll if disabled      
        document.body.style.overflow = "auto";
    }, [urlPathName]);

    useEffect(() => {
        if (displaySearchResults) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [displaySearchResults]);

    useEffect(() => {
        const getSearchResults = async () => {
            if (loadingSearchResults) {
                try {
                    const searchResults = await fetchSearchResults(searchText);
                    setSearchResults(searchResults);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoadingSearchResults(false);
                }
            }
        }
        getSearchResults();
    }, [loadingSearchResults, searchText]);


    const handleSearchResults = async (searchText: string) => {
        setSearchText(searchText);

        if (searchText.trim() === "") {
            setSearchResults([]);
            return;
        }

        setLoadingSearchResults(true);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if ((user && user.isVerified) || token) {
            if (!isLoggedIn) {
                setIsLoggedIn(true);
            }
        } else {
            if (isLoggedIn) {
                setIsLoggedIn(false);
            }
        }
    }, [isLoggedIn, user]);

    const handleSubmitSearchResults = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setDisplaySearchResults(false);
        router.push(`/searchResults/?search=${searchText}`);
    }

    return (
        <>
            <div className="sticky top-0 bg-white text-white z-50">
                <nav className="relative shadow-md bg-gray-950" role="navigation">

                    <div className="container mx-auto px-4 lg:px-8 flex flex-row h-[96px] items-center justify-between gap-4">
                        <Link className="text-lg lg:text-2xl font-extrabold" href="/" data-cy="websiteTitleNavLink" aria-current={urlPathName === "/" && "page"}>
                            Ecommerce Website
                        </Link>

                        {displayCollapseMenu &&
                            <div className="absolute md:hidden left-0 top-[80px] bg-gray-950 b-2 mb-lg-0 w-full md:flex flex-row gap-[32px]">
                                <div className="flex flex-col container mx-auto gap-2 p-4" aria-expanded={displayCollapseMenu} aria-hidden={!displayCollapseMenu} data-cy="collapsedNavLinkMenu">
                                    <NavLink link="/products/category/shoes" data-cy="shoesNavLinkCollapsed" aria-current={urlPathName === "/products/category/shoes" && "page"} onClick={() => setDisplayCollapseMenu(false)}>Shoes</NavLink>
                                    <NavLink link="/products/category/boots" data-cy="bootsNavLinkCollapsed" aria-current={urlPathName === "/products/category/boots" && "page"} onClick={() => setDisplayCollapseMenu(false)}>Boots</NavLink>
                                    <NavLink link="/products/category/athletic" data-cy="athleticShoesNavLinkCollapsed" aria-current={urlPathName === "/products/category/atheltic" && "page"} onClick={() => setDisplayCollapseMenu(false)}>Athletic Shoes</NavLink>
                                </div>
                            </div>
                        }

                        <div className="hidden md:flex flex-row gap-4 text-[24px]/24px lg:absolute justify-center lg:left-1/2 lg:transform lg:-translate-x-1/2">
                            <NavLink link="/products/category/shoes" data-cy="shoesNavLink" aria-current={urlPathName === "/products/category/shoes" && "page"} >Shoes</NavLink>
                            <NavLink link="/products/category/boots" data-cy="bootsNavLink" aria-current={urlPathName === "/products/category/boots" && "page"}>Boots</NavLink>
                            <NavLink link="/products/category/athletic" data-cy="athleticShoesNavLink" aria-current={urlPathName === "/products/category/atheltic" && "page"}>Athletic Shoes</NavLink>
                        </div>

                        <div className="flex flex-row">
                            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation" >
                                <span className="navbar-toggler-icon"></span>
                            </button> */}

                            <div className="flex flex-row justify-between gap-4">
                                <button type="button" className="cursor-pointer" aria-current="page" aria-label="Search button" onClick={() => { setDisplaySearchResults(!displaySearchResults); }} data-cy="searchBarIcon">
                                    <MagnifyingGlassIcon className="w-6 h-6 " aria-label="Search products icon" />
                                </button>
                                <Link
                                    href={`${(isLoggedIn ? "/profile" : "/login")}   `}
                                    className="cursor-pointer"
                                    aria-current={urlPathName === "/profile" && "page"}
                                    data-cy="profileNavLink"
                                    aria-label="User profile">
                                    <UserCircleIcon className="w-6 h-6" />
                                </Link>
                                <Link href="/cart" className="cursor-pointer" aria-current={urlPathName === "/cart" && "page"} data-cy="cartNavLink" aria-label="Cart">
                                    <div className="flex justify-center items-center relative">
                                        <ShoppingBagIcon className="w-6 h-6" />
                                        <span className="cartQuantity absolute flex items-center justify-center text-xs top-2 font-semibold" data-cy="shoppingBagIcon">
                                            {cartQuantity}
                                        </span>
                                    </div>
                                </Link>
                                <div className="md:hidden flex" >

                                    {!displayCollapseMenu ?
                                        <Bars3Icon className="w-6 h-6 cursor-pointer" onClick={() => setDisplayCollapseMenu(!displayCollapseMenu)} data-cy="collapsedMenuToggle" />
                                        :
                                        <XMarkIcon className="size-6 cursor-pointer" onClick={() => setDisplayCollapseMenu(!displayCollapseMenu)} data-cy="collapsedMenuToggle" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </nav >

                {displaySearchResults &&
                    <div
                        className="absolute text-gray-950 top-full left-0 w-full"
                        role="dialog"
                        aria-labelledby="modal-title"
                        aria-modal="true"
                        aria-live="assertive"
                    >
                        <div className="z-60 bg-white d-flex flex-column justify-content-center align-items-center shadow-xl" data-cy="searchResultsContainer">
                            <div className="relative container p-4 lg:p-8 mx-auto">

                                <div className="flex flex-row justify-between items-center mb-4">
                                    <span className="font-bold text-xl sm:text-2xl" id="modal-title">Search Results</span>
                                    <XMarkIcon
                                        className="w-8 h-8 cursor-pointer top-0 right-5"
                                        onClick={() => setDisplaySearchResults(!displaySearchResults)}
                                        aria-label="Close search results"
                                        data-cy="searchResultsCloseButton" />
                                </div>

                                <form onSubmit={handleSubmitSearchResults}>
                                    <div className="relative flex items-center w-full mb-4">
                                        <label className="inline-flex w-full gap-2">
                                            <span className="w-fit">Search Products:</span>
                                            <Input type={"text"} placeholder={"Search products"} value={searchText} onChange={(e) => handleSearchResults(e.target.value)} data-cy="searchBarInput" />
                                        </label>
                                        <button type="button" aria-label="Search button" id="navSearchButton" onClick={handleSubmitSearchResults} className="cursor-pointer absolute right-4">
                                        <MagnifyingGlassIcon className="size-6" aria-label="Icon of a magnifying glass" />
                                        </button>
                                    </div>
                                </form>

                                <div className="overflow-scroll rounded-lg max-h-100">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 " id="searchResultsProducts">

                                        {loadingSearchResults ?
                                            <div data-cy="loadingIndicator">Loading...</div>
                                            :
                                            <>
                                                {searchResults && searchResults.map((product) => (

                                                    <Link href={`/products/${(product._id)}`}
                                                        key={product._id} data-cy="searchResultsProduct">
                                                        <SmallProductCard
                                                            name={product.name}
                                                            price={product.price}
                                                            imageURL={product.images[0]}
                                                            alt={product.name}
                                                        />
                                                    </Link>
                                                ))}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[100vh] opacity-50 bg-black top-0 left-0 absolute z-[-1] " onClick={() => setDisplaySearchResults(false)}></div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};