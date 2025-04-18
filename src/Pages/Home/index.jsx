import { useContext } from 'react'
// import { NavLink, Link } from 'react-router-dom'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import Product from '../../Components/Product'
import HomeCover from '../../Components/HomeCover'
import './Home.css'
// import {
//     Input, Button, FormControl, FormLabel, Select, Textarea
// } from '@chakra-ui/react'

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
            {/* <HomeCover /> */}
            {/* <NavLink to='/crear-producto'>
                <Button
                    size='md'
                    height='48px'
                    width='200px'
                    border='2px'
                    borderColor='green.500'
                >
                    Crear producto
                </Button>
            </NavLink> */}
            <div className='product-main'>
                {renderView()}
            </div>
        </Layout >
    )
}

export default Home