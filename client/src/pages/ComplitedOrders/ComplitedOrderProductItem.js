import React from 'react';
import './historyOrder.css'
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';


function ComplitedOrderProductItem({ complitedOrderProduct }) {

    return (
        <div className='complitedOrderProductItem'>
            <div>
                <Image
                    className='product-img-historyOrder' alt='Картинка' src={process.env.REACT_APP_API_URL + complitedOrderProduct.image}
                ></Image>
                <h3 className="complitedOrderProductItem--title">
                    {complitedOrderProduct.name}
                </h3>
                <p className="complitedOrderProductItem--count">
                    Количество: {complitedOrderProduct.count} {complitedOrderProduct.unitsOfMeasurement}
                </p>
            </div>
        </div>
    )
}

export default observer(ComplitedOrderProductItem)