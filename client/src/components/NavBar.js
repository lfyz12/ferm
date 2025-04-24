import React, {useContext, useState, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from '..';
import AuthButton from './AuthButton/AuthButton';
import './navBar.css';
import AdressBox from './AdressButton/AdressBox';
import ShopBasketButton from './NavBarComponents/ShopBasketButton';
import BurgerMenu from './NavBarComponents/BurgerMenu';
import ShopLogo from './NavBarComponents/ShopLogo';
import {observer} from 'mobx-react-lite';
import ModalWindowYMaps from './YndexMaps/ModalWindowYMaps';

const NavBar = observer(({showHeader, ...props}) => {

    const {user} = useContext(Context)
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false)
    const [showAuth, setShowAuth] = useState(false);
    const handleShowControl = () => setShowAuth(!showAuth)
    const [adress, setAdress] = useState({
        adressString: 'Выберите адрес'
    })
    const findAdress = (adress) => {
        setAdress({
            adressString: adress && user._isAuth ? adress.slice(29).replace('улица', 'ул.') : 'Выберите адрес'
        })
    }

    useEffect(() => {
        findAdress(user._user.defaultAddress)
    }, [user._user.defaultAddress])

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    })

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })
    return (
        <Navbar className={`d-flex justify-content-between align-items-center navbar1 ${showHeader ? 'fixed' : ''}`}>
            <div className='ms-3 z-3 w-25'>
                <div className='d-flex align-items-center navBarBtnsBox'>
                    <BurgerMenu adress={adress.adressString} onClick={() => setShow(true)} width={width}/>
                    <ShopLogo/>
                </div>
            </div>
            {/* <SearchPanel/> */}
            <div className='me-3 '>
                <Nav className="d-flex justify-content-center align-items-center">
                    {user._isAuth && user._user.isActivated && width >= 1199 ?
                        <AdressBox adress={adress.adressString} onClick={() => setShow(true)} width={width}/> : ''}
                    <ModalWindowYMaps width={width} findAdress={findAdress} 
                                      onClick={() => setShow(false)} show={show}/>
                    <AuthButton show={showAuth} handleShowControl={handleShowControl}/>
                    <ShopBasketButton showMap={() => setShow(true)}/>
                </Nav>
            </div>
        </Navbar>
    );
});


export default NavBar;