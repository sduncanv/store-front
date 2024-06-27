import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ShoppingBagIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import './Navbar.css'

const Navbar = () => {

    const context = useContext(StoreContext)

    const handleClickLogout = () => {
        context.setUserData(null);
        context.setLoginApiResponse({});
    }

    const location = useLocation();

    let showSingup = false;
    if (location.pathname === '/login') {
        showSingup = true;
    }

    let showLogin = false;
    if (location.pathname === '/singup' || location.pathname === '/') {
        showLogin = true;
    }

    return (
        <nav className='navbar-main'>

            <ul className='navbar-ul'>
                <li className='navbar-li'>
                    <h1>Store</h1>
                </li>
                <li className='navbar-li navbar-search'>
                    <div className='navbar-li-div'>
                        <input
                            type='text'
                            placeholder='Search a product'
                            className='navbar-input'
                            onChange={(event) => context.setSearchByTitle(event.target.value)}
                        />
                        <button className='navbar-input-botton'>🔍</button>
                    </div>
                </li>
            </ul>

            <ul className='navbar-ul'>
                {
                    context.userData ? (null) : (
                        showLogin && (
                            <li className='navbar-li-2'>
                                <NavLink to='/login'>Login</NavLink>
                            </li>
                        )
                    )
                }
                {
                    context.userData ? (null) : (
                        showSingup && (
                            <li className='navbar-li-2'>
                                <NavLink to='/singup'>Registrarse</NavLink>
                            </li>
                        )
                    )
                }
                {
                    context.userData ? (
                        <li className='navbar-li-2 username'>
                            <NavLink to='/perfil'>
                                {context.userData.username}
                            </NavLink>
                        </li>
                    ) : (null)
                }
                {/* {
                    context.userData ? (
                        <li className='navbar-li-2 new_product'>
                            <NavLink to='/crear-producto'>Crear</NavLink>
                        </li>
                    ) : (null)
                } */}

                {/* <li className='navbar-li-2 li-cart-icon'>
                    <ShoppingBagIcon className='product-cart-icon'></ShoppingBagIcon>
                    <div className='navbar-cart'>{context.count}</div>
                </li> */}

                {
                    context.userData ? (
                        <li className='navbar-li-2 li-cart-icon'>
                            <NavLink to='/'>
                                <ArrowRightStartOnRectangleIcon
                                    onClick={handleClickLogout}
                                    className='product-cart-icon'
                                ></ArrowRightStartOnRectangleIcon>
                            </NavLink>
                        </li>
                    ) : (null)
                }
            </ul>

        </nav>
    )
}

export default Navbar