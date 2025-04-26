import { useContext, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import Product from '../../Components/Product'
import './Profile.css'
import { Button
} from '@chakra-ui/react'
import HeaderProfile from '../../Components/HeaderProfile'
import { dataPro } from '../../Utils/data'

const Profile = () => {

    const context = useContext(StoreContext);

    // useEffect(() => {
    //     if (Object.keys(context.productsUser).length === 0) {
    //         // fetchProductsUser();
    //     }
    // }, []);

    const renderAllProducts = () => {

        // if (context.productsUser?.length > 0) {
        //     return (
        //         context.productsUser?.map(product => (
        //             <Product key={product.product_id} data={product} />
        //         ))
        //     )
        // }

        const user_id = context.responseGetUser?.user_id

        const filteredProductsByUser = context.allProducts?.filter( // allProducts es una lista
            product => product.user_id === user_id
        )

        if (filteredProductsByUser?.length > 0) {
            return (
                filteredProductsByUser?.map(product => (
                    <Product key={product.product_id} data={product} />
                ))
            )
        }
    }

    return (
        <Layout>
            {/* <div className='profile-header'>
                <figure>
                    <img src="https://img.freepik.com/vector-gratis/hombre-guapo-joven-aislado-diferentes-poses-ilustracion-fondo-blanco_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1719100800&semt=ais_user" alt="" />
                </figure>
                <h1>SamuelDuncan</h1>
            </div>
            <div className='buttonCreate'>
                <Button
                    type='submit'
                >
                    <NavLink to='/crear-producto'>
                        Crear producto
                    </NavLink>
                </Button>
            </div> */}
            <HeaderProfile />
            <div className='buttons-profile'>
                <Link to='/create-product'>
                    <Button
                        size='md' height='48px' width='200px'
                        border='2px' borderColor='green.500'
                    >
                        Crear producto
                    </Button>
                </Link>
                <h1 className='my-product'>Mis productos:</h1>
            </div>
            <div className='product-main-profile'>
                {renderAllProducts()}
            </div>
        </Layout>
    )
}

export default Profile