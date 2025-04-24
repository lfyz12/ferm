import React from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';

function OrderProductStage({ orderProduct }) {
    return (
        <div >
            {
                orderProduct === null ?
                    <div>Загрузка</div> :
                    <div className='order_product_card'>
                        <Image alt="Картинка"
                               className='order-product-image'
                               src={process.env.REACT_APP_API_URL + orderProduct.image}>

                        </Image>
                        <div className='order-product-name'>
                            <h2 className='order-product-text'>{orderProduct.name}</h2>
                        </div>

                        <div className='order_product_card_inform'>
                            <div className='order_product_card_cost'>{orderProduct.costPerOne * orderProduct.count} ₽</div>
                            <div className='order_product_card_count'>{orderProduct.count} {orderProduct.unitsOfMeasurement}</div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default observer(OrderProductStage)