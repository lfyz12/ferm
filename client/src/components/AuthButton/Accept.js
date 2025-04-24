import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { NavLink, useLocation } from 'react-router-dom';
import { checkCode } from '../../http/userAPI';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import ResendIcon from './ResendIcon';
import ReactInputVerificationCode from 'react-input-verification-code';
import BackArrow from './BackArrow';
const Accept = observer(({number, password, goBack, ...props}) => {
    const { user } = useContext(Context)
    const [time, setTime] = useState(30);
    const [code, setCode] = useState('');

    const sendCodeAgain = () => {
        user.sendCode(number)
        setCode('')
        setTime(30)
    }
    
    const putAccept = () => {
        user.checkCode(number, code).then((res) => {
            if (res) window.location.reload()
        })    
    }

    useEffect(() => {
        if (props.show) {
            user.registration(number, password);
        } 
    }, [props.show])

    useEffect(() => {
        if (code.length === 5) {putAccept()}
    }, [code])

    const resendTimer = (bool) => {
        if (bool && time > 0) {
            // let timeCount = time;
            const timer = setTimeout(() => {
                if (time <= 0) {
                    setTime(() => 0);
                    return clearTimeout(timer)
                }
                setTime(prevCount => {
                    const newTime = prevCount - 1;
                    return newTime
                })
            }, 1000)

            return () => clearTimeout(timer)
        }
    }

    useEffect(() => {
       resendTimer(props.show)
    }, [time, props.show])

    return (
        <Modal show={props.show}>
        {/* <div className='position-relative ms-auto me-3 acceptCloseBtn' id='accept' onClick={goBack} ></div> */}
            <BackArrow onClick={goBack}/>
            <Container className='mt-2 ms-2 text-center'>
                <span>Подтверждение номера</span>
            </Container>
            <Form>
                <Form.Group className="text-center checkCodeBox mt-2 mb-4">
                    <Form.Label className='mb-4'>Код</Form.Label>
                    <ReactInputVerificationCode autoFocus placeholder='' onChange={setCode} value={code} length={5}/>
                </Form.Group>
                <div className='timer' >
                    {time > 0 ? time : <ResendIcon onClick={sendCodeAgain} className='ms-auto me-auto resend_code_button'/>}
                </div>
                <div className='d-flex text-center justify-content-center align-items-center me-auto ms-auto mb-2 formLinkBox '>
                    Если код не пришел, попробуйте снова через 30 секунд.
                </div>
                {/* <Button onClick={putAccept} disabled={code.length < 5} type='submit' className='d-flex justify-content-center align-items-center ms-auto me-auto rounded-5 mb-2 border-0 formCheckCodeBtn'>
                    Подтвердить
                </Button> */}
            </Form>
        </Modal>
    );
});

export default Accept;