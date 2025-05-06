import { useContext, useEffect, useState, useCallback } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import Product from '../../Components/Product'
import './Profile.css'
import { Button } from '@chakra-ui/react'
import HeaderProfile from '../../Components/HeaderProfile'


const Profile = () => {

    const { username } = useParams()
    const location = useLocation()
    const context = useContext(StoreContext)

    const userFromState = location.state?.user
    const [responseGetUser, setResponseGetUser] = useState(userFromState || null)

    useEffect(() => {
        if (!userFromState && username) {
            const URL = `http://localhost:3003/dev/user?username=${username}`
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode == 200) {
                        setResponseGetUser(data.data[0])
                    } else {
                        console.log("Error solicitando datos de un usuario.")
                    }
                })
        }
    }, [username, userFromState])

    const renderAllProducts = () => {

        const user_id = responseGetUser?.user_id

        if (!user_id || !context.allProducts) return <p>Cargando productos...</p>

        const filteredProductsByUser = context.allProducts?.filter(
            product => product.user_id === user_id
        )

        if (filteredProductsByUser.length === 0) {
            return <p>No hay productos para este usuario.</p>
        }

        return (
            filteredProductsByUser?.map(product => (
                <Product key={product.product_id} data={product} />
            ))
        )
    }

    return (
        <Layout>
            <HeaderProfile key={responseGetUser?.user_id} data={responseGetUser} />
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