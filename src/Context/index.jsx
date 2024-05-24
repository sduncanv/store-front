import { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [username, setUsername] = useState(0)
    const [password, setPassword] = useState(0)
    const [email, setEmail] = useState(0)
    const [name, setName] = useState(0)
    const [firstLastname, setFirstLastname] = useState(0)
    const [codeAuth, setCodeAuth] = useState(0)
    const [authAccount, setAuthAccount] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    console.log('showAlert: ', showAlert)

    const [dataSingup, setDataSingup] = useState(0)
    const [apiCodeAuth, setApiCodeAuth] = useState({})
    const [isRegistered, setIsRegistered] = useState();

    // products == items
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/dev/products')
        .then(response => response.json())
        .then(data => setProducts(data.data))
    }, [])
    
    // Shopping Cart · Increment quantity
    const [count, setCount] = useState(0)
    
    // Shopping Cart · Add products to cart
    const [cartProducts, setCartProducts] = useState([])
    
    const [searchByTitle, setSearchByTitle] = useState(null)
    
    const [filteredProducts, setFilteredProducts] = useState([])
    // console.log('filteredProducts: ', filteredProducts)
    
    const filteredProductsByTitle = (products, searchByTitle) => {
        return products?.filter(product => product.name.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    useEffect(() => {
        if (searchByTitle) setFilteredProducts(filteredProductsByTitle(products, searchByTitle))
        }, [products, searchByTitle])

    const [viewAuth, setViewAuth] = useState(false)
    console.log('viewAuth: ', viewAuth)
    const [authenticated, setAuthenticated] = useState(false);
    console.log('authenticated: ', authenticated)
    const [isOpen, setIsOpen] = useState(false)
    const [authStatus, setAuthStatus] = useState(null);

    return (
        <StoreContext.Provider value={{
            username,
            setUsername,
            password,
            setPassword,
            dataSingup, setDataSingup,
            email, setEmail,
            name, setName,
            firstLastname, setFirstLastname,
            codeAuth, setCodeAuth,
            apiCodeAuth, setApiCodeAuth,
            isRegistered, setIsRegistered,
            products, setProducts,
            count, setCount,
            cartProducts, setCartProducts,
            searchByTitle, setSearchByTitle,
            filteredProducts, setFilteredProducts,
            viewAuth, setViewAuth,
            showAlert, setShowAlert,
            authenticated, setAuthenticated,
            isOpen, setIsOpen,
            authStatus, setAuthStatus
        }}>
            {children}
        </StoreContext.Provider>
    )
}