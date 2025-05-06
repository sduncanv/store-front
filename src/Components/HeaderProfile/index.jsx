import './HeaderProfile.css'
import { useContext, useEffect, useCallback } from 'react'
import { StoreContext } from '../../Context'


const HeaderProfile = ({ data }) => {

    // const context = useContext(StoreContext)

    if (!data) return null

    return (
        <div className='profile-header'>
            <figure>
                <img src={data.url} alt={data.name} />
            </figure>
            <h1>{data.name}</h1>
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