import React from 'react';
import Button from 'react-bootstrap/Button';
import AdressBoxIcon from './AdressBoxIcon';

const AdressBox = ({adress, ...props}) => {
    
    return (
        <Button className={`
        border-0
        p-1
        me-3
        ms-3
        d-flex
        justify-content-center
        align-items-center
        ${props.width <= 1199 ? 'menuAdressBox' : 'adressBox'}`}
        {...props}
        
        >
        <div className='d-flex w-100 justify-content-around align-items-center adressBoxContent' >
            {props.width >= 1199 && <div className='adressBoxSvgIcon'><AdressBoxIcon/></div>}
            <span className='text-center adressBoxText'>{adress}</span>
        </div>

        </Button>
    );
};

export default AdressBox;
