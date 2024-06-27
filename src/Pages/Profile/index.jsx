import { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import Product from '../../Components/Product'

const Profile = () => {

    const context = useContext(StoreContext);

    useEffect(() => {
        context.setAuthenticated(true)

        // const URL = `https://10h1dcdbp7.execute-api.us-east-1.amazonaws.com/dev/user?user_id=${context.userData?.user_id}`;
        const URL = `http://localhost:3030/dev/products?user_id=${context.userData?.user_id}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                context.setProductsUser(data.data)
            });
    }, [context])

    const renderTypeProducts = () => {
        if (context.productsUser?.length > 0) {
            return (
                context.productsUser?.map(product => (
                    <Product key={product.key} data={product} />
                ))
            )
        }
    }

    return (
        <Layout>
            <div>
                <h1>{context.userData?.name}</h1>
            </div>
            <h1>Mis productos:</h1>
            <div className='product-main'>
                <li className='navbar-li-2 new_product'>
                    <NavLink to='/crear-producto'>Crear</NavLink>
                </li>
                {renderTypeProducts()}
            </div>
        </Layout>
    )
}

export default Profile