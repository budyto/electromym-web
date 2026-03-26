import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light disabled:pointer-events-none disabled:opacity-50 rounded-lg";

    const variants = {
        primary: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20",
        secondary: "bg-metallic-gray text-white hover:bg-metallic-gray/90",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/20",
        outline: "border-2 border-metallic-silver text-metallic-dark hover:bg-metallic-light",
        ghost: "hover:bg-metallic-light text-metallic-gray hover:text-metallic-dark"
    };

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
