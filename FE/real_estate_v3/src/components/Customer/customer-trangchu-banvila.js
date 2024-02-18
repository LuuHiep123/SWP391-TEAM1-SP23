import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customertrangchubanvila() {
  const [realEstates, setRealEstates] = useState([]);
  const [showAllEstates, setShowAllEstates] = useState(false); // Trạng thái để kiểm soát việc hiển thị tất cả các căn hộ

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

  // Hàm giới hạn số từ trong một chuỗi
  const limitWords = (text, limit) => {
    if (text) {
      const words = text.split(' ');
      const truncatedWords = words.slice(0, limit);
      const truncatedText = truncatedWords.join(' ');
      if (words.length > limit) {
        return truncatedText + ' .....';
      }
      return truncatedText;
    }
    return "";
  };

  // Hàm lấy hình ảnh mặt trước của imageName từ danh sách realEstateImages
  const getFrontImages = (realEstate) => {
    return realEstate.realEstateImages.filter(image => image.imageName === 'Ảnh Mặt Trước');
  };

  // Hàm xử lý sự kiện khi nhấn vào nút "Xem Thêm"
  const handleShowAllEstates = () => {
    setShowAllEstates(true); // Thiết lập trạng thái hiển thị tất cả các căn hộ
  };

  // Hàm xử lý sự kiện khi nhấn vào nút "Thu gọn"
  const handleHideAllEstates = () => {
    setShowAllEstates(false); // Thiết lập trạng thái để ẩn tất cả các căn hộ
  };

  return (
    // JSX
    <div className="estate-container">
      <h1 className="investor-heading">Real Estates for Investor ID 2:</h1>
      <div className="estates-wrapper">
        {realEstates.map((estate, index) => (
          <div key={index} className="estate-item" style={{ display: showAllEstates ? 'block' : (index < 3 ? 'block' : 'none') }}>
            <div className="estate-info">
              <div className="image-container">
                {getFrontImages(estate).map((image, imageIndex) => (
                  <div key={imageIndex} className="image-item">
                    <img src={image.imageUrl} alt={image.imageName} className="estate-image" />
                  </div>
                ))}
              </div>
              <h2 className="estate-name">{estate.realestateName}</h2>
              <span className="estate-name">{limitWords(estate.discription, 15)}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Nút "Xem Thêm" */}
      {!showAllEstates && realEstates.length > 3 && (
        <div className="button-container">
          <button onClick={handleShowAllEstates} className="show-more-button">
            Xem Thêm
          </button>
        </div>
      )}

      {/* Nút "Thu Gọn" */}
      {showAllEstates && (
        <div className="button-container">
          <button onClick={() => setShowAllEstates(false)} className="show-more-button">
            Thu Gọn
          </button>
        </div>
      )}
    </div>
  );
}
