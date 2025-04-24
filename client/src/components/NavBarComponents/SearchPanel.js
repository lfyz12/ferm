import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';

const SearchPanel = () => {
    const [searchWidth, setSearchWidth] = useState(true)
    return (
        <Form className='searchForm w-50'>
            <Form.Group className='d-flex justify-content-end align-items-center'>
            <Form.Control type='search' className={`h-50 w-50 rounded-4  ${searchWidth ? '' : 'searchString'}`}/>
            <Button onClick={() => setSearchWidth(!searchWidth)} className='d-flex justify-content-center align-items-center rounded-circle btnBasket'>
                <div className='btnBasketIconBox'>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  className="btnBasketFill" d="M13.0849 3.81981C10.6572 1.3934 6.72115 1.3934 4.29348 3.81981C1.8658 6.24621 1.8658 10.1802 4.29348 12.6066C6.72115 15.033 10.6572 15.033 13.0849 12.6066C15.5125 10.1802 15.5125 6.24621 13.0849 3.81981ZM2.87852 2.40559C6.08765 -0.801864 11.2907 -0.801864 14.4998 2.40559C17.4694 5.37369 17.6911 10.0483 15.1646 13.2711L19.2927 17.397C19.6834 17.7875 19.6834 18.4207 19.2927 18.8112C18.9019 19.2017 18.2684 19.2017 17.8777 18.8112L13.7497 14.6853C10.5252 17.2104 5.84817 16.9889 2.87852 14.0208C-0.330602 10.8134 -0.330602 5.61305 2.87852 2.40559Z" fill="#FF709A" fill-opacity="0.7"/>
                    </svg>
                </div>
            </Button>
            
            </Form.Group>
        </Form>
    );
};

export default SearchPanel;