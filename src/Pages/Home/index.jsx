import { useContext } from 'react'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import Product from '../../Components/Product'
import './Home.css'
import HomeCover from '../../Components/HomeCover'

function Home() {

    const context = useContext(StoreContext)

    const renderView = () => {
        if (context.searchByTitle?.length > 0) {
            if (context.filteredProducts?.length > 0) {
                return (
                    context.filteredProducts?.map(product => (
                        <Product key={product.product_id} data={product}/>
                    ))
                )
            } else {
                <div>No se encontró.</div>
            }
        } else {
            return (
                context.products?.map(product => (
                    <Product key={product.product_id} data={product}/>
                ))
            )
        }
    }

    return (
        <Layout>
            <HomeCover />
            <div className='product-main'>
                {renderView()}
                {/*
                {
                    context.products?.map(product => (
                        <Product key={product.product_id} data={product}/>
                    ))
                }
                */}
            </div>
        </Layout >
    )
}

export default Home