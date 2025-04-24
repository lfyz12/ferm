import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';
import Toggle from '../../components/Toggle';
import {Context} from "../../index";

function OrderProduct({  orderProduct, ...props }) {
    const {basketProduct, user} = useContext(Context)
    const [toggleState, setToggleState] = useState(orderProduct === null ? false : orderProduct.moreOrLess)
    const [dataSend, setIsDataSend] = useState(false) 
    const toggleSwitch = () => {
        orderProduct.moreOrLess = !toggleState;
        setIsDataSend(true)
        setToggleState(!toggleState)
    }


    useEffect(() => {
        if (dataSend) {
            const timerId = setTimeout(() => {
                user.setIsLoading(true)
                basketProduct.changeMoreOrLessByBasketProductID(orderProduct.id, orderProduct.moreOrLess).then(res => user.setIsLoading(false))
                setIsDataSend(false)
            }, 1000)
            
            return () => clearTimeout(timerId)
        }
    }, [dataSend, toggleState])

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
                            {orderProduct.unitsOfMeasurement !== 'шт'  ?
                            <div className='checkbox-content'>
                                <Toggle toggleState={toggleState} toggleSwitch={toggleSwitch}  />
                            </div>
                            :
                            <div className=' w-100'>
                                <div className='w-100'></div>
                            </div>}
                        </div>

                        <div className='order_product_card_inform'>
                            <div className='order_product_card_cost'>{Math.floor(orderProduct.costPerOne * orderProduct.count)} ₽</div>
                            <div className='order_product_card_count'>{orderProduct.count} {orderProduct.unitsOfMeasurement}</div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default observer(OrderProduct)