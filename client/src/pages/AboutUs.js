import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Container';

import '../components/aboutUs.css'

const AboutUs = () => {
    return (
        <Container className='page_body'>
            <Nav className='h1 nav justify-content-start about-us-head'>
                Добро пожаловать в Уральский!
            </Nav>
            <Nav className='nav justify-content-center about-us-content'>
                О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас
                О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас
                О нас О нас О нас
                О нас О нас О нас О нас О нас О нас О нас
                О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас О нас
            </Nav>
        </Container>
    );
};

export default AboutUs;