import React, { useContext, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Modal, Button, Dropdown, Form, Row, Container, Col, Stack } from "react-bootstrap";
import AvailableItem from "./AvailableItem";

import { typeOfFood } from "../../../utils/consts";

function ChangeAvailable({ products, onClick }) {

    const [type, setType] = useState('Любой тип')
    const [available, setAvailable] = useState('Любое наличие')
    const [name, setName] = useState('')


    const searchedProducts = useMemo(() => {
        if (type === 'Любой тип') {
            if (available === 'Любое наличие') {
                return products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
            }
            return products.filter(item => (available.includes('Любое наличие') ? item : available.includes('Есть') ? item.available : !item.available) & item.name.toLowerCase().includes(name.toLowerCase()))
        }
        if (available === 'Любое наличие') {
            return products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()) & item.type.includes(type))
        }

        return products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()) & item.type.includes(type) & (available.includes('Любое наличие') ? item : available.includes('Есть') ? item.available : !item.available))
    }, [products, name, type, available]
    )

    return (
        <>

            <div className="d-flex p-2 justify-content-center fw-bold fs-4">
                Изменение наличия
            </div>

            <Stack direction="horizontal" gap={3}>
                <Form.Control className="me-auto textarea" placeholder="Введите название" value={name} onChange={e => setName(e.target.value)} />

                <Dropdown onSelect={e => setType(e)}>
                    <Dropdown.Toggle className="assortment-switch" > {type} </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Любой тип'} >Любой тип</Dropdown.Item>
                        {
                            typeOfFood.map(item =>
                                <Dropdown.Item className="assortment-switch-item" eventKey={item} > {item} </Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={e => setAvailable(e)}>
                    <Dropdown.Toggle className="assortment-switch" > {available} </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Любое наличие'} >Любое наличие</Dropdown.Item>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Есть'} >Есть</Dropdown.Item>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Нет'} >Нет</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Stack>
            <hr />
            <Row className='p-1 m-1'>
                <Col className="assortment-edit-header">Название</Col>
                <Col className="assortment-edit-header">Отдел</Col>
                <Col className="assortment-edit-header">Наличие</Col>

            </Row>
            <div className="max-size-window">
                {searchedProducts.map(item =>
                    <AvailableItem key={item.name} products={item} />)}
            </div>
        </>
    )
}

export default observer(ChangeAvailable)