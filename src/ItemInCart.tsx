import React from 'react';
import './App.css';
import { CartItem, sizes, Size } from './types';


export const ItemInCart = ({
    name,
    price,
    size,
    quantity
}: CartItem) => {
    return (
    <div className="body">
        <img src="classic-tee.jpg" alt="Model wearing Classic Tee" height="150px"/>
        <div className="details">
            <div className="title">{name}</div>
            <div>{quantity}x <span className="price">${price.toFixed(2)}</span></div>
            <div className="description">Size: {size}</div>
        </div>
    </div>
    )
}