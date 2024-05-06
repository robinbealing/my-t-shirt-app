import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { ItemInCart } from './ItemInCart';
import { CartItem, Product, Size } from './types';
import './App.css';

function App() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedSize, setSelectedSize] = useState<Size>();
    const [errorText, setErrorText] = useState<string>('');
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product", {
          method: "GET"
        })
          .then((response) => response.json())
          .then((data: Product) => {
            setProduct(data);
          })
          .catch((error) => console.log(error));
    }, []);

    const addToCart = () => {
        if (product == null) {
            return;
        }

        if (selectedSize == null) {
            setErrorText("Please select a size");
        } else {
            const matchingItems = cart.filter((item) => item.size === selectedSize && item.name === product.title);

            if (matchingItems.length > 0) {
                const otherItems = cart.filter((item) => !matchingItems.includes(item));

                setCart(otherItems.concat([{
                                    name: product.title,
                                    price: product.price,
                                    size: selectedSize,
                                    quantity: matchingItems[0].quantity + 1
                                }]));

            } else {
                setCart(cart.concat([{
                                    name: product.title,
                                    price: product.price,
                                    size: selectedSize,
                                    quantity: 1
                                }]));
            }
        }
    }

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
        <span onClick={handleClick}>My Cart ( {cart.reduce((currentSum, b) => currentSum + b.quantity, 0)} )</span>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', width: 250, marginRight: 5 }}>

          {cart.map((item) =>
                <ItemInCart key={`${item.name} ${item.size}`} name={item.name} price={item.price} size={item.size} quantity={item.quantity} />
          )}

          </Box>
      </Popper>
      <div className="body">
        <img src="classic-tee.jpg" alt="Model wearing Classic Tee"/>
        <div className="details">
            <div className="title">{product?.title}</div>
            <div className="price">${product?.price.toFixed(2)}</div>
            <div className="description">{product?.description}</div>
            <div>
                <div className="size">SIZE<span className="required">*</span>
                <span className="selectedSize"> {selectedSize ?? errorText}</span></div>
                <div>
                    {product?.sizeOptions.map((sizeOption) => (
                        <Button
                            sx={sizeOption.label === selectedSize
                            ? {
                                color: '#222222',
                                borderColor: '#222222',
                                marginRight: '5px'
                            } : {
                                color: '#888888',
                                borderColor: '#CCCCCC',
                                marginRight: '5px'
                            }}
                            key={sizeOption.id}
                            onClick={() => setSelectedSize(sizeOption.label)}
                            variant="outlined">
                            {sizeOption.label}
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
