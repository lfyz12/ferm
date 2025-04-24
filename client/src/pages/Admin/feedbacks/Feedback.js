import { useContext, useEffect, useMemo, useState } from "react";
import FeedbackStore from "../../../store/FeedbackStore";
import FeedbackItem from "./FeedbackItem";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { Dropdown } from "react-bootstrap";


const Feedback = ({ feedback }) => {
    const [selectSort, setSelectSort] = useState('Любой тип')
    const sortedFeedback = useMemo(() => {
        if (selectSort.includes('Любой тип')) {
            return feedback
        }
        return feedback.filter(item => item.typeOfFeedback.includes(selectSort))
    }, [selectSort])


    return (

        <div>
            <div className="d-flex flex-column">
                <label for='typeOfFeedback'>Показать отзывы:</label>
                <Dropdown  onSelect={e => setSelectSort(e)}>
                    <Dropdown.Toggle className="assortment-switch" > {selectSort} </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Любой тип'} >Любой тип</Dropdown.Item>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Положительный'} >Положительный</Dropdown.Item>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Нейтральный'} >Нейтральный</Dropdown.Item>
                        <Dropdown.Item className="assortment-switch-item" eventKey={'Негативный'} >Негативный</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            <hr />
            <div className="max-size-window">
                {sortedFeedback.length === 0 ?

                    feedback.map(item =>
                        <FeedbackItem key={item.id} feedback={item} />
                    )
                    :
                    sortedFeedback.map(item =>
                        <FeedbackItem key={item.id} feedback={item} />
                    )
                }

            </div>
            <hr />
        </div>
    )
}
export default Feedback;