import { useRoutes, BrowserRouter } from 'react-router-dom'
import { StoreProvider } from '../../Context'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Home from '../Home'
import Login from '../Login'
import Singup from '../Singup'
import CreateProduct from '../CreateProduct'
import Auth from '../../Components/Auth'

const AppRoutes = () => {
    let routes = useRoutes([
        {path: '/', element: <Home/>},
        {path: '/login', element: <Login/>},
        {path: '/singup', element: <Singup/>},
        {path: '/authenticate-user', element: <Auth/>},
        {path: '/crear-producto', element: <CreateProduct/>},
    ])

    return routes
}

const App = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <Navbar />
                <AppRoutes/>
                <Footer />
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App