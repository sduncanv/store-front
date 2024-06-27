import { HashRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider, AuthRoute } from '../../Context'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Home from '../Home'
import Login from '../Login'
import Singup from '../Singup'
import Profile from '../Profile'
import CreateProduct from '../CreateProduct'

// const AppRoutes = () => {
//     let routes = useRoutes([
//         {path: '/', element: <Home/>},
//         {path: '/login', element: <Login/>},
//         {path: '/singup', element: <Singup/>},
//         // {path: '/authenticate-user', element: <Auth/>},
//         // {path: '/crear-producto', element: <CreateProduct/>},
//     ])

//     return routes
// }

// const App = () => {
//     return (
//         <StoreProvider>
//             <BrowserRouter>
//                 <Navbar />
//                 <AppRoutes/>
//                 <Footer />
//             </BrowserRouter>
//         </StoreProvider>
//     )
// }

const App = () => {
    return (
        <>
            <HashRouter>
                <StoreProvider>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />

                        <Route path='/singup' element={<Singup />} />

                        <Route path='/crear-producto' element={
                            <AuthRoute>
                                <CreateProduct />
                            </AuthRoute>
                        } />

                        {/* <Route path='/perfil' element={<Profile />} /> */}
                        <Route path='/perfil' element={
                            <AuthRoute>
                                <Profile />
                            </AuthRoute>
                        } />
                    </Routes>
                    <Footer />
                </StoreProvider>
            </HashRouter>
        </>
    )
}

export default App