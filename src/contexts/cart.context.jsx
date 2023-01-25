import { createContext, useState, useEffect } from 'react'

export const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	)

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	)

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		)
	}

	return [...cartItems, { ...productToRemove }]
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartItemCount: 0,
	cartTotalPrice: 0,
})

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartItemCount, setCartItemCount] = useState(0)
	const [cartTotalPrice, setCartTotalPrice] = useState(0)
	let totalMesmo = 0

	useEffect(() => {
		const count = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		)

		const price = cartItems.map((item) => {
			totalMesmo += item.quantity * item.price
			return totalMesmo
		})

		setCartTotalPrice(totalMesmo)
		setCartItemCount(count)
	}, [cartItems])

	const addItemToCart = (product) =>
		setCartItems(addCartItem(cartItems, product))

	const removeItemFromCart = (product) =>
		setCartItems(removeCartItem(cartItems, product))

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		cartItemCount,
		cartTotalPrice,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
