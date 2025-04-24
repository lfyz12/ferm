import { Col, Container, Row, Form, Button, Dropdown, Stack } from "react-bootstrap";
import OurDateTime from "../../../dateTime/dateTime";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import AdminService from "../../../service/AdminService";

import { roles } from "../../../utils/consts";



const GivingRoleItem = ({ user }) => {
    const [role, setRole] = useState(user.role)
    const [newRole, setNewRole] = useState(role)




    return (


        <Form>

            <Row className='p-2 m-1'>

                <Col className='border-1 p-2'>
                    {user.number}
                </Col>

                <Col className='border-1 p-2'>
                    {user.name}
                </Col>

                <Col className='border-1 p-2'>
                    <Stack direction="horizontal" gap={3}>
                        <Dropdown onSelect={e => setNewRole(e)}>
                            <Dropdown.Toggle className="givingRole-dropdown" as={Button} variant='link'>{roles[newRole] || role}</Dropdown.Toggle>
                            <Dropdown.Menu >
                                {
                                    Object.entries(roles).map(([key, value]) => {

                                        return <Dropdown.Item className="assortment-switch-item" eventKey={key} > {value} </Dropdown.Item>
                                    })
                                }


                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="flex-row w-75" style={{ display: `${newRole === role ? 'none' : 'flex'}` }}  >
                            <Button className="me-1" variant="success" onClick={() => AdminService.changeRoleByNumber(user.number, newRole) & setRole(newRole)}>Подтвердить</Button>
                            <Button variant="danger" onClick={() => setNewRole(role)}>Отменить</Button>
                        </div>
                    </Stack>
                </Col>

            </Row>

        </Form>


    )
}
export default observer(GivingRoleItem);