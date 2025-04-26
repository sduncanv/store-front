import './HeaderProfile.css'
import { useContext, useEffect, useCallback } from 'react'
import { StoreContext } from '../../Context'
// import {
//     Input, Button, FormControl, FormLabel, Select, Textarea
// } from '@chakra-ui/react'
// import { NavLink } from 'react-router-dom'

const HeaderProfile = ({ children }) => {

    const context = useContext(StoreContext);

    return (
        <div className='profile-header'>
            <figure>
                <img src="https://img.freepik.com/vector-gratis/hombre-guapo-joven-aislado-diferentes-poses-ilustracion-fondo-blanco_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1719100800&semt=ais_user" alt="" />
            </figure>
            <h1>{context.responseGetUser?.name}</h1>
            {/* <h1>{context.userData?.name}</h1> */}
            {/* <h1>{context.productsUser?.length} productos</h1> */}
            {/* <div className='buttonCreate'>
                <Button
                    type='submit'
                >
                    <NavLink to='/crear-producto'>
                        Crear producto
                    </NavLink>
                </Button>
            </div> */}
        </div>
    )
}

export default HeaderProfile