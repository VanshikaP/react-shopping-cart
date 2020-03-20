import React, { useState, useContext } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import {ProductContext} from './contexts/ProductContext'
import {CartContext} from './contexts/CartContext'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useLocalStorage('cart', []);

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item]);
	};

	const removeItem = itemId => {
		let newCart = cart.filter(i => i.id !== itemId);
		setCart(newCart);
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
				<CartContext.Provider value={{cart}}>
					<Navigation />
				</CartContext.Provider>

				{/* Routes */}
				<Route exact path="/">
					<Products />
				</Route>
				<CartContext.Provider value={{cart, removeItem}}>
					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
