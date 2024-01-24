// Home.js
import React, { useState } from 'react';
import { getToken, removeToken } from '../authentication/Auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocationSelector from '../location/LocationSelector';

const Home = () => {
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

    const accessToken = getToken();
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userLoginBasicInformationDto');
        // Navigate to the Login page after logout
        navigate('/login');
    };

    return (
        <div className='container'>
            <div className="col-md-3">
                <span>Welcome, {userLoginBasicInformationDto.username}!</span>
                <span>Your role is: {userLoginBasicInformationDto.roleName}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="col-md-9">
                <span>Thong tin cơ ban</span>
                <span>Tên bất động sản</span>
                <input></input>
                <span>Tên bất động sản</span>
                <input></input>
                <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                <span>Số nhà</span>
                <input></input>
                <span>Thông tin bài viết</span>
                <span>Mô tả</span>
                <input></input>
                <span>Thông tin bất động sản</span>
                <span>Chiều dài</span>
                <input></input>
                <span>Chiều rộng</span>
                <input></input>
                <span>Diện tích</span>
                <input></input>
                <span>Mức giá</span>
                <input></input>
                <span>Đơn vị</span>
                <input></input>
            </div>
        </div>
    );
};

export default Home;
