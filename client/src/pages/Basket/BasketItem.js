import React, {useContext, useState, Suspense, useEffect} from 'react';
import {Image, Button, Form, Spinner} from 'react-bootstrap';
import {Context} from '../..';
import {observer} from 'mobx-react-lite';
import './basket.css'
import DeleteButton from './DeleteButton';

const BasketItem = ({basketProduct, user, type, basketItem, basket, ...props}) => {
    const {product} = useContext(Context)
    const [isDataSend, setIsDataSend] = useState(false);
    const [countProduct, setCountProduct] = useState(basketItem.count)
    const [deleteAccept, setDeleteAccept] = useState(false)
    // const [type, setType] = useState(product.unitsOfMeasurement)
    const productType = {
        "кг": {
            value: 'кг',
            displayValue: 0.5,
            additionCount: 0.5,
            cost: Math.round(product.costPerOne * countProduct)
        },
        "г": {
            value: 'кг',
            displayValue: 0.1,
            additionCount: 0.1,
            cost: Math.round(product.costPerOne * countProduct)
        },
        "шт": {
            value: 'шт',
            displayValue: 1,
            additionCount: 1,
            cost: Math.round(product.costPerOne * countProduct)
        }
    }

    // useEffect(() => {
    //     assortmentList.map(productItem => productItem.id === basketItem.assortmentId && settype(productItem.type))
    // }, [basketItem.id])

    // const changeCountProductByInput = (e) => {
    //     // if (e.target.value > 0.5) {
    //         setCountProduct((prevCount) => {
    //             let newCount =+e.target.value;
    //             if (newCount % 10 !== 0 && productType[type].displayValue === 0.5) {
    //                 newCount = Math.round(newCount * 2)/2;
    //             } else if (productType[type].displayValue === 1) {
    //                 newCount = Math.round(newCount)
    //             } else if (newCount % 10 !== 0 && productType[type].displayValue === 0.1) {
    //                 newCount = newCount.toFixed(1)
    //             }


    //             if (newCount === 0 && productType[type].displayValue === 0.5) {
    //                 newCount = 0.5
    //             } else if (newCount === 0 && productType[type].displayValue === 1) {
    //                 newCount = 1;
    //             } else if (newCount === 0 && productType[type].displayValue === 0.1) {
    //                 newCount = 0.1
    //             }


    //             if (newCount === prevCount) {
    //                 return prevCount
    //             }

    //             delaySend()
    //             basketItem.count = newCount;
    //             props.countAproxSum();
    //             return newCount
    //         });
    //     // }
    // }

    useEffect(() => {
        if (user.isLoading) {
            setTimeout(() => user.setIsLoading(false), 2000)
        }
    }, [user.isLoading])

    useEffect(() => {
        if (isDataSend) {
            const timerId = setTimeout(() => {
                user.setIsLoading(true)
                basketProduct.changeCountByBasketIDAndAssortmentID(basket.basket.id, basketItem.assortmentId, countProduct)
                setIsDataSend(false);
            }, 1000);


            return () => clearTimeout(timerId);
        }
    }, [isDataSend, countProduct, basket.basket.id, basketItem.assortmentId, basketItem]);


    const delaySend = () => {
        setIsDataSend(true)
    }
    const plus = async () => {
        setCountProduct(prevCount => {
            const newCount = prevCount + productType[type].additionCount;
            basketItem.count = Math.round(newCount * 10) / 10;
            ;
            props.countAproxSum()
            delaySend();
            return Math.round(newCount * 10) / 10;
        })
    }


    const minus = () => {
        setCountProduct(prevCount => {
            if (countProduct <= productType[type].displayValue) {
                basketProduct.deleteOneBasketProductByBasketIDAndAssortmentID(basketItem.basketId, basketItem.assortmentId)
                props.deleteItem(basketItem.assortmentId)
            } else {
                const newCount = prevCount - productType[type].additionCount
                basketItem.count = Math.round(newCount * 10) / 10;
                ;
                props.countAproxSum()
                delaySend()
                return Math.round(newCount * 10) / 10;
            }
        })
    }


    return (

        <div className='d-flex align-items-center justify-content-between mt-3 mb-3 container product_item'>
            <Image className='basket-img' alt='картинка' src={process.env.REACT_APP_API_URL + basketItem.image}/>
            <div className='d-flex justify-content-center'>
                <div className='d-flex align-items-center'>
                    <div className='info-text ms-3'>
                        {basketItem.name}, {basketItem.unitsOfMeasurement}
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <div className='info-text'>
                    {Math.round(countProduct * basketItem.costPerOne)} ₽
                </div>
                <div className='mt-1 d-flex'>
                    <Button type='submit'
                            className=' d-flex justify-content-center align-items-center btn-plus basket_item_btn rounded-circle me-4 ms-4 bg-white'
                            onClick={minus}>
                        {countProduct <= productType[type].displayValue ? <DeleteButton/> : '-'}
                    </Button>
                    <div className='basket_item_cost'>{countProduct}</div>
                    <Button
                        className='d-flex justify-content-center align-items-center btn-plus basket_item_btn  rounded-circle ms-4 me-4 bg-white'
                        onClick={plus}>
                        +
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default observer(BasketItem);