// TrangChu.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../authentication/Auth';

const TrangChu = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu từ đường link mock
                const response = await axios.get('http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate');

                // Lọc dữ liệu để chỉ lấy nội dung của id 39
                const item39 = response.data.find(item => item.id === 39);

                // Log nội dung của id 39
                console.log('Nội dung của id 39:', item39);

                // Lưu trữ dữ liệu vào state nếu bạn muốn sử dụng nó trong component
                setData(item39);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        // Gọi hàm fetchData khi component được mount
        fetchData();
    }, []);

    return (
        <div>
            <h1>Đây là trang chủ</h1>
            {/* Hiển thị nội dung trang chủ tại đây */}
            {data && (
                <div>
                    <h2>Nội dung của id 39:</h2>
                    <p>{data.someProperty}</p>
                    <p>{data.realestateName}</p>
                    {/* Hiển thị duy nhất ảnh thứ 4 từ mảng realEstateImages */}
                    {data.realEstateImages.length >= 4 && (
                        <img
                            key={3}
                            src={data.realEstateImages[3].imageUrl}
                            alt={`Ảnh 4 của id 39`}
                            style={{ width: '300px', height: 'auto' }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TrangChu;
