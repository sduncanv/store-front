import { createContext, useState, useEffect, useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [globalUsername, setGlobalUsername] = useState('');
    
    // Contains the login API response.
    const [loginApiResponse, setLoginApiResponse] = useState({});

    // Contains the products filter by title.
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchByTitle, setSearchByTitle] = useState('');

    // Contains all products.
    const [allProducts, setAllProducts] = useState([]);

    const URL_ALL_PRODUCTS = 'http://localhost:3030/dev/products';
    useEffect(() => {
        fetch(URL_ALL_PRODUCTS)
        .then(response => response.json())
        .then(data => setAllProducts(data.data))
    }, []);

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
    const [resultApiCodeAuth, setResultApiCodeAuth] = useState({});
    
    // Contains the singup API response.
    const [singupApiResponse, setSingupApiResponse] = useState({});

    // Contains the data to create product (input).
    const [nameProductToCreate, setNameProductToCreate] = useState('');
    const [priceProductToCreate, setPriceProductToCreate] = useState('');
    const [typeProductToCreate, setTypeProductToCreate] = useState(0);
    const [descriptionProductToCreate, setDescriptionProductToCreate] = useState('');
    const [imgProductToCreate, setImgProductToCreate] = useState('');

    // Contains the create product API response.
    const [resultAPICreateProduct, setResultAPICreateProduct] = useState({});

    // Get the data of user.
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (loginApiResponse.statusCode === 200 || resultApiCodeAuth.statusCode === 200) {
            fetchUserData();
        }
    }, [loginApiResponse]);

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
    const [typePoducts, setTypePoducts] = useState([]);

    useEffect(() => {
        const URL = 'http://localhost:3030/dev/types_products';
        fetch(URL)
        .then(response => response.json())
        .then(data => setTypePoducts(data.data))
    }, [])

    // Contains the user products API response.
    const [productsUser, setProductsUser] = useState(null);

    // ***********************************************************************************************

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
        }}>
            {children}
        </StoreContext.Provider>
    )
};

export function AuthRoute(props) {

    const context = useContext(StoreContext)
    const location = useLocation();

    if (!context.userData) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    };

    return props.children;
};