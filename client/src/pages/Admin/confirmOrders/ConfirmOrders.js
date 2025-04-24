import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import ConfirmOrderItem from "./ConfirmOrderItem";
import './confirmOrder.css'
import { io } from 'socket.io-client'

function ConfirmOrders() {
    const { adminOrders, use } = useContext(Context)
    const [ordersDinamic, setOrdersDinamic] = useState([])
    const [usersDinamic, setUsersDinamic] = useState([])

    async function getOrders() {
        await adminOrders.getAll()
        // await use.getAll()
        setOrdersDinamic(adminOrders._orders ? adminOrders._orders.sort(order => order.id) : [])
        // setUsersDinamic(use._users ? use._users : [])
    }

    const socket = io(process.env.REACT_APP_API_URL, {
        path: "/webSocket/"
    })

    function sendWS(orderId, topic) {
        socket.emit(topic, {"orderId": orderId})
    }

    socket.on('update', message => {
        getOrders()
    })

    socket.on('cancel', message => {
        console.log(message)
        setOrdersDinamic(adminOrders._orders.map(order => {
            console.log(order)
            if (order.id === message) {
                order.canceled = true
            }
            return order
        }))
    })

    useEffect(() => {
        getOrders()
        socket.emit("newAdmin", "")
    }, [])

    // const [test, setTest] = useState(1)
    // setTimeout(() => {
    //     console.log(test)
    //     setTest(test + 1)
    // }, 2000)user={user}

    return (
        <div>
            {
                ordersDinamic.length === 0 ?
                    <div className="confirm-order-empty">На текущий момент не зафиксировано поступление новых заказов</div>
                    :
                    ordersDinamic.slice().sort((a, b) => b.canceled - a.canceled).map(order => {
                        const user = usersDinamic.find((potUser) => potUser.id === order.userId)
                        return <ConfirmOrderItem key={order.id} order={order}  sendWS={sendWS} update={getOrders}></ConfirmOrderItem>
                    })
            }
        </div>
    )
}

export default observer(ConfirmOrders)