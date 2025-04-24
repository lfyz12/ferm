import React, { useContext, useEffect, useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import ProductList from './ProductList';
import { Context } from '../..';
import { Transition } from 'react-transition-group';


const ShowProductsBtn = ({ type }) => {
    const { product, user} = useContext(Context)
    const [productShow, setProductShow] = useState(false)
    const [productsList, setProductsList] = useState([])
    const fillProductList = () => {
        setProductsList(product.products.filter(section => section.type === type))
    }

    useEffect(() => {
        fillProductList()
    }, [product.products])

    const click = () => {
        setProductShow(!productShow)
        !productShow && user.setIsLoading(true)
    }


    return (
        <Nav className='d-flex justify-content-center'>
            <Button className='btn-show-product meat' onClick={() => click()}>{productShow ? 'Скрыть товары' : 'Показать товары'}</Button>
            <Transition
                in={productShow}
                timeout={1000}
                mountOnEnter
                unmountOnExit
            >
                {state => <ProductList state={state} productShow={productShow}  type={type} product={productsList} />
                }
            </Transition>
        </Nav>
    );
};

export default ShowProductsBtn;