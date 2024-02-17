import React, { useState, useEffect } from 'react';
import LocationSelector from '../../location/LocationSelector';

export default function Customerfillter() {
    const [selectedLocation, setSelectedLocation] = useState({
        provinceCode: '',
        provinceName: '',
        districtCode: '',
        districtName: '',
        wardCode: '',
        wardName: '',
    });

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        console.log('Selected Location:', location);
    };

    return (
        <div className='fillter'>
            <div className='fillter1'>
                <div className='loccanhoban'>
                    <span className='canhoban'>LỌC CĂN HỘ BÁN</span>
                </div>
                <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                <div className='dthtk'>
                    <input className='ct-button-fillter' placeholder="Nhập diện tích" ></input>
                    <input className='ct-button-fillter' placeholder="Nhập hướng" ></input>
                    <button className='ct-button-fillters' >TÌM KIẾM</button>
                </div>
            </div>
        </div>
    );
}
