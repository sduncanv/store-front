import { useContext } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import './Product.css'

const Product = (data) => {
    const context = useContext(StoreContext)

    const addProductToCart = (event, productData) => {
        event.stopPropagation();

        context.setCount(context.count + 1);
        context.setCartProducts([...context.cartProducts, productData]);

        // context.openCheckoutSideMenu();
        // context.closeProductDetail();
    }

    const removeProductToCart = (event, productData) => {
        event.stopPropagation();
        context.setCount(context.count - 1);
        const filteredProducts = context.cartProducts.filter(product => product.product_id != productData.product_id);
        context.setCartProducts(filteredProducts);
    }

    const renderIcon = (product_id) => {
        const isInCart = context.cartProducts.filter(product => product.product_id === product_id).length > 0

        if (isInCart) {
            return (
                <div
                    className='product-add-cart'
                    onClick={(event) => removeProductToCart(event, data.data)}
                >
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

    const price = Number(data.data.price);
    const formattedPrice = price.toLocaleString('es-CO', {
        style: 'decimal',
        minimumFractionDigits: 0,
    });

    return (
        <div className='product-detail-main'>
            <figure>
                {/*
                <img src="https://acdn.mitiendanube.com/stores/002/413/552/products/x001-b8a45680c3a1883c8e169738468713791-2a2b3d0b3f1ac46b5e16973849453376-1024-1024.webp" alt="" />
                */}
                <img src={data.data.url} alt="" />
                {renderIcon(data.data.product_id)}
            </figure>
            <div className='product-data'>
                <span>{data.data.name}</span>
                <div>
                    {/* <p className='product-price'>$ {data.data.price}</p> */}
                    {/* <p>{data.data.created_at}</p> */}
                    <p className='product-price'>$ {formattedPrice}</p>
                    <p>{data.data.product_type_name}</p>
                </div>
            </div>
        </div>
    )
}

export default Product