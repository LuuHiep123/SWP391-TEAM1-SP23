import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatISO } from 'date-fns';

export default function Customerthongtinchitiet() {
    const { id } = useParams();
    const parsedId = parseInt(id);
    const [realEstate, setRealEstate] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate`);
                const foundRealEstate = response.data.find(item => item.id === parsedId);
                setRealEstate(foundRealEstate);

                // Fetch location info based on locationId
                const locationResponse = await axios.get(`http://firstrealestate-001-site1.anytempurl.com/api/location/getAllLocation`);
                const foundLocation = locationResponse.data.find(location => location.id === foundRealEstate.locationId);
                setLocationInfo(foundLocation);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleBooking = async () => {
        const formattedDate = formatISO(selectedDate, { representation: 'complete' });

        const reservationData = {
            bookingDate: formattedDate,
            customerId: userLoginBasicInformationDto.accountId,
            realEstateId: parsedId
        };

        try {
            const response = await axios.post('http://firstrealestate-001-site1.anytempurl.com/api/reservation/CreateReservation', reservationData);
            console.log('Data sent:', reservationData);
            console.log('Response:', response.data); // Log the response from the server
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <div>
            {realEstate && locationInfo ? (
                <div>
                    <h2>Thông tin chi tiết bất động sản</h2>
                    <p>Tên: {realEstate.realestateName}</p>
                    <p>Tên: {userLoginBasicInformationDto.accountId}</p>
                    <p>Địa chỉ: {realEstate.address}</p>
                    <p>Ward: {locationInfo.ward}</p>
                    <p>District: {locationInfo.district}</p>
                    <p>City: {locationInfo.city}</p>
                    <p>Số phòng: {realEstate.roomNumber}</p>
                    <p>Diện tích: {realEstate.area}</p>
                    <p>Chiều dài: {realEstate.length}</p>
                    <p>Chiều rộng: {realEstate.width}</p>
                    <p>Phường: {locationInfo.ward}</p>
                    <p>Quận: {locationInfo.district}</p>
                    <p>Thành phố: {locationInfo.city}</p>
                    <p>Tình trạng pháp lý: {realEstate.legalStatus}</p>
                    <p>Giá: {realEstate.price}</p>
                    <p>Giảm giá: {realEstate.discount}</p>
                    <p>Mô tả: {realEstate.discription}</p>
                    <h3>Chọn ngày đặt lịch:</h3>
                    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
                    <button onClick={handleBooking}>Gửi dữ liệu đặt lịch</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
