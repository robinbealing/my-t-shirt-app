import React from 'react';
import Button from '@mui/material/Button';
import './App.css';

function App() {
    const productText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

    //variable for cart contents

    //TODO: call product API for info: title, desc, price, size options
    //replace divs with styled tags e.g. <Title>, <Price> etc

  return (
    <div>
      <div className="header">My Cart ( 4 )</div>
      <div className="body">
        <div className="image">[Image here]</div>
        <div className="details">
            <div className="title">Classic Tee</div>
            <div className="price">$75.00</div>
            <div className="description">{productText}</div>
            <div>
                <div className="size">SIZE*</div>
                <div>
                    <Button variant="outlined">S</Button>
                    <Button variant="outlined">M</Button>
                    <Button variant="outlined">L</Button>
                </div>
                <Button variant="outlined">ADD TO CART</Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
