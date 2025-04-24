import React, {useState, useEffect, useContext} from 'react';
import {Form} from 'react-bootstrap';
import {Context} from '../..';
import {observer} from 'mobx-react-lite';
import OrderProduct from './OrderProduct'
import './order.css'
import {NavLink, useNavigate} from 'react-router-dom';
import {BASKET_ROUTE, STORE_ROUTE} from '../../utils/consts';
import OrderStages from './stagesOrder/OrderStages';
import PhoneInputMask from "../../InputMasks/PhoneInputMask";
import ModalWindowYMaps from '../../components/YndexMaps/ModalWindowYMaps';

// Страница заказа

function Order() {
    const {basketProduct, basket, order, user} = useContext(Context)
    const [orderProductsDinamic, setOrderProductsDinamic] = useState([])
    const [showMap, setShowMap] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [dataOfOrder, setDataOfOrder] = useState({address: '', enter: '', floor: '', flat: '', tel: '', comment: ''})
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [aproxSum, setAproxSum] = useState(0);
    const phoneMask = new PhoneInputMask()

    async function createOrderProductsFromBasketProducts() {
        if (JSON.stringify(basket._baskets) !== "{}") {
            await basketProduct.getBasketProductsWithAssortmentInfoByBasketID(basket._baskets.id).then(res => user.setIsLoading(false))
        }
        // if ()
        setOrderProductsDinamic(basketProduct.basketProduct ? basketProduct.basketProduct : [])
    }

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })

    async function editOrder() {
        navigate(BASKET_ROUTE)
    }

    function getStringAddress(dataOfOrder) {
        return "Улица: " + dataOfOrder.address + "; Подъезд: " + dataOfOrder.enter + "; Этаж: " + dataOfOrder.floor + "; Квартира: " + dataOfOrder.flat
    }

    async function confirmOrder(event) {
        const form = document.querySelector('.form_check_order');
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            await order.createOrderByBasketId(user._user.id, getStringAddress(dataOfOrder), aproxSum, true, basket.basket.id, dataOfOrder.comment, dataOfOrder.tel)
            basket._baskets.aproxSum = 0
            setOrderProductsDinamic([])
            tryGetOrder()
            return 0
        }
        setValidated(true);
    }

    const getDefaultAddress = async () => {
        await setDataOfOrder({...dataOfOrder, address: user._user.defaultAddress.slice(29).replace('улица', 'ул.'), tel: user._user.number})
        console.log(dataOfOrder.address, 0)
    }

    useEffect(() => {
        tryGetOrder()
        createOrderProductsFromBasketProducts()
        getDefaultAddress()
        console.log(dataOfOrder.address, 2)
    }, [user._user.defaultAddress, basket._baskets])

    const countAproxSum = async () => {
        setAproxSum(orderProductsDinamic.reduce((aproxSum, product) => aproxSum + product.count * product.costPerOne, 0))
    }

    useEffect(() => {
        if (user._isAuth) countAproxSum();
    }, [orderProductsDinamic])

    const [isOrder, setIsOrder] = useState(false)

    async function tryGetOrder() {
        await order.getOneOrderByUserId(user._user.id)
        setIsOrder((order.order !== null) && !order._order.canceled)
    }

    const findAdress = async (address) => {
        await setDataOfOrder({...dataOfOrder, address: address ? address.slice(29).replace('улица', 'ул.') : 'Выберите адрес'})
        console.log(dataOfOrder.address.slice(29).replace('улица', 'ул.'), 1)
    }
    return (
        <div className='page_body order_page_body'>
            {
                isOrder ?
                    <OrderStages tryGetOrder={tryGetOrder}></OrderStages> :
                    <div>
                        {/* <h1 className='page_title'> Текущий заказ</h1> */}
                        {orderProductsDinamic.length === 0 ?
                            <div className='order-empty-content'>Вы еще не сформировали свой заказ
                                <NavLink className='btn-returnToStore text-white text-decoration-none mt-5' to={STORE_ROUTE}>К отделам</NavLink>
                            </div> :
                            <div className='order_page_content'>
                                <div className='page_form_check_box'>
                                    <Form noValidate validated={validated} className='form_check_order'
                                          onSubmit={confirmOrder}>
                                        <h2 className='form_check_title'>Детали заказа</h2>
                                        <div className='form_check_order_section form_check_order_adress_section'>
                                            {/* <label>Адрес</label> */}
                                            <button required type='text'
                                            onClick={() => setShowMap(true)}
                                            // onFocus={() => setShowMap(true)}
                                                //    value={dataOfOrder.address ? dataOfOrder.address.slice(29) : dataOfOrder.address}
                                                   className='form-control form_check_order_section_input form_check_order_adress_section_input'
                                                    >{dataOfOrder.address}</button>
                                                   {/* <button onClick={() => setShowMap(true)}>
                                                    Открыть карту
                                                   </button> */}
                                            <ModalWindowYMaps width={width} findAdress={findAdress} 
                                            onClick={() => setShowMap(false)} show={showMap}/>
                                        </div>
                                        <div className='form_check_order_section form_check_order_phone_section'>
                                            {/* <label>Номер</label> */}
                                            <input required type='tel'
                                                   minLength={18}
                                                   maxLength={18}
                                                   value={phoneMask.formatNumberToClient(dataOfOrder.tel)}
                                                   onChange={e => setDataOfOrder({...dataOfOrder, tel: e.target.value})}
                                                   className='form-control form_check_order_section_input form_check_order_phone_section_input'
                                                   placeholder='+7 (999) 999-99-99'/>
                                        </div>
                                        <div className='form_check_order_section_group'>
                                            <div className='form_check_order_section form_check_order_door_section'>
                                                {/* <label>Подъезд</label> */}
                                                <input required type='text'
                                                       value={dataOfOrder.enter} onChange={e => setDataOfOrder({
                                                    ...dataOfOrder,
                                                    enter: e.target.value
                                                })}
                                                       className='form-control form_check_order_section_input form_check_order_door_section_input'
                                                       placeholder='Подъезд'/>
                                            </div>
                                            <div className='form_check_order_section form_check_order_floor_section'>
                                                {/* <label>Этаж</label> */}
                                                <input required type='text'
                                                       value={dataOfOrder.floor} onChange={e => setDataOfOrder({
                                                    ...dataOfOrder,
                                                    floor: e.target.value
                                                })}
                                                       className='form-control form_check_order_section_input form_check_order_floor_section_input'
                                                       placeholder='Этаж'/>
                                            </div>
                                            <div className='form_check_order_section form_check_order_flat_section'>
                                                {/* <label>Квартира\офис</label> */}
                                                <input required type='text'
                                                       value={dataOfOrder.flat} onChange={e => setDataOfOrder({
                                                    ...dataOfOrder,
                                                    flat: e.target.value
                                                })}
                                                       className='form-control form_check_order_section_input form_check_order_flat_section_input'
                                                       placeholder='Кв\офис'/>
                                            </div>
                                        </div>
                                        <div className='form_check_order_section_comment'>
                                            {/* <label>Комментарий</label> */}
                                            <input

                                                value={dataOfOrder.comment} onChange={e => setDataOfOrder({
                                                ...dataOfOrder,
                                                comment: e.target.value
                                            })}
                                                className='mb-2 form-control form_check_order_section_textarea'
                                                placeholder="Комментарий"
                                            />
                                        </div>
                                        {/*
              <button type='submit' className='order_products_accept_btn'>
              Заказать
            </button> */}

                                    </Form>
                                    <div className='order_products_check'>
                                        <div className='order_products_check_box'>
                                            <h2 className='order_products_check_title'>Ваш заказ</h2>

                                            <div className='order_products_check_list'>
                                                {orderProductsDinamic.map(
                                                    orderProduct => <OrderProduct key={orderProduct.id}
                                                                                  orderProduct={orderProduct}></OrderProduct>
                                                )}
                                            </div>
                                            <div className='order_products_check_btns'>
                                                {/* <button onClick={() => setOrderIsOk(!orderIsOk)} className='order_products_check_submit_btn'>Все верно</button> */}
                                                <button className='order_products_check_error_btn'
                                                        onClick={editOrder}>Изменить заказ
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='order_pay_form'>
                                    <h2 className='order_pay_title'>Итого</h2>
                                    <hr className='order_pay_sep_line'/>
                                    <div className='order_pay_content'>
                                        <span className="order_pay_span">Товары</span> <span
                                        className='order_pay_sum'>{aproxSum}</span>
                                    </div>
                                    <hr className='order_pay_sep_line'/>
                                    <div className='order_pay_foter'>
                                        <span className="order_pay_title">К оплате</span> <span
                                        className="order_pay_sum">{aproxSum}</span>
                                    </div>
                                    {order.order != null ?
                                        <div className="basket_warning"><p className="m-0">предыдущий заказ еще обрабатывается, попробуйте повторить заказ позже</p></div>
                                        :
                                        <button type='submit' onClick={confirmOrder}
                                                className='order_products_accept_btn'>
                                            Заказать
                                        </button>
                                    }
                                </div>
                            </div>}
                    </div>
            }

        </div>
    );
}

export default observer(Order);