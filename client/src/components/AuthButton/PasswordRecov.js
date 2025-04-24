import React, {useContext} from 'react';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Context} from '../..';
import BackArrow from './BackArrow';
import PhoneInputMask from "../../InputMasks/PhoneInputMask";

const PasswordRecov = ({goBack, ...props}) => {
    const {user} = useContext(Context)
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [check, setCheck] = useState('number');
    const [show, setShow] = useState(false)
    const phoneMask = new PhoneInputMask();
    const handlePhoneChange = (event) => {
        const input = event.target.value;
        const regex = /^[+]?[0-9]*$/;

        if (input.startsWith('+79') && regex.test(input)) {
            setPhone(input);
        }
    };

    const changePasswordByNumber = () => {
        user.changePasswordByNumber(phone, newPassword);
        goBack();
    }
    const cheackCode = () => {
        user.checkCodeForRecovPassword(phone, code).then(res => {
            if (res) setCheck('')
        })
    }
    const changeIsActivatedByNumber = async () => {
        try {
            await user.sendCode(phone)
            console.log(phone)
            setCheck('code')

        } catch (error) {
            setShow(true)
        }
    }
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            {/* <div className='position-relative ms-auto me-3 acceptCloseBtn' id='accept' onClick={goBack}></div> */}

            <div className='mt-2 password_recov_title_box'>
                <BackArrow onClick={() => check === 'code' ? setCheck('number') : goBack()}/>
                <span className='password_recov_title text-center'>Восстановление пароля</span>
            </div>

            {check === 'number' ? <Form>
                    <Form.Group className={`container text-center w-75 mt-2 mb-3`}>
                        <Form.Label className=''>Телефон</Form.Label>
                        <Form.Control
                            className='rounded-4 formPhone'
                            type="text"
                            maxLength={18}
                            minLength={18}
                            placeholder="+7 (999) 999-99-99"
                            value={phoneMask.formatNumberToClient(phone)}
                            // maxLength={12}
                            onChange={e => setPhone(e.target.value)}/>
                    </Form.Group>
                    {show ?
                        <div className="d-flex align-items-center justify-content-center error-login mb-2 "> аккаунта с таким номером не существует</div>
                        :
                        <div style={{visibility: "hidden", height: "29px"}}> У </div>

                    }
                    <Button onClick={changeIsActivatedByNumber}
                            className='d-flex justify-content-center align-items-center ms-auto me-auto rounded-5 mb-2 border-0 formAuthBtn'>
                        Подтвердить
                    </Button>
                    {/* <div className='d-flex justify-content-around align-items-center me-auto ms-auto mb-2 formLinkBox'>
                <NavLink onClick={props.showRegistrationPage} className='me-3 text-decoration-none text-black'>Регистрация</NavLink>
                <NavLink onClick={props.showAuhtPage} className='ms-3 text-decoration-none text-black text-nowrap'>Вход</NavLink>
            </div> */}
                </Form>
                :
                check === 'code' ? <Form>
                        <Form.Group className={`container text-center w-75 mt-2 mb-3`}>
                            <Form.Label className=''>Код</Form.Label>
                            <Form.Control
                                className='rounded-4 formPhone'
                                type="text"
                                placeholder=""
                                value={code}
                                // maxLength={12}
                                onChange={e => setCode(e.target.value)}/>
                        </Form.Group>
                        <Button onClick={cheackCode}
                                className='d-flex justify-content-center align-items-center ms-auto me-auto rounded-5 mb-2 border-0 formAuthBtn'>
                            Подтвердить
                        </Button>
                    </Form>
                    :
                    <Form>
                        <Form.Group className="container text-center w-75 mt-2 mb-3 ">
                            <Form.Label className=''>Новый пароль</Form.Label>
                            <Form.Control
                                className='rounded-4 formPhone'
                                type="password"
                                value={newPassword}
                                // maxLength={12}
                                onChange={e => setNewPassword(e.target.value)}/>
                        </Form.Group>
                        <Button onClick={changePasswordByNumber}
                                className='d-flex justify-content-center align-items-center ms-auto me-auto rounded-5 mb-2 border-0 formAuthBtn'>
                            Изменить пароль
                        </Button>
                    </Form>}
        </Modal>
    );
};

export default PasswordRecov;