import React from 'react';
import {useState} from 'react';
import {Button, Dropdown, Form, Offcanvas} from "react-bootstrap";
import FeedbackService from '../service/FeedbackService';
import './feedb.css';
import ErrorAuthModal from "./ErroePageComponents/ErrorModal/ErrorAuthModal";

const FeedB = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [variant, setVariant] = useState('secondary')

    const [type, setType] = useState('Тип отзыва')
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

    const [validated, setValidated] = useState(false);

    const [showError, setShowError] = useState(false)
    const changed = (type) => {
        setType(type)
        if (type === 'Положительный') {
            setVariant('success')
            return 0
        }
        if (type === 'Нейтральный') {
            setVariant('warning')
            return 0
        }
        setVariant('danger')
    }

    const afterButton = async (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true)

        if (form.checkValidity() === false || type.includes('Тип отзыва')) {
            event.stopPropagation();
            setVariant('danger')

        } else {
            try {
                await FeedbackService.sendFeedback(type, mail, name, comment)
                setValidated(false)
                setShow(false)
                setVariant('secondary')
                setType('Тип отзыва')
                setName('')
                setMail('')
                setComment('')
            } catch (error) {
                setShowError(true)
            }
        }
    }

    async function handleKeyPress(target) {
        if (target.charCode === 13) {
            try {
                await afterButton("submit")
            } catch (e) {
            }
        }
    }


    return (
        <>
      <span onClick={handleShow} className="me-2 text-white feedb-link menuItemText">
        Оставить отзыв
      </span>
            <Offcanvas className='border-0 feedb-wrapper' show={show} placement='end' onHide={handleClose}>
                <Offcanvas.Header className='feedback-header'>
                    <Offcanvas.Title>Оставить отзыв</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='feedb-body'>
                    <p className='mb-4'>Дорогой покупатель! Мы ценим вашу инициативу в выражении вашего мнения о наших
                        товарах и услугах, так как это помогает нам постоянно развиваться,
                        исправлять ошибки и укреплять наши преимущества.</p>
                    <Form noValidate validated={validated} onKeyPress={handleKeyPress} onSubmit={afterButton}>
                        <label style={{display: `${validated ? '' : 'none'}`}}>Не все поля заполнены</label>
                        <p>Выберите тип отзыва </p>
                        <Dropdown className='mb-4' onSelect={e => changed(e)}>
                            <Dropdown.Toggle variant={variant}> {type} </Dropdown.Toggle>
                            <Dropdown.Menu className='dropDown-feedback'>
                                <Dropdown.Item className='button-good'
                                               eventKey={'Положительный'}>Положительный</Dropdown.Item>
                                <Dropdown.Item className='button-neutral'
                                               eventKey={'Нейтральный'}>Нейтральный</Dropdown.Item>
                                <Dropdown.Item className='button-bad' eventKey={'Негативный'}>Негативный</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Group>
                            <Form.Label className='mb-3'>
                                Почта
                                <p className="feedb-postscript">заполнять необязательно</p>
                            </Form.Label>
                            <Form.Control
                                className='mb-4 input'
                                type="text"
                                placeholder="pochta@mail.ru"
                                value={mail}
                                onChange={e => setMail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='mb-3'>Как к вам обращаться?</Form.Label>
                            <Form.Control
                                required
                                className='mb-4 input'
                                type="text"
                                placeholder="Имя Фамилия"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='form_box'>
                            <Form.Label className='mb-3'>Ваш отзыв</Form.Label>
                            <Form.Control
                                required
                                className='textarea'
                                placeholder="Комментарий"
                                as="textarea"
                                rows={10}
                                value={comment}
                                onChange={e => setComment(e.target.value)}/>
                        </Form.Group>
                        <Button className='mt-3 w-100 feedb-button' type='submit'>
                            Отправить
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
            <ErrorAuthModal show={showError} onHide={() => setShowError(false)}/>
        </>

    );
};
export default FeedB;