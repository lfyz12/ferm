import { React } from 'react';
import Nav from 'react-bootstrap/Nav'
import './footer.css';
import PhoneContact from './FooterComponents/PhoneContact';
import SocialContent from './FooterComponents/SocialContent';




const Footer = () => {
    return (
        <Nav className='footer-wrapper'>
            <Nav className='footer-left-content'></Nav>
            <Nav className='footer-center-content'>
                © 2023 Уральский. Все права защищены.
            </Nav>
            <Nav className='footer-right-content'>
                <SocialContent />
                <PhoneContact />
            </Nav>
        </Nav>
    );
};


export default Footer;

