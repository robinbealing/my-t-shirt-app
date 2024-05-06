export const sizes = ["S", "M", "L"] as const;
export type Size = typeof sizes[number];

export type CartItem = {
    name: string,
    price: number,
    size: Size,
    quantity: number
}

export type SizeOption = {
    id: number,
    label: Size
}

export type Product = {
    id: number,
    title: string,
    description: string,
    price: number,
    imageURL: string,
    sizeOptions: SizeOption[]
}