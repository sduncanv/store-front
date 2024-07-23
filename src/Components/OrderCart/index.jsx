import { XMarkIcon } from '@heroicons/react/24/solid'
import './OrderCart.css'

const OrderCart = props => {
    const { id, title, imageUrl, price, handleDelete } = props

    let renderXMarkIcon
    if (handleDelete) {
        renderXMarkIcon = <XMarkIcon onClick={() => handleDelete(id)} className='xmark-icon-ordercart'></XMarkIcon>
    }

    const priceProduct = Number(price);
    const formattedPrice = priceProduct.toLocaleString('es-CO', {
        style: 'decimal',
        minimumFractionDigits: 0,
    });

    return (
        <div className='main-order-cart'>
            <div className='img-product'>
                <figure>
                    <img src={imageUrl} alt={title} />
                </figure>
            </div>
            <div className='info-product'>
                <p>{title}</p>
                {/* <p>{price}</p> */}
                <p>{formattedPrice}</p>
            </div>
            {renderXMarkIcon}
        </div>
    )
}

export default OrderCart