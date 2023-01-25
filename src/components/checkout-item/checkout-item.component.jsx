import Button from '../button/button.component'
const CheckOutItem = ({ item, removeItem }) => {
	const { imageUrl, name, quantity, price } = item

	return (
		<div>
			<span>Product</span>
			<img src={imageUrl} alt='' />
			<span>Description</span>
			<h2>{name}</h2>
			<span>Quantity</span>
			<h2>{quantity}</h2>
			<span>Price</span>
			<h2>{price}</h2>
			<span>Remove</span>
			<Button onClick={removeItem}>Remove</Button>
		</div>
	)
}
export default CheckOutItem
