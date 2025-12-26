'use client';

import Button from "@/components/Button";
import CartProductCard from "@/components/CartProduct";
import { getCart } from "@/redux/selectors";
import { removeProductFromCart, updateProductFromCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripePublishableKey as string);

export default function CartPage() {
    const cart = useSelector(getCart) || [];
    const dispatch = useDispatch();

    const cartTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

    const handleCheckoutButtonClick = async () => {
        const stripe: Stripe | null = await stripePromise;

        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                lineItems:
                    cart.map((product) => {
                        return {
                            price: product.priceId,
                            quantity: product.quantity
                        };
                    }),
                mode: 'payment',
                successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentSucceeded`,
                cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentCancelled`
            });
            if (error) {
                alert(error.message);
            }
        }
    }

    const summaryInfo = {
        subtotal: 0,
        taxes: 0,
        shipping: 0,
    }

    const handleUpdateProductQuanity = (_id: string, quantity: number, selectedSize: string) => {
        dispatch(updateProductFromCart({ _id, quantity, selectedSize }));
    }

    const handleRemoveItem = (_id: string, selectedSize: string) => {
        dispatch(removeProductFromCart({ _id, selectedSize }));
    }

    return (
        <main className="container px-4 lg:px-8 mx-auto py-[48px] h-full md:py-[64px] lg:py-[96px] flex flex-col gap-8 md:gap-12 lg:gap-16">

            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">
                <b>Cart</b>
                <span className="font-normal text-gray-600"> ({cart.length} items)</span>
            </h1>

            <div className="flex flex-col gap-4 mx-auto md:flex-row w-full gap-12 h-full">

                <div className="md:w-1/2">
                    <div className="flex flex-col gap-4 max-w-[768px] h-full" aria-live="polite">
                        {cart.length > 0 ?
                            <>
                                {cart?.map((product, index) => (
                                    <div className={`${(cart.length > 0) ? '' : ''} `} key={product._id + product.selectedSize} data-cy="cartProduct">
                                        <CartProductCard
                                            product={product}
                                            handleUpdateProductQuanity={handleUpdateProductQuanity}
                                            index={index}
                                            handleRemoveItem={handleRemoveItem} />
                                    </div>
                                ))}
                            </> : <>There are no products in your cart.</>
                        }
                    </div>
                </div>

                <div className="md:w-1/2">       
                    <div className="flex flex-col gap-4 max-w-[512px] bg-gray-100 p-4 rounded-xl">

                        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl border-b-1">Summary</h2>               

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                                <div>Subtotal:</div>
                                <div>
                                    ${summaryInfo.subtotal}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>Shipping:</div>
                                <div>{summaryInfo.shipping === 0 ? <>Free</> : <>{summaryInfo.shipping}</>}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Taxes:</div>
                                $0
                            </div>
                            <div className="flex justify-between font-bold">
                                <div aria-live="polite">Total:</div>
                                <div data-cy="cartTotal">${cartTotal}</div>
                            </div>
                        </div>

                        <Button color="dark" size="large" outline="" className="" onClick={handleCheckoutButtonClick}
                            disabled={cart.length === 0 ? true : false}
                            aria-disabled={cart.length === 0 ? true : false}
                        >
                            Checkout
                        </Button>              
                    </div>            
                </div>

            </div>
        </main>
    );
}