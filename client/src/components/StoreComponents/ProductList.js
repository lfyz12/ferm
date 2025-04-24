import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ProductItem from './ProductItem';
import { Context } from '../..';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import OwlCarousel from 'react-owl-carousel';

const ProductList = ({product, state, type, productShow}) => {
    const {basket, basketProduct, user} = useContext(Context)
    const [checkRepeatLoad, setCheckRepeatLoad] = useState(false)
    const [basketProductsList, setBasketProductsList] = useState([]);
    const deleteBasketItem = (id) => {
        setBasketProductsList(basketProductsList.filter(item => item.assortmentId !== id))
    }
    const fillBasketProductList = async () => {
        if (user._isAuth){
            await basketProduct.getAllBasketProductsByBasketID(basket.basket.id).then(res => {
                if (res) {
                    setBasketProductsList(basketProduct.basketProduct)
                    user.setIsLoading(false)
                    setCheckRepeatLoad(true)
                }
            })}
    }

    useEffect(() => {
        checkRepeatLoad && user.setIsLoading(false)
    }, [user.isLoading])

    useEffect(() => {
        // setCheckRepeatLoad(false)
        fillBasketProductList()
    }, [basketProduct.basketProduct.length])
    const options = {
        responsive: {
            0: {
                items: 1,
                nav: false,
                stagePadding: 20,
                margin: 50,
                center: true,
                touchDrag: true,
                mouseDrag: true
            },
            350: {
                items: 1,
                nav: false,
                stagePadding: 50,
                margin: 20,
                center: true,
                touchDrag: true,
                mouseDrag: true
            },
            450: {
                items: 1,
                nav: false,
                stagePadding: 80,
                margin: 10,
                touchDrag: true,
                mouseDrag: true
            },
            700: {
                items: 1,
                nav: false,
                stagePadding: 150,
                margin: 120,
                center: true,
                touchDrag: true,
                mouseDrag: true
            },

            800: {
                items: 2,
                nav: false,
                stagePadding: 50,
                margin: 80,
                touchDrag: true,
                mouseDrag: true
            },
            1000: {
                items: 2,   
                stagePadding: 150,
                margin: 235,
            },
            1400: {
                items: 3,
                stagePadding: 120,
                margin: 165,
            },
        },
    }
    
    return (

        
        <div className={`carousel-wrapper ${state}`}>
            <OwlCarousel
            className="owl-theme mt-5"
            dots={false}
            mouseDrag={false}
            touchDrag={false}
            nav
            navText={[
                '<span class="arrow prev">‹</span>',
                '<span class="arrow next">›</span>'
            ]}
            responsive={options.responsive}

        >
            {product.map(product =>
                <ProductItem productShow={productShow} 
                deleteBasketProductItem={deleteBasketItem} 
                basketProductsList={basketProductsList} 
                type={type} 
                key={product.type} 
                id={product.id} product={product}/>)}
        </OwlCarousel>
        </div>
    );
};

export default observer(ProductList);