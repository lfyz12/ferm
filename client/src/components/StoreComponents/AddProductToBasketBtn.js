import React, {useContext, useState} from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Context } from '../..';

const AddProductToBasketBtn = ({product, countProduct, switchCardState, cost}) => {
    const {basketProduct} = useContext(Context)
    const {basket} = useContext(Context)
    
    const addProductInBasket = () => {
        basket._baskets.aproxSum += cost

        console.log(cost)
        console.log(countProduct)

        basketProduct.createBasketProduct(basket.basket.id, product.id, cost, countProduct, false)
        switchCardState()
    }
    return (
        <Nav className='d-felx justify-content-center mt-2'>
        <div className='text-white fb-2'>
            
        </div>
        <Button onClick={addProductInBasket} className='btn-addToBasket rounded-5'>
            В корзину
        </Button>
    </Nav>
    );
};

export default AddProductToBasketBtn;