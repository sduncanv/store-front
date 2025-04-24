import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider, AuthRoute } from '../../Context'
import Navbar from '../../Components/Navbar'
import Home from '../Home'
import Login from '../Login'
import Singup from '../Singup'
import ProductPage from '../ProductPage'
import CreateProduct from '../CreateProduct'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
// import Profile from '../Profile'
// import Footer from '../../Components/Footer'


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
                        <Route path='/product/:product_id' element={<ProductPage />} />

                        <Route path='/create-product' element={
                            <AuthRoute>
                                <CreateProduct />
                            </AuthRoute>
                        } />

                        {/* <Route path='/perfil' element={
                            <AuthRoute>
                                <Profile />
                            </AuthRoute>
                        } /> */}
                    </Routes>
                    <CheckoutSideMenu />
                    {/* <Footer /> */}
                </StoreProvider>
            </HashRouter>
        </>
    )
}

export default App