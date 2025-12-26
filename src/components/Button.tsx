import { ReactNode } from "react";

export default function Button({ size, color, outline, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size: string, color: string, outline: string, children: ReactNode }) {
    const sizeVariant = size === 'large' ? 'px-8 py-3 w-[256px]' : 'px-4 py-2';
    const colorVariant = color === 'light' ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-950 text-white hover:bg-gray-800';
    const outlineVariant = outline === 'outline' ? 'border border-gray-600 text-gray-600 hover:bg-gray-100' : '';
    const disabledVariant = props.disabled ? 'opacity-70 cursor-not-allowed' : '';

    return (
        <button {...props} className={`w-fit ${sizeVariant} ${colorVariant} ${outlineVariant} ${disabledVariant} rounded-full cursor-pointer font-semibold transition duration-150 ease-in-out`}>
            {children}
        </button>
    );
}