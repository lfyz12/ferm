import React, {useContext, useRef, useState} from "react";
import {Button, Dropdown, Form} from "react-bootstrap";

import {observer} from "mobx-react-lite";

import {typeOfFood, unitsOfMeasurement} from '../../../utils/consts'

import '../assortment.css'
import {Context} from "../../..";

function CreateAssortment() {


    const {assortment} = useContext(Context)

    const [type, setType] = useState('Выберите тип')
    const [name, setName] = useState('')
    const [available, setAvailable] = useState(true)
    const [costPerOne, setCostPerOne] = useState()
    const [composition, setComposition] = useState('')
    const [image, setImage] = useState('')
    const [imageFront, setImageFront] = useState('')
    const [units, setUnits] = useState('Выберите единицы')

    const inputFile = useRef();

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false || type.includes('Выберите тип') || units.includes('Выберите единицы')) {
            event.stopPropagation();
        } else {
            formDataCreate()
            setDefaultValues()
            return 0
        }


        setValidated(true);

    };

    const setDefaultValues = () => {
        setType('Выберите тип')
        setName('')
        setComposition('')
        setCostPerOne('')
        setUnits('Выберите единицы')
        setImageFront("")
        inputFile.current.type = "text";
        inputFile.current.value = "";
        inputFile.current.type = "file";

    }

    function handleKeyPress(target) {
        if (target.charCode === 13) {
            try {
                handleSubmit("submit")
            }
            catch (e){
            }
        }
    }


    const selectFile = e => {
        setImage(e.target.files[0])
        if (e.target.files && e.target.files[0]) {
            setImageFront(URL.createObjectURL(e.target.files[0]));
        }
    }


    const formDataCreate = () => {

        try {
            const formData = new FormData()
            formData.append('type', type)
            formData.append('name', name)
            formData.append('available', available)
            formData.append('costPerOne', costPerOne)
            formData.append('composition', composition)
            formData.append('image', image)
            formData.append('unitsOfMeasurement', units)

            assortment.create(formData)

        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }


    return (

        <Form noValidate validated={validated} onKeyPress={handleKeyPress} onSubmit={handleSubmit}>


            <div className="d-flex p-2 justify-content-center assortment-text">
                Добавление ассортимента
            </div>

            <div className="d-flex p-2 justify-content-center  flex-column ">


                <Dropdown onSelect={e => setType(e)}>
                    <Dropdown.Toggle className="assortment-switch"> {type} </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Выберите тип'}>Выберите
                            тип</Dropdown.Item>
                        {
                            typeOfFood.map(item =>
                                <Dropdown.Item className="assortment-switch-item"
                                               eventKey={item}> {item} </Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                    value={name}
                    className="mt-3 textarea"
                    placeholder="Введите название"
                    required onChange={e => setName(e.target.value)}/>

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

                <Form.Control
                    value={costPerOne}
                    // min={0}
                    className="mt-3 textarea"
                    placeholder="Введите цену"
                    type="number"
                    required onChange={e => setCostPerOne(e.target.value)}
                />

                <Dropdown onSelect={e => setUnits(e)}>
                    <Dropdown.Toggle className="mt-3 assortment-switch">{units}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="assortment-switch-item" eventKey={"Выберите единицы"}>Выберите
                            тип</Dropdown.Item>
                        {
                            unitsOfMeasurement.map(item =>
                                <Dropdown.Item className="assortment-switch-item"
                                               eventKey={item}> {item} </Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                    value={composition}
                    className="mt-3 textarea"
                    as='textarea'
                    placeholder="Состав"
                    rows={10}
                    required onChange={e => setComposition(e.target.value)}
                />

                {/* <input accept="image/*" className="mt-3 dropdown-select" placeholder="Фото" required type="file" onChange={selectFile} ref={inputFile} /> */}
            </div>

            <div className="create-assortment-download-img mt-2 mb-2">
                <span className="modal_edit_span">Фото товара</span>
                <img className='create-assortment-img' alt='Фото не загружено' src={imageFront}/>
            </div>

            <label className="create-assortment-labelInput">
                <span  className="create-assortment-labelSpan">загрузить фото товара</span>
                <input  accept="image/*" className="mt-3 create-assortment-input" placeholder="Фото" required type="file"
                       onChange={selectFile} ref={inputFile}/>

            </label>


            <div className="d-flex p-2 justify-content-center">
                {<Button className="addAssortment" type="submit">Добавить</Button>}
            </div>

        </Form>


    );
}


export default observer(CreateAssortment)