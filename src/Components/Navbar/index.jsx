import { useContext } from 'react'
import { StoreContext } from '../../Context'
import './Navbar.css'

const Navbar = () => {

    // const context = useContext(StoreContext)

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
                        />
                        <button className='navbar-input-botton'>
                            🔍
                        </button>
                    </div>
                </li>
            </ul>
            <ul className='navbar-ul'>
                <li className='navbar-li-2'>
                    <a href="/login">Log In</a>
                </li>
                <li className='navbar-li-2'>
                    <a href="/singup">Sing Up</a>
                </li>
                <li className='navbar-li-2'>
                    🛒
                </li>
            </ul>
        </nav>
    )
}

export default Navbar