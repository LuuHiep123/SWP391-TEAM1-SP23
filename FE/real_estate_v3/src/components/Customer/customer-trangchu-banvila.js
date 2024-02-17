import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customertrangchubanvila() {
  const [realEstates, setRealEstates] = useState([]);

  useEffect(() => {
    axios.get('http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate')
      .then(response => {
        const estatesWithInvestorId2 = response.data.filter(estate => estate.investorId === 5);
        setRealEstates(estatesWithInvestorId2);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Hàm xử lý khi người dùng bấm vào tên bất động sản
  const handleRealEstateClick = (estateName) => {
    // Chuyển hướng đến trang khác khi người dùng bấm vào tên bất động sản
    window.location.href = `/realestate/${estateName}`;
  };

  return (
    <div>
      <h1>Real Estates for Investor ID 2:</h1>
      <ul>
        {realEstates.map((estate, index) => (
          <li key={index}>
            {/* Sử dụng onClick để gọi hàm xử lý khi bấm vào tên bất động sản */}
            <h2 onClick={() => handleRealEstateClick(estate.realestateName)}>{estate.realestateName}</h2>
            <div>
              {estate.realEstateImages.map((image, imageIndex) => (
                <div key={imageIndex}>
                  <p>Image Name: {image.imageName}</p>
                  <img src={image.imageUrl} alt={image.imageName} />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
