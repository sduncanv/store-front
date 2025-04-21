import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
    ShoppingBagIcon, ArrowRightStartOnRectangleIcon,
    ShoppingCartIcon, ArrowRightEndOnRectangleIcon, SquaresPlusIcon
} from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import './Navbar.css'

const Navbar = () => {

    const context = useContext(StoreContext)

    const handleClickLogout = () => {
        context.setGlobalUsername('');
        context.setLoginApiResponse({});
        context.setCodeAuthEmail('');
        context.setResultApiCodeAuth({});
        context.setUserData(null);
        context.setSingupApiResponse(null);
        context.setResultAPICreateProduct({});
        context.setUserData(null);
        context.setProductsUser({});
        context.setAuthenticated(false);
        localStorage.clear();
    }

    const handleClickCart = () => {
        context.openCheckoutSideMenu();
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
        <nav className='navbar'>

            <div className="navbar-logo">
                <a href="">Store</a>
            </div>

            <div>
            {
                !context.inLogin ? (
                    <NavLink to='/login'>
                        <ArrowRightEndOnRectangleIcon
                        // onClick={handleClickLogout}
                        className='product-cart-icon-login'
                        ></ArrowRightEndOnRectangleIcon>
                    </NavLink>
                ) : (null)
            }
            {/* {
                context.inLogin ? (
                    <NavLink to='/create-product'>
                        <SquaresPlusIcon
                        // onClick={handleClickLogout}
                        className='product-cart-icon-login'
                        ></SquaresPlusIcon>
                    </NavLink>
                ) : (null)
            } */}
            {
                context.inLogin ? (
                    <NavLink to='/'>
                        <ArrowRightStartOnRectangleIcon
                        // onClick={handleClickLogout}
                        className='product-cart-icon-logout'
                        ></ArrowRightStartOnRectangleIcon>
                    </NavLink>
                ) : (null)
            }
            </div>

            {/* <ul className='navbar-ul'>
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
            </ul> */}

            {/*
            <ul className='navbar-ul'>
                {
                    context.userData ? (null) : (
                        showLogin && (
                            <li className='navbar-li-2'>
                                <NavLink to='/login'>Ingresar</NavLink>
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
                {
                    context.userData ? (
                        <li className='navbar-li-2 new_product'>
                            <NavLink to='/crear-producto'>Crear</NavLink>
                        </li>
                    ) : (null)
                }

                <li className='navbar-li-2 li-cart-icon'>
                    <ShoppingCartIcon
                        onClick={handleClickCart}
                        className='product-cart-icon'
                    ></ShoppingCartIcon>
                    <div className='navbar-cart'>{context.cartProducts.length}</div>
                </li>
            </ul> */}
        </nav>
    )
}

export default Navbar