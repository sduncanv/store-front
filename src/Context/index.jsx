import { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [globalUsername, setGlobalUsername] = useState('')

    const [codeAuth, setCodeAuth] = useState(0)
    const [showAlert, setShowAlert] = useState(false)

    const [dataSingup, setDataSingup] = useState(0)
    console.log('dataSingup', dataSingup)
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
    
    const filteredProductsByTitle = (products, searchByTitle) => {
        return products?.filter(product => product.name.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    useEffect(() => {
        if (searchByTitle) setFilteredProducts(filteredProductsByTitle(products, searchByTitle))
        }, [products, searchByTitle])

    const [viewAuth, setViewAuth] = useState(false)

    const [authenticated, setAuthenticated] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const [authStatus, setAuthStatus] = useState(0);

    // products == items
    const [typePoducts, setTypePoducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/dev/types_products')
        .then(response => response.json())
        .then(data => setTypePoducts(data.data))
    }, [])

    const [nameProductToCreate, setNameProductToCreate] = useState('')
    const [priceProductToCreate, setPriceProductToCreate] = useState('')
    const [typeProductToCreate, setTypeProductToCreate] = useState(0)
    const [descriptionProductToCreate, setDescriptionProductToCreate] = useState('')
    const [imgProductToCreate, setImgProductToCreate] = useState(null)
    const [dataCreateProductAPI, setDataCreateProductAPI] = useState({})

    return (
        <StoreContext.Provider value={{
            dataSingup, setDataSingup,
            globalUsername, setGlobalUsername,
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
            typePoducts, setTypePoducts,
            nameProductToCreate, setNameProductToCreate,
            priceProductToCreate, setPriceProductToCreate,
            typeProductToCreate, setTypeProductToCreate,
            descriptionProductToCreate, setDescriptionProductToCreate,
            imgProductToCreate, setImgProductToCreate,
            dataCreateProductAPI, setDataCreateProductAPI,
            authStatus, setAuthStatus
        }}>
            {children}
        </StoreContext.Provider>
    )
}