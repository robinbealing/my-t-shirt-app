import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('clicking Add to Cart when no size selected shows error', () => {
  render(<App />);
  const errorText = screen.queryByText("Please select a size");
  expect(errorText).not.toBeInDocument;
  const addButton = screen.getByRole('button', {name: "ADD TO CART"});
  fireEvent.click(addButton);
  screen.getByText("Please select a size");
});

test('clicking Add to Cart when size selected adds to cart count', () => {
  render(<App />);
  screen.getByText("My Cart ( 0 )");
  const smallButton = screen.getByRole('button', {name: "S"});
  const addButton = screen.getByRole('button', {name: "ADD TO CART"});
  fireEvent.click(smallButton);
  fireEvent.click(addButton);
  screen.getByText("My Cart ( 1 )");
});
