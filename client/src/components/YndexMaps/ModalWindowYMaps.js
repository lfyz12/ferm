import React, { useEffect, useState } from 'react';
import './gpsStyle.css'
import GPS from './GPS';
import CloseButton from '../UI/CloseButton';
import GpsIcon from './GpsIcon';

const ModalWindowYMaps = ({findAdress, show, width, ...props}) => {
    return (
        <div
        className={`map_box ${show ? 'd-block' : 'd-none'}`}
        >
        <div onClick={props.onClick} className={show ? 'd-block overlay' : 'd-none'}></div>
        <div  className='map'>
            <div className='ymap_box'>
                <GPS onClick={props.onClick} width={width} show={show} findAdress={findAdress}/>
            </div>
        </div>
        </div>
    );
};

export default ModalWindowYMaps;