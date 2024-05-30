import { useContext } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import './Product.css'

const Product = (data) => {

    const context = useContext(StoreContext)

    const addProductToCart = (event, productData) => {
        context.setCount(context.count + 1)
        context.setCartProducts([...context.cartProducts, productData])
    }

    const renderIcon = (product_id) => {

        const isInCart = context.cartProducts.filter(product => product.product_id === product_id).length > 0

        if (isInCart) {
            return (
                <div className='product-add-cart'>
                    <CheckIcon className='product-add-icon'></CheckIcon>
                </div>
            )
        } else {
            return (
                <div
                    className='product-add-cart'
                    onClick={(event) => addProductToCart(event, data.data)}
                >
                    <PlusIcon className='product-add-icon'></PlusIcon>
                    {/* <ShoppingBagIcon className='product-add-icon'></ShoppingBagIcon> */}
                </div>
            )
        }

    }

    return (
        <div className='product-detail-main'>
            <figure>
                {/*
                <img src="https://trellat.es/wp-content/uploads/2015/02/javascript_logo.png" alt="" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Jersei    -coll-alt.jpg" alt="" />
                <img src={data.data.url} alt="" />
            */}
                <img src="https://acdn.mitiendanube.com/stores/002/413/552/products/x001-b8a45680c3a1883c8e169738468713791-2a2b3d0b3f1ac46b5e16973849453376-1024-1024.webp" alt="" />
                {renderIcon(data.data.product_id)}
            </figure>
            <div className='product-data'>
                <span>{data.data.name}</span>
                <div>
                    <p className='product-price'>$ {data.data.price}</p>
                    <p>Escribenos al whatsapp</p>
                </div>
            </div>
        </div>
    )
}

export default Product