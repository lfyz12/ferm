import React, { useContext, useState } from 'react';
import NavSections from './StoreComponents/NavSections';


import Container from 'react-bootstrap/esm/Container';
import CaruselHead from './StoreComponents/CaruselHead';
import './store.css';
import CarouselSections from './StoreComponents/CarouselSections';

import SectionMeat from './StoreComponents/SectionMeat';
import SectionSalad from './StoreComponents/SectionSalad';
import SectionVeg from './StoreComponents/SectionVeg';
import SectionBakery from './StoreComponents/SectionBakery';
import SectionDairy from './StoreComponents/SectionDairy';
import { Context } from '..';

const StoreMain = () => {

    return (
        <Container className='store-main'>
            <NavSections />
            <CarouselSections/>
            <CaruselHead />
            <SectionMeat />
            <SectionSalad/>
            <SectionVeg/>
            <SectionBakery/>
            <SectionDairy/>
        </Container>
    );
};

export default StoreMain;