import React from 'react';
import './toggle.css'
const Toggle = ({toggleState, toggleSwitch, ...props}) => {


    return (
        <div className='toggle_box d-flex flex-row'>
            <div onClick={toggleSwitch} className='switch me-2'>
                <div className={`toggle ${toggleState ? 'more' : 'less'}`}></div>
                <div className='names'>
                    <p className='lessName'>Меньше</p>
                    <p className='moreName'>Больше</p>
                </div>
            </div>
            <div className="toggle_i me-3 ms-2">?</div>
            <div className="toggle_box_information">положить больше или меньше вес</div>
        </div>
    );
};

export default Toggle;