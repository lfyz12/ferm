import {useContext, useState} from 'react';
import {Button, Modal, Form, Dropdown} from 'react-bootstrap';
import {typeOfFood, unitsOfMeasurement} from "../../../utils/consts";
import {Context} from '../../..';
import "./modal_edit.css"

const EditModal = (props) => {
    const assort = props.assort

    const {assortment} = useContext(Context)

    const [name, setName] = useState(assort.name)
    const [type, setType] = useState(assort.type)
    const [available, setAvailable] = useState(assort.available)
    const [costPerOne, setCostPerOne] = useState(assort.costPerOne)
    const [units, setUnits] = useState(assort.unitsOfMeasurement)
    const [composition, setComposition] = useState(assort.composition)
    const [oldImage, setOldImage] = useState(assort.image)
    const [image, setImage] = useState()

    const [validated, setValidated] = useState(false);


    async function createFormData() {
        const formData = new FormData()

        formData.append('id', assort.id)
        formData.append('name', name)
        formData.append('type', type)
        formData.append('available', available)
        formData.append('costPerOne', costPerOne)
        formData.append('unitsOfMeasurement', units)
        formData.append('composition', composition)
        if (oldImage === assort.image) {
            await assortment.changeAllTextById(formData)
        } else {
            formData.append('image', oldImage)
            await assortment.changeAllById(formData)
        }

    }

    const confirmEdit = async () => {
        setValidated(true);

        if (name && costPerOne && composition) {
            await createFormData()

            props.getAllProd()
            props.onHide()

        }
    }


    const selectFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setOldImage(event.target.files[0]);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Form validated={validated}>
                    <div className="modal_edit_content mt-2">
                        <span className="modal_edit_span">Название</span>
                        <input className="modal_edit_input" placeholder={name}
                               onChange={e => setName(e.target.value)}></input>
                    </div>

                    <div className="modal_edit_content">
                        <span className="modal_edit_span">Тип</span>
                        <Dropdown onSelect={e => setType(e)}>
                            <Dropdown.Toggle className="assortment-switch"> {type} </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    typeOfFood.map(item =>
                                        <Dropdown.Item className="assortment-switch-item"
                                                       eventKey={item}> {item} </Dropdown.Item>)
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="modal_edit_content">
                        <span className="modal_edit_span">Наличие</span>
                        <Dropdown>
                            <Dropdown.Toggle
                                className="mt-3 assortment-switch">{(available ? 'Есть' : 'Нет')}  </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="assortment-switch-item" onClick={() => setAvailable(true)}
                                               key={1}>Есть</Dropdown.Item>
                                <Dropdown.Item className="assortment-switch-item" onClick={() => setAvailable(false)}
                                               key={2}>Нет</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="modal_edit_content">
                        <span className="modal_edit_span">Единицы</span>
                        <Dropdown onSelect={e => setUnits(e)}>
                            <Dropdown.Toggle className="assortment-switch">{units}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    unitsOfMeasurement.map(item =>
                                        <Dropdown.Item className="assortment-switch-item"
                                                       eventKey={item}> {item} </Dropdown.Item>)
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="modal_edit_content">
                        <span className="modal_edit_span">Цена</span>

                        <input className="modal_edit_input" placeholder={costPerOne}
                               onChange={e => setCostPerOne(e.target.value)}></input>
                    </div>

                    <div className="modal_edit_content">
                        <span className="modal_edit_span">Состав</span>
                        <input className="modal_edit_input" placeholder={composition} type='text'
                               onChange={e => setComposition(e.target.value)}></input>
                    </div>

                    <div className="modal_edit_content">
                        <span className="modal_edit_span">Картинка</span>

                        <img className='w-50 h-50 modal_edit_img product-img' alt={'Картинка не подгружается'}
                             src={image || process.env.REACT_APP_API_URL + oldImage}/>

                    </div>
                    <label className="create-assortment-labelInput">
                        <span className="create-assortment-labelSpan">Загрузите фото товара</span>
                        <input id="image_uploads" accept="image/*" className="mt-3 create-assortment-input" type="file"
                               onChange={selectFile}/>
                    </label>
                    <hr/>
                </Form>
                <Modal.Footer className="d-flex justify-content-between">
                    <div className="modal_edit_content">
                        <Button className="modal_edit_btn" onClick={confirmEdit}> Подтвердить</Button>
                        <Button className='btn-danger' onClick={props.onHide}>Закрыть</Button>
                    </div>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}
// 
export default EditModal;