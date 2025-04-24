import React from 'react';
import { Button } from 'react-bootstrap';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import OwlCarousel from 'react-owl-carousel';

const CarouselSections = () => {

    const navOptions = {
        responsive: {
            0: {
                items: 3,
                nav: false,
                loop: true,
                stagePadding: 20,
                margin: 120, 
            },
            350: {
                items: 3,
                nav: false,
                loop: true,
                stagePadding: 20,
                margin: 120,
            },
            450: {
                items: 3,
                nav: false,
                loop: true,
                stagePadding: 70,
                margin: 100,
                center: true,
            },
            767: {
                items: 3,
                nav: false,
                loop: true,
                stagePadding: 120,
                margin: 200,
                center: true,
            },
        },
    }

    return (


        <OwlCarousel
            className="owl-theme navSection-carousel"
            dots={false}
            nav
            navText={[
                '<span class="arrow prev">‹</span>',
                '<span class="arrow next">›</span>'
            ]}
            responsive={navOptions.responsive}

        >
            <Button className='button-section' href="#meat_section">Мясной отдел</Button>
        <Button className='button-section' href="#salad_section">Салаты</Button>
        <Button className='button-section' href="#veg_section">Овощной отдел</Button>
        <Button className='button-section' href="#bakery_section">Выпечка</Button>
        <Button className='button-section' href="#dairy_section">Молочный отдел</Button>
        </OwlCarousel>
    );
};

export default CarouselSections;