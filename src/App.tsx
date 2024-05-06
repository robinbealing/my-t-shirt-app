import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { ItemInCart } from './ItemInCart';
import './App.css';

const PRODUCT_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const PRODUCT_NAME = "Classic Tee";
const PRODUCT_PRICE = "$75.00";

const sizes = ["S", "M", "L"] as const;
type Size = typeof sizes[number];

type CartItem = {
    name: string,
    price: string,
    size: Size
}

function App() {
    const [cart, setCart] = useState<CartItem[]>([]); //Cart display will group items by size i.e quantity
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [errorText, setErrorText] = useState<string>('');

    const addToCart = () => {
        if (selectedSize === null) {
            setErrorText("Please select a size");
        } else {
            setCart(cart.concat([{
                    name: PRODUCT_NAME,
                    price: PRODUCT_PRICE,
                    size: selectedSize
                }]));
        }
    }

    //TODO: call product API for info: title, desc, price, size options

    //Popper logic from https://mui.com/material-ui/react-popper/
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
    <div>
      <div className="header">
        <span onClick={handleClick}>My Cart ( {cart.length} )</span>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', width: 250, marginRight: 5 }}>
            <ItemInCart name={PRODUCT_NAME} price={PRODUCT_PRICE} size='S' quantity={1} />
          </Box>
      </Popper>
      <div className="body">
        <img src="classic-tee.jpg" alt="Model wearing Classic Tee"/>
        <div className="details">
            <div className="title">{PRODUCT_NAME}</div>
            <div className="price">{PRODUCT_PRICE}</div>
            <div className="description">{PRODUCT_TEXT}</div>
            <div>
                <div className="size">SIZE<span className="required">*</span>
                <span className="selectedSize"> {selectedSize ?? errorText}</span></div>
                <div>
                    {sizes.map((size) => (
                        <Button
                            sx={size === selectedSize
                            ? {
                                color: '#222222',
                                borderColor: '#222222',
                                marginRight: '5px'
                            } : {
                                color: '#888888',
                                borderColor: '#CCCCCC',
                                marginRight: '5px'
                            }}
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            variant="outlined">
                            {size}
                        </Button>
                    ))}
                </div>
                <Button sx={{color: '#222222', borderColor: '#222222', marginTop: '10px'}}
                    variant="outlined"
                    onClick={() => addToCart()}
                >
                    ADD TO CART
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
