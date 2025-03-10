import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LocationSelector from '../../location/LocationSelector';
export default function AgencyThongTinChiTiet() {
    const [realEstate, setRealEstate] = useState(null);
    const { id } = useParams();
    const [editing, setEditing] = useState(false);

    const [editedRealEstate, setEditedRealEstate] = useState({
        ward: '',
        district: '',
        city: '',
    });
    useEffect(() => {
        axios.get(`http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate`)
            .then(response => {
                const estateWithInvestorId5 = response.data.find(estate => estate.investorId === 6 && estate.id === parseInt(id));
                setRealEstate(estateWithInvestorId5);
                setEditedRealEstate(estateWithInvestorId5); // Khởi tạo thông tin chỉnh sửa ban đầu với thông tin đã lấy về
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [id]);
    useEffect(() => {
        // Check if locationId exists
        if (editedRealEstate.locationId) {
            // Fetch location data based on locationId
            axios.get(`http://firstrealestate-001-site1.anytempurl.com/api/location/getAllLocation`)
                .then(locationResponse => {
                    // Find location data based on locationId
                    const locationInfo = locationResponse.data.find(location => location.id === editedRealEstate.locationId);
                    if (locationInfo) {
                        // Update state with ward, district, city based on locationId
                        setEditedRealEstate(prevState => ({
                            ...prevState,
                            ward: locationInfo.ward,
                            district: locationInfo.district,
                            city: locationInfo.city,
                        }));
                    }
                })
                .catch(locationError => {
                    console.error('Error fetching location data: ', locationError);
                });
        }
    }, [editedRealEstate.locationId]);
    const handleEditClick = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Kiểm tra nếu giá trị nhập vào là rỗng thì giữ nguyên giá trị cũ
        const updatedValue = value.trim() === '' ? realEstate[name] : value;

        setEditedRealEstate(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));
    };

    const handleSaveClick = () => {
        // Kiểm tra nếu ward, district, city chưa được chọn và locationId không tồn tại
        if ((!editedRealEstate.ward || !editedRealEstate.district || !editedRealEstate.city) && !editedRealEstate.locationId) {
            // Hiển thị giao diện cho phép chọn ward, district, city
            console.log("Please select ward, district, and city.");
            return;
        } else {
            // Nếu đã chọn đủ ward, district, city hoặc locationId tồn tại, tiến hành gửi dữ liệu lên server
            sendDataToServer();
        }
    };

    const sendDataToServer = () => {
        const updatedRealEstate = {
            ...editedRealEstate,
            listRealEstateImageUrl: editedRealEstate.realEstateImages,
        };
        delete updatedRealEstate.realEstateImages;

        console.log("Data to be PUT:", updatedRealEstate);

        axios.put(`http://firstrealestate-001-site1.anytempurl.com/api/invester/updatePostById/${realEstate.id}`, updatedRealEstate)
            .then(response => {
                console.log("Successfully saved edited real estate:", response.data);
                setEditing(false);
            })
            .catch(error => {
                console.error('Error saving edited real estate: ', error);
            });
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected image:", file);
        // Thực hiện các xử lý khác nếu cần
    };
    const [selectedLocation, setSelectedLocation] = useState({
        provinceCode: '',
        provinceName: '',
        districtCode: '',
        districtName: '',
        wardCode: '',
        wardName: '',
    });
    const handleLocationSelect = (location) => {
        setEditedRealEstate(prevState => ({
            ...prevState,
            ward: location.wardName,
            district: location.districtName,
            city: location.provinceName,
        }));
    };

    if (!realEstate) {
        return <div>Loading...</div>;
    }

    const PreviewImage = ({ previewImages }) => {
        const defaultImage = 'logoinvestor/no-image-news.png'; // Đường dẫn của ảnh mặc định

        return (
            <div className="App123">
                {previewImages && previewImages.length > 0 ? (
                    <>
                        <img src={previewImages[0]} alt="Preview" style={{ width: '300px', height: '300px' }} />
                        <input className='chontep' type="file" onChange={handleImageChange} />
                    </>
                ) : (
                    <>
                        <img src={defaultImage} alt="Default" style={{ width: '200px', height: '200px' }} />
                        <input className='chontep' type="file" onChange={handleImageChange} />
                    </>
                )}
            </div>
        );
    };

    return (
        <div className='thongtin'>
            <h1>Thông tin chi tiết bất động sản:</h1>

            <p><b>Real Estate Name:</b> {editing ? <input type="text" name="realestateName" value={editedRealEstate.realestateName} onChange={handleInputChange} /> : realEstate.realestateName}</p>
            <p><b>Address:</b> {editing ? <input type="text" name="address" value={editedRealEstate.address} onChange={handleInputChange} /> : realEstate.address}</p>
            <p><b>Room Number:</b> {editing ? <input type="text" name="roomNumber" value={editedRealEstate.roomNumber} onChange={handleInputChange} /> : realEstate.roomNumber}</p>
            <p><b>Length:</b> {editing ? <input type="text" name="length" value={editedRealEstate.length} onChange={handleInputChange} /> : realEstate.length}</p>
            <p><b>Width:</b> {editing ? <input type="text" name="width" value={editedRealEstate.width} onChange={handleInputChange} /> : realEstate.width}</p>
            <p><b>Perimeter:</b> {editing ? <input type="text" name="perimeter" value={editedRealEstate.perimeter} onChange={handleInputChange} /> : realEstate.perimeter}</p>
            <p><b>Area:</b> {editing ? <input type="text" name="area" value={editedRealEstate.area} onChange={handleInputChange} /> : realEstate.area}</p>
            <p><b>Legal Status:</b> {editing ? <input type="text" name="legalStatus" value={editedRealEstate.legalStatus} onChange={handleInputChange} /> : realEstate.legalStatus}</p>
            <p><b>Price:</b> {editing ? <input type="text" name="price" value={editedRealEstate.price} onChange={handleInputChange} /> : realEstate.price}</p>
            <p><b>Direct ID:</b> {editing ? <input type="text" name="directId" value={editedRealEstate.directId} onChange={handleInputChange} /> : realEstate.directId}</p>
            <p><b>Discount:</b> {editing ? <input type="text" name="discount" value={editedRealEstate.discount} onChange={handleInputChange} /> : realEstate.discount}</p>
            <p><b>Description:</b> {editing ? <input type="text" name="description" value={editedRealEstate.discription} onChange={handleInputChange} /> : realEstate.discription}</p>
            <div cName="select-location">
                <span className='tieude1'>Địa chỉ</span>
                <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} />
            </div>
            <h2>Real Estate Images</h2>
            <ul>
                {realEstate.realEstateImages.map(image => (
                    <li key={image.id}>
                        <p> {image.imageName}</p>
                        <PreviewImage previewImages={[image.imageUrl]} />
                    </li>
                ))}
            </ul>

            {editing ? (
                <button onClick={handleSaveClick}>Save</button>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
        </div>
    );
}
