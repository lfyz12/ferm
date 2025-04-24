import React, { useContext, useState } from 'react';
import { Nav, Button } from 'react-bootstrap';

import ProductItem from './ProductItem';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

import ProductList from './ProductList';
import ShowProductsBtn from './ShowProductsBtn';

const SectionSalad = () => {


    return (
        <Nav className='salad-section-content'>
            <Nav className='
            d-flex
            mt-5
            mb-5
            section-header
            w-100
            border-3
            border-top
            border-bottom
            justify-content-center
            align-items-center
            fs-2
            showcase'>
                <h id='salad_section' className='text-center showcase'>Витрина салатов</h>
            </Nav>
            <Nav className='d-flex
            mt-2
            mb-2
            camera
            w-100  
            justify-content-center
            align-items-center
            bg-black
            text-white'
                style={{ height: '500px' }}
                >
                Камера
            </Nav>
            <ShowProductsBtn type={'Салаты'}/>
        </Nav>
    );
};

export default observer(SectionSalad);