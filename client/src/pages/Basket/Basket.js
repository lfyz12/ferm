import React, {useState, useContext, useEffect, useMemo} from 'react';
import Button from 'react-bootstrap/Button';
import './basket.css'
import BasketItem from './BasketItem';
import {Context} from '../..';
import {observer} from 'mobx-react-lite';
import {Container} from 'react-bootstrap';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {BASKET_ROUTE, ORDER_ROUTE, STORE_ROUTE} from '../../utils/consts';
import AuthWindow from '../../components/AuthButton/AuthWindow';
import BasketIcon from "./BasketIcon";

// Страница корзины

function Basket() {
    const {basketProduct} = useContext(Context)
    const [basketProducts, setBasketProducts] = useState([])
    const {basket, product} = useContext(Context)
    const {user, order} = useContext(Context)
    const [assortmentList, setAssortmentList] = useState([])
    const [aproxSum, setAproxSum] = useState(0)
    const [show, setShow] = useState(false);
    const handleShowControl = () => setShow(!show)
    const navigate = useNavigate()

    async function transferToOrder() {
        navigate(ORDER_ROUTE)
    }

    function sortById(id) {
        return (a, b) => a[id] > b[id] ? 1 : -1;
    }

    async function getOrder() {
        await order.getOneOrderByUserId(user._user.id)
    }    


    async function renderBasketItems() {
        if (JSON.stringify(basket._baskets) !== "{}") {
            await basketProduct.getBasketProductsWithAssortmentInfoByBasketID(basket._baskets.id).then(res => res && user.setIsLoading(false))
         } 
         if (basketProduct.basketProduct.length < 1) {
            user.setIsLoading(false)
         }
        setBasketProducts(basketProduct.basketProduct ? basketProduct.basketProduct : [])
        setAssortmentList(product.products ? product.products : []);
    }

    const deleteBasketItems = (id) => {
        setBasketProducts(basketProducts.filter(product => product.assortmentId !== id))
    }


    useEffect(() => {
        if (user._isAuth) {
            renderBasketItems()
            getOrder()
        }
    }, [basket._baskets.id])

    useEffect(() => {

        if (user._isAuth) countAproxSum()
    }, [basketProducts])

    const basketItems = useMemo(() => {
        return basketProducts.slice().sort(sortById('id'))
    }, [basketProducts])


    const countAproxSum = async () => {
        setAproxSum(basketProducts.reduce((aproxSum, product) => aproxSum + product.count * product.costPerOne, 0))
        basket._baskets.aproxSum = basketProducts.reduce((aproxSum, product) => aproxSum + product.count * product.costPerOne, 0)
    }

    return (
        <div className='mb-5 basket_page page_body'>
            <Container className='justify-content-center text-center page-name'>
                {basketItems.length === 0 ?
                    <div className='d-flex justify-content-center align-items-center basket-empty'>
                        {user._isAuth ?
                            <p>Ваша корзина пока что пуста</p>
                            :
                            <p>Чтобы добавить товар в корзину авторизируйтесь на сайте</p>
                        }
                        <div className='basket-empty-content'>
                            {user._isAuth ?
                                <>
                                    <BasketIcon/>
                                    <NavLink className='btn-returnToStore text-white text-decoration-none'
                                             to={STORE_ROUTE}>К отделам</NavLink>
                                </>
                                :
                                <button className='btn-returnToStore text-white'
                                        onClick={handleShowControl}>Войти</button>
                            }
                        </div>
                    </div> : basketItems.map((basketItem) =>
                        <BasketItem key={basketItem.id} user={user}
                                    countAproxSum={countAproxSum}
                                    deleteItem={deleteBasketItems}
                                    basket={basket}
                                    type={assortmentList.filter(item => item.id === basketItem.assortmentId)[0].unitsOfMeasurement}
                                    basketProduct={basketProduct}
                                    basketItem={basketItem}/>
                    )}
            </Container>

            {basketItems.length > 0 &&
                <div className='mt-2 d-flex justify-content-between align-items-center order_delive_form'>
                    <div>
                        Сумма заказа: {aproxSum} ₽
                    </div>
                    <div className='w-25'>
                        {order.order != null ?
                            <div className="basket_warning">Заказ уже создан, если нет <p className="m-0">подождите 5-10
                                минут и обновте страницу</p></div>
                            :
                            <Button
                                className='w-100 d-flex align-items-center justify-content-center order_delive_form_btn'
                                onClick={transferToOrder}
                            >
                                Заказать
                            </Button>
                        }
                    </div>
                </div>
            }
            <AuthWindow show={show} handleClose={handleShowControl}/>
        </div>
    );
}

export default observer(Basket);