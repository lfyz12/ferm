import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';


const NavSections = () => {
    
    return (
        <Navbar className='sections'>
            <Button className='button-section' href="#meat_section">Мясной отдел</Button>
            <Button className='button-section' href="#salad_section">Салаты</Button>
            <Button className='button-section' href="#veg_section">Овощной отдел</Button>
            <Button className='button-section' href="#bakery_section">Выпечка</Button>
            <Button className='button-section' href="#dairy_section">Молочный отдел</Button>
        </Navbar>
    );
};

export default NavSections;