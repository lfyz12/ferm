import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

const ErrorModal = () => {
    const [show, setShow] = useState(false)
    return (
        <Modal show={show}>
            <Modal.Body>
                <p className="error-modal-text">
                    Ошибка
                </p>
                <div className="d-flex align-items-center justify-content-center">
                    <Button className="error-modal-btn-close" onClick={() => setShow(!show)}> закрыть</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ErrorModal;