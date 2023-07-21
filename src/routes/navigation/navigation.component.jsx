import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import CartIcon from '../../components/cart-icon/cart-icon.component'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { useDispatch, useSelector } from 'react-redux'
import {
	LogoContainer,
	NavLink,
	NavLinks,
	NavigationContainer,
} from './navigation.styles'

import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { signOutStart } from '../../store/user/user.action'
import { selectCurrentUser } from '../../store/user/user.selector'

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser)
	const isCartOpen = useSelector(selectIsCartOpen)

	const dispatch = useDispatch()
	const signOut = () => dispatch(signOutStart())

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo className='logo' />
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>SHOP</NavLink>

					{currentUser ? (
						<NavLink as='span' onClick={signOut}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	)
}

export default Navigation
