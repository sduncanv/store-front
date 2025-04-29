import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import OrderCart from '../../Components/OrderCart'
import { totalPrice, getIdVendors } from '../../Utils'
import './CheckoutSideMenu.css'


const CheckoutSideMenu = () => {

    const context = useContext(StoreContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.product_id != id)
        context.setCartProducts(filteredProducts)
    }

    if (!context.isCheckoutSideMenuOpen) {
        return null
    }

    const price = Number(totalPrice(context.cartProducts))
    const formattedPrice = price.toLocaleString('es-CO', {
        style: 'decimal',
        minimumFractionDigits: 0,
    })

    let idsVendors = getIdVendors(context.cartProducts)

    const renderOption = () => {

        const groupedProducts = {}

        context.cartProducts.forEach(product => {
            if (!groupedProducts[product.user_id]) {
                groupedProducts[product.user_id] = []
            }
            groupedProducts[product.user_id].push(product)
        })

        return (
            <div className="vendor-options">
                {Object.keys(groupedProducts).map(vendorId => {

                    const products = groupedProducts[vendorId]
                    const total = products.reduce((sum, p) => sum + p.price, 0)
                    const formattedTotal = `${total.toLocaleString('es-CO')}`

                    return (
                        <div key={vendorId} className="vendor-option">
                            <p>Productos del vendedor {products[0]?.username}</p>
                            <button
                            onClick={() => {
                                const productList = products.map(p => `- ${p.name}`).join('\n')
                                const message = `Quiero comprar:\n${productList}\nTotal: ${formattedTotal}`
                                window.open(`https://wa.me/${products[0]?.phone_number}?text=${encodeURIComponent(message)}`, '_blank')
                            }}
                            >
                                Comprar (${formattedTotal})
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <aside
        className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu`}
        >
            <div className='title-checkout-menu'>
                <h2>Carrito de compras</h2>
                <div>
                    <XMarkIcon
                        className='xmark-icon' onClick={() => context.closeCheckoutSideMenu()}
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
            {
                idsVendors.length < 2 ? (
                    <div className='price-product'>
                        <p>
                            <span className='font-light'>Total:</span>
                            <span className='font-medium text-2xl'>${formattedPrice}</span>
                        </p>
                        <button type='button'
                        onClick={() => {
                            const productList = context.cartProducts.map(p => `- ${p.name}`).join('\n');
                            const message = `Hola, me gustaría comprar: \n${productList} \nTotal: ${formattedPrice}`;
                            window.open(`https://wa.me/${context.cartProducts[0]?.phone_number}?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        >
                            Comprar
                        </button>
                    </div>
                ) : (
                    <div className='price-product'>
                        {renderOption()}
                    </div>
                )
            }
        </aside>
    )
}

export default CheckoutSideMenu