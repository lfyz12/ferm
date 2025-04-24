import React, { useContext, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import AssortmentService from '../../../service/AssortmentService';
import EditModal from "../modals/EditModal";

import "../assortment.css"

import { observer } from 'mobx-react-lite';
import { Context } from '../../..';

const AssortmentItem = (props) => {
  const { assortment } = useContext(Context)
  const [showModal, setShowModal] = useState(false)

  async function delButton() {
    await assortment.deleteOneById(props.assort.id)
    await props.getAllProd()
  }

  return (
    <Form>

      <Row className='p-2 m-1'>

        <Col className='border-1 p-2'>
          {props.assort.name}
        </Col>

        <Col className='border-2 p-2'>
          {props.assort.type}
        </Col>

        <Col className='border-1 p-2'>
          {props.assort.costPerOne}
        </Col>

        <Col className='p-2'>
          <Button className='w-100' size='sm' variant="secondary" onClick={() => setShowModal(true)} >Изменить</Button>
        </Col>

        <Col className='p-2'>
          <Button className='w-100' size='sm' variant="danger" onClick={delButton} >Удалить</Button>
        </Col>
      </Row>

      <>
        <EditModal show={showModal} onHide={() => setShowModal(false)} assort={props.assort} getAllProd={props.getAllProd} />
      </>
    </Form>
  )

}

export default observer(AssortmentItem);