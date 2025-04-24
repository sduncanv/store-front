import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { 
    ArrowRightStartOnRectangleIcon, ShoppingCartIcon,
    ArrowRightEndOnRectangleIcon, SquaresPlusIcon
} from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import './Navbar.css'

const Navbar = () => {

    const context = useContext(StoreContext)

    const handleClickLogout = () => {
        context.setInLogin(false)
        context.setResponseGetUser({})
    }

    return (
        <nav className='navbar'>

            <div className="navbar-logo">
                <NavLink to='/'>Store</NavLink>
            </div>

            <div className='navbar-options'>
                {
                    !context.inLogin ? (
                        <NavLink to='/login'>
                            <ArrowRightEndOnRectangleIcon
                            className='product-cart-icon-login'
                            ></ArrowRightEndOnRectangleIcon>
                        </NavLink>
                    ) : (null)
                }
                {
                    context.inLogin ? (
                        <NavLink to='/create-product'>
                            <SquaresPlusIcon
                            className='product-cart-icon-login'
                            ></SquaresPlusIcon>
                        </NavLink>
                    ) : (null)
                }

                <NavLink className='link-product-cart'>
                    <ShoppingCartIcon
                    onClick={() => context.openCheckoutSideMenu()} className='product-cart-icon-login'
                    ></ShoppingCartIcon>
                </NavLink>

                <p className='navbar-cart'>{context.cartProducts.length}</p>

                {
                    context.inLogin ? (
                        <NavLink to='/'>
                            <ArrowRightStartOnRectangleIcon
                            onClick={handleClickLogout}
                            className='product-cart-icon-logout'
                            ></ArrowRightStartOnRectangleIcon>
                        </NavLink>
                    ) : (null)
                }
            </div>

            {/*
                <ul className='navbar-ul'>
                    <li className='navbar-li navbar-search'>
                        <div className='navbar-li-div'>
                            <input
                                type='text'
                                placeholder='Search a product'
                                className='navbar-input'
                                // onChange={(event) => context.setSearchByTitle(event.target.value)}
                            />
                            <button className='navbar-input-botton'>🔍</button>
                        </div>
                    </li>
                </ul>
                <ul className='navbar-ul'>
                    {
                        context.userData ? (
                            <li className='navbar-li-2 username'>
                                <NavLink to='/perfil'>
                                    {context.userData.username}
                                </NavLink>
                            </li>
                        ) : (null)
                    }
                </ul>
            */}
        </nav>
    )
}

export default Navbar