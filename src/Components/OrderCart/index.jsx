import { XMarkIcon } from '@heroicons/react/24/solid'
import './OrderCart.css'

const OrderCart = props => {
    const { id, title, imageUrl, price, handleDelete } = props

    let renderXMarkIcon
    if (handleDelete) {
        renderXMarkIcon = <XMarkIcon onClick={() => handleDelete(id)} className='xmark-icon-ordercart'></XMarkIcon>
    }

    return (
        <div className='main-order-cart'>
            <div className='img-product'>
                <figure>
                    <img src={imageUrl} alt={title} />
                </figure>
            </div>
            <div className='info-product'>
                <p>{title}</p>
                <p>{price}</p>
            </div>
            {renderXMarkIcon}
        </div>
    )
}

export default OrderCart