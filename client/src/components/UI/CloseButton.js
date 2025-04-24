import React from 'react';
import classes from './closeBtn.module.css'
const CloseButton = ({...props}) => {
    return (
        <div {...props} className={classes.close_btn}>

        </div>
    );
};

export default CloseButton;