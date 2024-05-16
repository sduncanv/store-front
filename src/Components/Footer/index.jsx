import { useContext } from 'react'
// import { NavLink } from "react-router-dom";
import { StoreContext } from '../../Context'

const Footer = () => {
    const context = useContext(StoreContext)

    return (
        <nav className="">Footer</nav>
    )
}

export default Footer