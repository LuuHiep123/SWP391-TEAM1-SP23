import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dangki() {
    const [roleId, setRoleId] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        phoneNumber: '',
        email: '',
        address: ''
    });
    const [selectedRole, setSelectedRole] = useState(null);
    const [showForm, setShowForm] = useState(false); // Biến state để điều khiển việc hiển thị form
    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            roleId: roleId
        }));
    }, [roleId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedRole === null) {
            alert("Please select a role first.");
            return;
        }
        const currentDate = new Date();
        // const createdAt = currentDate.toISOString(); // Chuyển ngày giờ thành chuỗi ISO

        // Thêm trường createdAt vào formData
        const updatedFormData = {
            ...formData,
            //    createdAt: createdAt
            roleId: selectedRole // Thêm roleId vào formData
        };

        axios.post('http://firstrealestate-001-site1.anytempurl.com/api/account/TaoTaiKhoan', updatedFormData)
            .then(response => {
                console.log('Data submitted successfully:', response.data);

            })
            .catch(error => {
                console.error('Error submitting data:', error);

            });
    }

    const handleCustomerClick = () => {
        setSelectedRole(3);
        setShowForm(true);
    };

    const handleInvestorClick = () => {
        setSelectedRole(2);
        setShowForm(true);
    };

    return (
        <div class="form-container">
            <div class="button-container">
                <div>
                    {!showForm && (
                        <>
                        <h1>Bạn đăng kí với tư cách là gì?</h1>
                            <button class="customer-btn" onClick={handleCustomerClick}>Customer</button>
                            <button class="investor-btn" onClick={handleInvestorClick}>Investor</button>
                        </>
                    )}
                </div>
            </div>
            {showForm && (
                <div className='infobox'>
                    <h2 className='title'>Đăng ký thông tin tài khoản</h2>
                    <form class="custom-form" onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                        <button type="submit" class="submit-btn">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}
