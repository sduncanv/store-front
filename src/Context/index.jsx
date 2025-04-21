import { createContext, useState, useEffect, useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { all_products, dataUser, type_products } from '../Utils/data'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [globalUsername, setGlobalUsername] = useState('');
    const [usernameToAuth, setUsernameToAuth] = useState('');
    const [messageFromSignup, setMessageFromSignup] = useState(false);
    const [inLogin, setInLogin] = useState(false);

    const [responseGetUser, setResponseGetUser] = useState({});

    // Contains the login API response.
    // const [loginApiResponse, setLoginApiResponse] = useState({});

    // --------------------------------------------
    const [loginApiResponse, setLoginApiResponse] = useState(() => {
        const savedUser = localStorage.getItem('loginApiResponse');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('loginApiResponse', JSON.stringify(loginApiResponse));
    }, [loginApiResponse]);
    // --------------------------------------------

    // Contains the products filter by title.
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchByTitle, setSearchByTitle] = useState('');

    // Contains all products.
    // const [allProducts, setAllProducts] = useState([]);
    const [allProducts, setAllProducts] = useState(all_products.data); // -----> borrar

    // const URL_ALL_PRODUCTS = 'http://localhost:3030/dev/products';
    // useEffect(() => {
    //     fetch(URL_ALL_PRODUCTS)
    //     .then(response => response.json())
    //     .then(data => setAllProducts(data.data))
    // }, []);

    // Function to filter by title.
    const filteredProductsByTitle = (allProducts, searchByTitle) => {
        return allProducts?.filter(
            product => product.name.toLowerCase().includes(
                searchByTitle.toLowerCase()
            )
        );
    };

    useEffect(() => {
            if (searchByTitle) setFilteredProducts(filteredProductsByTitle(allProducts, searchByTitle))
        }, [allProducts, searchByTitle]
    );

    // Contains the code from email API response.
    const [isOpenAlertForm, setIsOpenAlertForm] = useState(false);

    const [codeAuthEmail, setCodeAuthEmail] = useState('');
    const [resultApiCodeAuth, setResultApiCodeAuth] = useState(null);

    // Contains the singup API response.
    const [singupApiResponse, setSingupApiResponse] = useState(null);

    // Contains the data to create product (input).
    const [nameProductToCreate, setNameProductToCreate] = useState('');
    const [priceProductToCreate, setPriceProductToCreate] = useState('');
    const [typeProductToCreate, setTypeProductToCreate] = useState(null);
    const [descriptionProductToCreate, setDescriptionProductToCreate] = useState('');
    const [imgProductToCreate, setImgProductToCreate] = useState('');

    // Contains the create product API response.
    const [resultAPICreateProduct, setResultAPICreateProduct] = useState({});

    // Get the data of user.
    // const [userData, setUserData] = useState(null);
    // --------------------------------------------
    const [userData, setUserData] = useState(() => {
        const savedDataUser = localStorage.getItem('userData');
        return savedDataUser ? JSON.parse(savedDataUser) : {};
    });

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);
    // --------------------------------------------

    useEffect(() => {
        if (loginApiResponse?.statusCode === 200 || resultApiCodeAuth?.statusCode === 200) {
            // fetchUserData();
            setUserData(dataUser.data[0]); // -----> borrar
        }
    }, [loginApiResponse, resultApiCodeAuth]);

    const fetchUserData = () => {
        // const URL = `https://10h1dcdbp7.execute-api.us-east-1.amazonaws.com/dev/user?username=${globalUsername}`;
        const URL = `http://localhost:3020/dev/user?username=${globalUsername}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                setUserData(data.data[0]);
            })
            .catch(error => console.error('Error fetching user data:', error));
    };

    // Increment quantity - Shopping Cart
    const [count, setCount] = useState(0);

    // Add products to cart - Shopping Cart
    const [cartProducts, setCartProducts] = useState([]);

    // Condition to display the Alert Form
    const [authenticated, setAuthenticated] = useState(false);

    // Contains the types products API response.
    // const [typePoducts, setTypePoducts] = useState([]);
    const [typePoducts, setTypePoducts] = useState(type_products.data); // -----> borrar

    // useEffect(() => {
    //     const URL = 'http://localhost:3030/dev/types_products';
    //     fetch(URL)
    //     .then(response => response.json())
    //     .then(data => setTypePoducts(data.data))
    // }, [])

    // Contains the user products API response.
    const [productsUser, setProductsUser] = useState({});

    // Checkout Side Menu · Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // Product Detail · Open/Close
    // const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    // const openProductDetail = () => setIsProductDetailOpen(true)
    // const closeProductDetail = () => setIsProductDetailOpen(false)

    return (
        <StoreContext.Provider value={{
            searchByTitle, setSearchByTitle,
            filteredProducts, setFilteredProducts,
            globalUsername, setGlobalUsername,
            loginApiResponse, setLoginApiResponse,
            allProducts, setAllProducts,
            isOpenAlertForm, setIsOpenAlertForm,
            codeAuthEmail, setCodeAuthEmail,
            resultApiCodeAuth, setResultApiCodeAuth,
            singupApiResponse, setSingupApiResponse,
            nameProductToCreate, setNameProductToCreate,
            priceProductToCreate, setPriceProductToCreate,
            typeProductToCreate, setTypeProductToCreate,
            descriptionProductToCreate, setDescriptionProductToCreate,
            resultAPICreateProduct, setResultAPICreateProduct,
            userData, setUserData,
            count, setCount,
            cartProducts, setCartProducts,
            authenticated, setAuthenticated,
            typePoducts, setTypePoducts,
            productsUser, setProductsUser,
            imgProductToCreate, setImgProductToCreate,
            isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu,
            usernameToAuth, setUsernameToAuth,
            messageFromSignup, setMessageFromSignup,
            inLogin, setInLogin,
            responseGetUser, setResponseGetUser,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export function AuthRoute(props) {

    const context = useContext(StoreContext)
    const location = useLocation();

    if (!context.inLogin) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    };

    return props.children;
}