import React from 'react';
import {Button, Modal} from "react-bootstrap";

import "./errorModal.css"

const ErrorAuthModal = (props) => {


    return (
        <Modal{...props}>

            <Modal.Body>
                <p className="error-modal-text">
                    Авторизируйтесь, чтобы продолжить
                </p>
                <div className="d-flex align-items-center justify-content-center">
                    <Button className="error-modal-btn-close" onClick={props.onHide}> закрыть</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ErrorAuthModal;