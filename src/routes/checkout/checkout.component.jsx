import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import CheckOutItem from '../../components/checkout-item/checkout-item.component'

const CheckOut = () => {
	const { cartItems, cartTotalPrice, removeItemFromCart } =
		useContext(CartContext)
	return (
		<div>
			<div>
				{cartItems.map((cartItem) => (
					<CheckOutItem
						item={cartItem}
						key={cartItem.id}
						removeItem={removeItemFromCart}
					/>
				))}
			</div>
			<div>
				<h1>Total</h1>
				<span>{cartTotalPrice}</span>
			</div>
		</div>
	)
}

export default CheckOut
