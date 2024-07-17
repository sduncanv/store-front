import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import OrderCart from '../../Components/OrderCart'
import { totalPrice } from '../../Utils'
import './styles.css'

const CheckoutSideMenu = () => {
    const context = useContext(StoreContext);

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.product_id != id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01.02.23',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        context.setCartProducts([])
        // context.setOrder([...context.order, orderToAdd])
        context.setSearchByTitle(null)
    }

    if (!context.isCheckoutSideMenuOpen) {
        return null;
    }

    return (
        <aside
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu `}
        >
            <div className='title-checkout-menu'>
                <h2>My Order</h2>
                <div>
                    <XMarkIcon
                        className='xmark-icon'
                        onClick={() => context.closeCheckoutSideMenu()}
                    ></XMarkIcon>
                </div>
            </div>
            <div className='elements'>
                {
                    context.cartProducts.map(product => (
                        <OrderCart
                        key={product.product_id}
                        id={product.product_id}
                        title={product.name}
                        imageUrl={product.url}
                        price={product.price}
                        handleDelete={handleDelete}/>
                    ))
                }
            </div>
            <div className='price-product'>
                <p>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                {/* <Link to='/my-orders/last'>
                    <button
                    className='w-full bg-black py-3 text-white rounded-lg'
                    onClick={() => handleCheckout()}>
                        Checkout
                    </button>
                </Link> */}
                <button onClick={() => handleCheckout()}>
                    Checkout
                </button>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu