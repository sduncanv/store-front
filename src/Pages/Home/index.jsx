import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import Product from '../../Components/Product'
import HomeCover from '../../Components/HomeCover'
import './Home.css'

function Home() {

    const context = useContext(StoreContext);

    const renderView = () => {
        if (context.searchByTitle?.length > 0) {

            if (context.filteredProducts?.length > 0) {
                return (
                    context.filteredProducts?.map(product => (
                        <Product key={product.product_id} data={product}/>
                    ))
                )
            } else {
                return (
                    <h1>No se encontró.</h1>
                )
            }

        } else {
            return (
                context.allProducts?.map(product => (
                    <Product key={product.product_id} data={product}/>
                ))
            )
        }
    }

    return (
        <Layout>
            <HomeCover />
            <li className='navbar-li-2 new_product'>
                <NavLink to='/crear-producto'>Crear</NavLink>
            </li>
            <div className='product-main'>
                {renderView()}
            </div>
        </Layout >
    )
}

export default Home