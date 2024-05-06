import React from 'react';
import './App.css';

type ItemInCartProps = {
    name: string,
    price: string,
    size: string
    quantity: number
}

export const ItemInCart = ({
    name,
    price,
    size,
    quantity
}: ItemInCartProps) => {
    return (
    <div className="body">
        <img src="classic-tee.jpg" alt="Model wearing Classic Tee" height="150px"/>
        <div className="details">
            <div className="title">{name}</div>
            <div>{quantity}x <span className="price">{price}</span></div>
            <div className="description">Size: {size}</div>
        </div>
    </div>
    )
}