import { createContext, useState, useEffect, useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { all_products, type_products } from '../Utils/data'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [inLogin, setInLogin] = useState(false)
    const [messageFromSignup, setMessageFromSignup] = useState(false)
    const [responseGetUser, setResponseGetUser] = useState({})

    const [usernameToAuth, setUsernameToAuth] = useState('')

    // const [allProducts, setAllProducts] = useState([])
    const [allProducts, setAllProducts] = useState(all_products.data) // Borrar, datos de prueba

    // const URL_ALL_PRODUCTS = 'http://localhost:3004/dev/products'
    // const getAllProducts = () => {
    //     fetch(URL_ALL_PRODUCTS)
    //         .then(response => response.json())
    //         .then(data => setAllProducts(data.data))
    // }

    // useEffect(() => {
    //     getAllProducts()
    // }, [])

    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [cartProducts, setCartProducts] = useState([])
    const [count, setCount] = useState(0)

    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchByTitle, setSearchByTitle] = useState('')

    // const [typePoducts, setTypePoducts] = useState([])
    const [typePoducts, setTypePoducts] = useState(type_products.data) // Borrar, datos de prueba

    // Function to filter by title.
    // const filteredProductsByTitle = (allProducts, searchByTitle) => {
    //     return allProducts?.filter(
    //         product => product.name.toLowerCase().includes(
    //             searchByTitle.toLowerCase()
    //         )
    //     )
    // }

    // useEffect(() => {
    //         if (searchByTitle) setFilteredProducts(filteredProductsByTitle(allProducts, searchByTitle))
    //     }, [allProducts, searchByTitle]
    // )

    return (
        <StoreContext.Provider value={{
            inLogin, setInLogin,
            messageFromSignup, setMessageFromSignup,
            responseGetUser, setResponseGetUser,
            usernameToAuth, setUsernameToAuth,
            allProducts, setAllProducts,
            // getAllProducts,
            isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu,
            cartProducts, setCartProducts,
            count, setCount,
            filteredProducts, setFilteredProducts,
            searchByTitle, setSearchByTitle,
            typePoducts, setTypePoducts,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export function AuthRoute(props) {

    const context = useContext(StoreContext)
    const location = useLocation()

    if (!context.inLogin) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return props.children
}