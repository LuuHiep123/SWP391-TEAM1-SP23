import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerFillter from './customer-fillter';
import Customertrangchubanvila from './customer-trangchu-banvila';
import Customerchaomung from './customer-chaomung';

export default function Trangchu() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('https://65ab7d21fcd1c9dcffc67773.mockapi.io/login')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (

        <div>
            <CustomerFillter />

            <Customertrangchubanvila />
            <Customerchaomung />

        </div>
    );
}
