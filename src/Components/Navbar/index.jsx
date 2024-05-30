import { useContext } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import './Navbar.css'

const Navbar = () => {

    const context = useContext(StoreContext)

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
                        <button className='navbar-input-botton'>
                            🔍
                        </button>
                    </div>
                </li>
            </ul>
            <ul className='navbar-ul'>
                <li className='navbar-li-2'>
                    <a href="/login">Iniciar sesión</a>
                </li>
                <li className='navbar-li-2'>
                    <a href="/singup">Crear cuenta</a>
                </li>
                <li className='navbar-li-2 li-cart-icon'>
                    <ShoppingBagIcon className='product-cart-icon'></ShoppingBagIcon>
                    <div className='navbar-cart'>{context.count}</div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar