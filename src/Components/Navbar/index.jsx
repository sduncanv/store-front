import { useContext } from 'react'
// import { NavLink } from "react-router-dom";
import { StoreContext } from '../../Context'

const Navbar = () => {
    const context = useContext(StoreContext)

    return (
        <nav className="">Navbar</nav>
    )
}

export default Navbar