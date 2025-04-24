import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {BASKET_ROUTE} from '../../utils/consts';
import {NavLink} from 'react-router-dom';
import {Context} from '../..';
import {observer} from "mobx-react-lite";

const ShopBasketButton = () => {
    const {user, basket} = useContext(Context)
    const [aprSum, setAprSum] = useState(0)
    async function getBasket(){
        await basket.getBasketByUserID(user._user.id)
        setAprSum(basket.basket.aproxSum)
    }

    useEffect(() => {
        if (user._isAuth){
            getBasket()
        }
    }, []);

    useEffect(() => {
        setAprSum(basket._baskets.aproxSum)
    }, [basket._baskets.aproxSum]);
    return (
        <NavLink className="text-decoration-none" to={BASKET_ROUTE}>
            <Button
                className='d-flex justify-content-center text-decoration-none align-items-center btnBasket'
            >
                <div className='btnBasketIconBox'>
                    <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="#FFCDDC" fillRule="evenodd" clipRule="evenodd"
                              d="M6.12808 1.00012H29.1834L26.9877 14.0001H8.32383L6.12808 1.00012Z"
                              className="btnBasketFill" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path stroke="#FFCDDC" fillRule="evenodd" clipRule="evenodd"
                              d="M11.5542 21C12.6588 21 13.5542 20.1046 13.5542 19C13.5542 17.8954 12.6588 17 11.5542 17C10.4496 17 9.5542 17.8954 9.5542 19C9.5542 20.1046 10.4496 21 11.5542 21Z"
                              className="btnBasketFill" strokeWidth="2"/>
                        <path stroke="#FFCDDC" fillRule="evenodd" clipRule="evenodd"
                              d="M23.5542 21C24.6588 21 25.5542 20.1046 25.5542 19C25.5542 17.8954 24.6588 17 23.5542 17C22.4496 17 21.5542 17.8954 21.5542 19C21.5542 20.1046 22.4496 21 23.5542 21Z"
                              className="btnBasketFill" strokeWidth="2"/>
                        <path stroke="#FFCDDC" d="M5.5542 1L1.5542 1" className="btnBasketFill" strokeWidth="2"
                              strokeLinecap="round"/>
                    </svg>
                </div>
                {user._isAuth && <span className="navbar_basket_aprsum"> {Math.round(aprSum)}₽</span>}
            </Button>
        </NavLink>
    );
};

export default observer(ShopBasketButton);