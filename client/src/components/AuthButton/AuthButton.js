import React, {useContext} from 'react';
import AuthIcon from './AuthIcon';
import Button from 'react-bootstrap/Button';
import AuthWindow from './AuthWindow';
import {Context} from '../..';
import {observer} from 'mobx-react-lite';
import {NavLink} from 'react-router-dom';
import {ADMIN_ROUTE, PROFILE_ROUTE} from '../../utils/consts';
import AdminIcon from "./AdminIcon";


const AuthButton = observer(({show, handleShowControl, ...props}) => {
    const {user} = useContext(Context)


    const logout = () => {
        user.logout()
    }


    if (user._isAuth && user._user.isActivated && (user._user.role === 'ADMIN' || user._user.role === 'ADMIN_EDIT' || user._user.role === 'OPERATOR' || user._user.role === 'CASHIER' || user._user.role === 'COURIER')) {
        return <div className='d-flex align-items-center'>
            <Button
                onClick={() => logout()}
                type='submit'
                className='ms-5 me-2 justify-content-center align-items-center btnLogOut'
            >
                <span className='btnLogOutText'>Выйти</span>
            </Button>
            <NavLink className='text-decoration-none ' to={PROFILE_ROUTE}>
                <Button className='adminPanBtn rounded-circle'>
                    <AuthIcon/>
                </Button>
            </NavLink>
            <NavLink className='text-decoration-none' to={ADMIN_ROUTE}>
                <Button className='me-3 adminPanBtn d-flex rounded-circle justify-content-center align-items-center'>
                    <AdminIcon/>
                </Button>
            </NavLink>
        </div>
    }
    if (user._isAuth && user._user.isActivated) {
        return <div className='d-flex align-items-center'>
            <Button
                onClick={() => logout()}
                type='submit'
                className='ms-3 d-flex justify-content-center align-items-center btnLogOut'
            >
                <span className='btnLogOutText'>Выйти</span>
            </Button>
            <NavLink className='text-decoration-none' to={PROFILE_ROUTE}>
                <Button className='ms-2 container rounded-circle adminBtn'>
                    <AuthIcon/>
                </Button>
            </NavLink>
            <NavLink className='text-decoration-none' to={PROFILE_ROUTE}>
                <Button
                    className='ms-2 me-2 d-flex justify-content-around align-items-center  btnAuth btnAdmin'
                >
                    <span className='btnText'>Личный кабинет</span>
                </Button>
            </NavLink>
        </div>
    }
    return (
        <div>
            <Button
                className='d-flex justify-content-around align-items-center me-3 btnAuth'
                onClick={handleShowControl}
            >
                <div className='d-flex justify-content-around align-items-center w-100'>
                    <AuthIcon className='btnIcon'/>
                    <span className='btnText'>Войти</span>
                </div>
            </Button>
            <AuthWindow show={show} handleClose={handleShowControl}/>
        </div>
    );
});

export default AuthButton;