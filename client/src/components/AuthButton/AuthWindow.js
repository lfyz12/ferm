import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import {NavLink} from 'react-router-dom';
import Accept from './Accept';
import PasswordRecov from './PasswordRecov';
import {Context} from '../..';
import {observer} from 'mobx-react-lite';
import PhoneInputMask from "../../InputMasks/PhoneInputMask";

const AuthWindow = ({show, handleClose, ...props}) => {
    const {user} = useContext(Context)

    const [phone, setPhone] = useState('+79');

    const handlePhoneChange = (event) => {
        const input = event.target.value;
        const regex = /^[+]?[0-9]*$/;

        if (input.startsWith('+79') && regex.test(input)) {
            setPhone(input);
        }
    };
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const [isLogin, setIsLogin] = useState(true)
    const [isAccept, setIsAccept] = useState(false)
    const [isPasswordRecov, setIsPasswordRecov] = useState(false)

    const phoneMask = new PhoneInputMask()

    const showPasswordRecovPage = () => {
        setIsLogin(false)
        setIsPasswordRecov(true)
    }

    const showRegistrationPage = () => {
        setIsAccept(false)
        setIsLogin(false)
        setIsPasswordRecov(false)
    }


    const showAuhtPage = () => {
        setIsLogin(true)
        setIsPasswordRecov(false)
    }

    const showAcceptPage = (bool) => {
        setIsLogin(false)
        setIsPasswordRecov(false)
        setIsAccept(bool)
    }

    const registration = () => {
        showAcceptPage(true)
    }
    const login = () => {
        user.login(number, password).then(res => res ? setShowError(false) : setShowError(true))

    }

    const closeError = () => {
        handleClose()
        setShowError(false)
    }

    if (isAccept) {
        return <Accept number={number} password={password} show={isAccept} goBack={showRegistrationPage}/>
    }

    if (isPasswordRecov) {
        return <PasswordRecov
            show={isPasswordRecov}
            goBack={showAuhtPage}
            handleClose={handleClose}
        />
    }

    function handleKeyPress(target) {
        if (target.charCode === 13) {
            try {
                login()
            }
            catch (e){
            }
        }
    }

    return (
        <Modal show={show} onHide={closeError}>
            <Container className='mt-2 ms-2'>
                {isLogin ? <span>Вход</span> : <span>Регистрация</span>}
            </Container>
            <Form onKeyPress={handleKeyPress}>
                <Form.Group className="container formPhoneBox  mt-2 mb-2">
                    <Form.Label className=''>Телефон</Form.Label>
                    <Form.Control
                        className='rounded-4 formPhone'
                        type="text"
                        placeholder="+7 (999) 999-99-99"
                        minLength={18}
                        maxLength={18}
                        value={phoneMask.formatNumberToClient(number)}
                        onChange={e => setNumber(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="container formPasswordBox mb-2">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        className='container rounded-4 formPassword'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                {isLogin ?
                    <div>
                        {showError ?
                            <div className='d-flex justify-content-center error-login mb-2'>Неверный логин или
                                пароль</div>
                            :
                            <div style={{visibility: "hidden", height: "28px"}}> У</div>
                        }
                        <Button onClick={() => login()}
                                className='d-flex justify-content-center align-items-center ms-auto me-auto rounded-5 mb-2 border-0 formAuthBtn'>
                            Продолжить
                        </Button>
                        <div
                            className='d-flex justify-content-around align-items-center me-auto ms-auto mb-2 formLinkBox'>
                            <NavLink onClick={showRegistrationPage}
                                     className='me-3 text-decoration-none text-black'>Регистрация</NavLink>
                            <NavLink onClick={showPasswordRecovPage}
                                     className='ms-3 text-decoration-none text-black text-nowrap'>Забыли
                                пароль?</NavLink>
                        </div>
                    </div> :
                    <div>
                        <Button onClick={() => registration()}
                                className='d-flex justify-content-center align-items-center ms-auto me-auto rounded-5 mb-2 border-0 formAuthBtn'>
                            Продолжить
                        </Button>
                        <div
                            className='d-flex justify-content-center align-items-center text-nowrap me-auto ms-auto mb-2 formLinkBox'>
                            Уже есть аккаунт?<NavLink onClick={showAuhtPage}
                                                      className='ms-1 text-decoration-none text-black'>Войти!</NavLink>
                        </div>
                    </div>
                }
            </Form>
        </Modal>
    );
};

export default observer(AuthWindow);