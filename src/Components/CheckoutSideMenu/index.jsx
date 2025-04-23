import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import OrderCart from '../../Components/OrderCart'
import { totalPrice } from '../../Utils'
import './styles.css'
import { Navigate, useNavigate } from 'react-router-dom'

const CheckoutSideMenu = () => {
    const context = useContext(StoreContext);
    // const navigate = useNavigate();

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.product_id != id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckout = () => {
        console.log("Boton Checkout presionado.")
        // const orderToAdd = {
        //     date: '01.02.23',
        //     products: context.cartProducts,
        //     totalProducts: context.cartProducts.length,
        //     totalPrice: totalPrice(context.cartProducts)
        // }
        // context.setCartProducts([])
        // context.setOrder([...context.order, orderToAdd])
        // context.setSearchByTitle(null)
    }

    if (!context.isCheckoutSideMenuOpen) {
        return null;
    }

    const price = Number(totalPrice(context.cartProducts));
    const formattedPrice = price.toLocaleString('es-CO', {
        style: 'decimal',
        minimumFractionDigits: 0,
    });

    return (
        <aside
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu `}
        >
            <div className='title-checkout-menu'>
                <h2>Carrito de compras</h2>
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
            <div className='divider'></div>
            <div className='price-product'>
                <p>
                    <span className='font-light'>Total:</span>
                    {/* <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span> */}
                    <span className='font-medium text-2xl'>${formattedPrice}</span>
                </p>
                {/* <Link to='/my-orders/last'>
                    <button
                    className='w-full bg-black py-3 text-white rounded-lg'
                    onClick={() => handleCheckout()}>
                        Checkout
                    </button>
                </Link> */}
                <button type='button'
                onClick={() => window.open('https://wa.me/+573011561394?text=prueba', '_blank')}
                // onClick={() => handleCheckout()}
                >
                    Comprar
                </button>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu