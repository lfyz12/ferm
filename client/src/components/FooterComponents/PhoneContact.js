import React from 'react';
import Nav from 'react-bootstrap/Nav'

const PhoneContact = () => {
    return (
        <Nav>
            <span className='numbText'>Горячая линия</span>
            <a className='numb' href='tel:+77777777777'>
                +777777777777</a>
        </Nav>
    );
};

export default PhoneContact;