import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {ChangeEvent} from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // const dataTransfer = new DataTransfer();
    //
    // Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

    const file = event.target.files![0];
    const displayUrl = URL.createObjectURL(file)

    return {file, displayUrl};
}

export function convertIDR(number: number | string | undefined) {
    const numValue = typeof number === "string" ? parseFloat(number) : (number ?? 0);
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(numValue);
}  