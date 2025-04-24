import React from 'react';
import { STORE_ROUTE } from '../../utils/consts';
import { NavLink } from 'react-router-dom';

const ShopLogo = () => {

    return (
        <div className='d-flex justify-content-start align-items-center logo'>
          <NavLink to={STORE_ROUTE} className='shop_logo text-white text-decoration-none'></NavLink>
        </div>
    );
};

export default ShopLogo; 