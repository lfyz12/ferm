import React, { useContext } from 'react';
import { Spinner } from "react-bootstrap";
import './loading.css'
import { useEffect } from "react";
import { Context } from '..';
const Loading = () => {
    const {user} = useContext(Context)
   

    return (
        <div className='loading_wrapper'>
           <div class="cssload-dots">
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
            </div>

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" ></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7" result="goo" ></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix" ></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Loading;