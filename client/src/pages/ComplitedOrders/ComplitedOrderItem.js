import React, {useState, useEffect, useContext} from 'react';
import './historyOrder.css'
import {Context} from '../..';
import {observer} from 'mobx-react-lite';
import ComplitedOrderProductsStore from '../../store/ComplitedOrderProductsStore';
import OurDateTime from '../../dateTime/dateTime';
import ComplitedOrderProductItem from './ComplitedOrderProductItem';
import ComplitedOrdersStore from "../../store/ComplitedOrdersStore";


function ComplitedOrderItem({user, complitedOrder}) {
    const {basket} = useContext(Context)
    const complitedOrderStore = new ComplitedOrdersStore()
    const [complitedOrderProducts, setComplitedOrderProducs] = useState([])
    const complitedOrderProductsStore = new ComplitedOrderProductsStore()

    async function fetchComplitedOrderProducts() {
        await complitedOrderProductsStore.getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId(complitedOrder.id)
        setComplitedOrderProducs(complitedOrderProductsStore.complitedOrderProducts ?
            complitedOrderProductsStore.complitedOrderProducts : []
        )
    }

    const repeatOrder = async () => {
        await basket.getBasketByUserID(user._user.id)
        await complitedOrderStore.repeatOrder(complitedOrder.id, basket.basket.id)
    }


    useEffect(() => {
        fetchComplitedOrderProducts()
    }, [])

    return (
        <div className="complitedOrderItem">
            <h2 className="historyOrder-title">
                Заказ от {new OurDateTime(complitedOrder.orderTime).getStringDateTime()}
            </h2>
            <p className='historyOrder-text'>
                Адрес доставки: {complitedOrder.address}
            </p>
            <p className='historyOrder-text'>
                Был доставлен: {new OurDateTime(complitedOrder.complitedTime).getStringDateTime()}
            </p>
            <p className='historyOrder-text'>
                Итоговая стоимость заказа составила: <b>{complitedOrder.complitedSum}</b>
            </p>
            <div className='historyOrder-content'>
                <div className='historyOrder-products'>
                    {complitedOrderProducts.map(item => {
                            return <ComplitedOrderProductItem key={item.id} complitedOrderProduct={item}/>
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default observer(ComplitedOrderItem)