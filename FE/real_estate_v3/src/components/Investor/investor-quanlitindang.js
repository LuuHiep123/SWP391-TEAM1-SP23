import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../authentication/Auth';

export default function Quanlitindang() { // Sửa tên component thành Quanlitindang
    const [realEstates, setRealEstates] = useState([]);
    const token = getToken();
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    useEffect(() => {
        const fetchRealEstates = async () => {
            try {
                const response = await axios.get('http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const filteredRealEstates = response.data.filter(realEstate => realEstate.investorId === userLoginBasicInformationDto.accountId);
                setRealEstates(filteredRealEstates);
            } catch (error) {
                console.error('Error fetching real estates:', error.message);
            }
        };

        fetchRealEstates();
    }, [token]);

    return (
        <div>
            <h2>Danh sách bất động sản</h2>
            <ul>
                {realEstates.map(realEstate => (
                    <li key={realEstate.id}>{realEstate.realestateName}</li>
                ))}
            </ul>
        </div>
    );
}
