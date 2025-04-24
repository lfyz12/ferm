import React, {useContext, useEffect, useState} from 'react';
import {Tabs, Tab} from "react-bootstrap";
import CreateAssortment from './createAssortment/CreateAssortment';
import EditAssortment from './editAssortment/EditAssortment';
import Feedback from './feedbacks/Feedback';
import GivingRole from './role/GivingRole';
import ChangeAvailable from './changeAvailable/ChangeAvailable';
import {Context} from '../..';
import "./admin.css"
import "./assortment.css"
import {observer} from 'mobx-react-lite';
import ConfirmOrders from './confirmOrders/ConfirmOrders';

function Admin() {
    const {assortment, feedback, use, user} = useContext(Context)
    const [products, setProducts] = useState([])
    const [feedbackList, setFeedbackList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [adminShow, setAdminShow] = useState(false);
    const [adminEditShow, setAdminEditShow] = useState(false);
    const [cashierShow, setCashierShow] = useState(false);


    const [operatorShow, setOperatorShow] = useState(false)

    async function getAllProducts() {
        await assortment.getAll()
        setProducts(assortment.assortments ? assortment.assortments : [])

    }

    async function getAllFeedbacks() {
        await feedback.getAll()
        setFeedbackList(feedback.feedbacks ? feedback.feedbacks : [])
    }

    async function getAllUsers() {
        await use.getAll()
        setUsersList(use.users)
    }

    useEffect(() => {
        if (user._user.role === 'ADMIN') {
            setAdminShow(true)
            getAllProducts();
            getAllFeedbacks();
            getAllUsers();
        }
        if (user._user.role === 'ADMIN_EDIT') {
            setAdminEditShow(true)
            getAllProducts();
        }
        if (user._user.role === 'OPERATOR') {
            setOperatorShow(true)
            getAllProducts();
        }
        if (user._user.role === 'CASHIER') {
            setCashierShow(true)
            getAllProducts();
        }
    }, [])


    return (
        <div className='container page_body admin-page mt-3 mb-3'>
            <Tabs
                as={'div'}
                defaultActiveKey="default"
                className="mb-3"
            >
                <div eventKey='default'></div>
                {adminEditShow || adminShow ?

                    <Tab eventKey="CreateAssortment" title="Создать ассортимент">
                        <CreateAssortment/>
                    </Tab>
                    :
                    <div></div>
                }
                {adminEditShow || adminShow ?
                    <Tab eventKey="EditAssortment" title="Редактировать ассортимент">
                        <EditAssortment products={products} getAllProd={getAllProducts}/>
                    </Tab>
                    :
                    <div></div>

                }
                {operatorShow || adminShow ?
                    <Tab eventKey="ConfirmOrders" title="Подтвердить заказ">
                        <ConfirmOrders></ConfirmOrders>
                    </Tab>
                    :
                    <div></div>
                }

                {adminShow ?
                    <Tab eventKey="Feedbacks" title="Отзывы">
                        <Feedback feedback={feedbackList}/>
                    </Tab>

                    :
                    <div></div>
                }
                {adminShow === true ?
                    <Tab eventKey="Giverole" title="Выдать роли">
                        <GivingRole users={usersList} onClick={getAllProducts}/>
                    </Tab>
                    :
                    <div></div>
                }
                {cashierShow || adminShow ?
                    <Tab eventKey="ChangeAvailable" title="Изменить наличия">
                        <ChangeAvailable products={products} onClick={getAllProducts}/>
                    </Tab>
                    :
                    <div></div>
                }
            </Tabs>
        </div>
    );
}

export default observer(Admin);
