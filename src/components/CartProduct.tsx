import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CartProduct } from "@/types/types";

export default function CartProductCard({ product, handleUpdateProductQuanity, handleRemoveItem }: { product: CartProduct, handleUpdateProductQuanity: (_id: string, quantity: number, selectedSize: string) => void, index: number, handleRemoveItem: (_id: string, selectedSize: string) => void }) {
    return (
        <div className="flex flex-row sm:shadow
         rounded-xl sm:hover:shadow-lg transition-shadow 
         duration-200 ease-in-out 
         ">
            <div className="relative min-h-16 size-full md:size-48 aspect-square">
                <Image
                    src={product.imageURL.trim()}
                    alt={product.name}
                    fill
                    className="rounded-xl sm:p-0 sm:rounded-l-xl sm:rounded-r-none object-cover" />
            </div>

            <div className="flex flex-row justify-between px-4 w-full gap-4" aria-live="polite">

                <div className="flex flex-col sm:py-4 w-full gap-1">
                    <div className="flex justify-between w-contain">
                        <div className="font-bold">{product.name}</div>
                        <div className="font-bold" data-cy="cartProductPrice">${product.price * product.quantity}</div>
                    </div>
                    <div>Color: {product.selectedColor}</div>
                    <div>Size: {product.selectedSize}</div>

                    <div className="flex flex-row justify-between gap-4">
                        <fieldset>
                            <legend>Quantity:</legend>
                            <select className="form-select w-25 py-0 px-2 py-1 bg-gray-100 rounded-xl"
                                value={product.quantity}
                                onChange={(e) => handleUpdateProductQuanity(product._id, parseInt(e.target.value), product.selectedSize)} data-cy="cartProductSelectSizeList">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </fieldset>
                        <TrashIcon className="w-6 h-6 cursor-pointer self-end" onClick={() => handleRemoveItem(product._id, product.selectedSize)} data-cy="cartProductRemoveIcon" aria-label="Remove product from cart button" />
                    </div>
                </div>
            </div>
        </div>
    );
}