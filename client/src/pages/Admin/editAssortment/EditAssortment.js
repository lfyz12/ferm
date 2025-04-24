import React, { useContext, useMemo, useState } from "react";
import { Modal, Button, Dropdown, Form, Row, Container, Col, Stack } from "react-bootstrap";

import AssortmentItem from "./AssortmentItem";
import { typeOfFood } from "../../../utils/consts";

import "../assortment.css"
import { Context } from "../../..";
import { observer } from "mobx-react-lite";


function EditAssortment({ products, getAllProd }) {


    const [type, setType] = useState('Любой тип')
    const [name, setName] = useState('')


    const searchedProducts = useMemo(() => {
        if (type === 'Любой тип') return products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
        return products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()) & item.type.includes(type))
    },
        [products, name, type]

    )
    // products
    // products.filter(item => item.name.includes(name))

    return (

        <div>


            <div className="d-flex p-2 justify-content-center fw-bold fs-4">
                Изменение ассортимента
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
            </Stack>

            <hr />
            <Row className='p-1 m-1'>
                <Col className="assortment-edit-header">Название</Col>
                <Col className="assortment-edit-header">Отдел</Col>
                <Col className="assortment-edit-header">Цена</Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <div className="max-size-window mt-2 mb-2 w-100">
                {
                    searchedProducts.map(item =>

                        <AssortmentItem key={item.id} assort={item} getAllProd={getAllProd} />
                    )
                }

            </div>
            <hr />

        </div>


    );
}


export default observer(EditAssortment);
