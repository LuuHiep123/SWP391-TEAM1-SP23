import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../authentication/Auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocationSelector from '../location/LocationSelector';
import Avatar from "@mui/material/Avatar";
import { storage } from "../firebase/addimage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Home = () => {
    const [downloadURLsArray, setDownloadURLsArray] = useState([]);
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
        navigate('/login');
    };

    const [propertyInfo, setPropertyInfo] = useState({
        realestateName: '',
        address: '',
        roomNumber: '',
        description: '',
        length: '',
        width: '',
        area: '',
        price: '',
        discount: '',
    });

    const [hardcodedValues, setHardcodedValues] = useState({
        firebaseId: "",
        investorId: userLoginBasicInformationDto.accountId,
        payId: 1,
        locationId: 0,
        directId: 2,
        perimeter: "50",
        legalStatus: "Sổ Đỏ",
        status: 1,
        ward: "phường 2",
        district: "Quận 1",
        city: "Hồ Chí Minh",
        // ward: selectedLocation.wardName,
        // district: selectedLocation.districtName,
        // city: selectedLocation.provinceName,
        listRealEstateImageUrl: [],
    });

    const submitDataToSwagger = async () => {
        try {
            const imageRef1 = ref(storage, "fileofpaper-id-" + userLoginBasicInformationDto.accountId + "/image");
            const imageRef2 = ref(storage, "fileofreal-id-" + userLoginBasicInformationDto.accountId + "/image1");
            await uploadBytes(imageRef1, image1);
            await uploadBytes(imageRef2, image2);
            const dataToSubmit = {
                ...hardcodedValues,
                ...propertyInfo,
                listRealEstateImageUrl: downloadURLsArray.map(url => ({ imageUrl: url, status: true })),
            };
            // console.log('Selected Location:', selectedLocation);
            // console.log('City:', selectedLocation.provinceName);
            // console.log('District:', selectedLocation.districtName);
            // console.log('Ward:', selectedLocation.wardName);
            console.log('Data to submit:', dataToSubmit);
            await axios.post(
                'http://firstrealestate-001-site1.anytempurl.com/api/invester/createNewRealEstate/2',
                dataToSubmit,
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json-patch+json',
                    },
                }
            );
            console.log('Data pushed to Swagger successfully.');
        } catch (error) {
            console.error('Failed to push data to Swagger:', error.message);
        }
    };

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [downloadURLs, setDownloadURLs] = useState([]);
    const [ur, setUr] = useState(null);
    const [url, setUrl] = useState(null);
    const [url2, setUrl2] = useState(null);
    const [url23, setUrl23] = useState(null);
    const [url1234, setUrl1234] = useState(null);
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage1(e.target.files[0]);
        }
    };

    const handleImageChange1 = (e) => {
        if (e.target.files[0]) {
            setImage2(e.target.files[0]);
        }
    };

    const handleImageChange2 = (e) => {
        if (e.target.files[0]) {
            setImage3(e.target.files[0]);
        }
    };

    const handleImageChange3 = (e) => {
        if (e.target.files[0]) {
            setImage4(e.target.files[0]);
        }
    };

    const handleImageChange4 = (e) => {
        if (e.target.files[0]) {
            setImage5(e.target.files[0]);
        }
    };
    const handleSubmit = async () => {
        const imageRef1 = ref(storage, "fileofpaper-id-" + userLoginBasicInformationDto.accountId + "/image1");
        try {
            await uploadBytes(imageRef1, image1);
            const downloadURL = await getDownloadURL(imageRef1);
            setUr(downloadURL);
            setHardcodedValues(prevState => ({
                ...prevState,
                firebaseId: downloadURL
            }));

            // Save the downloadURL to your state or use it as needed
            // In this example, we are logging it to the console
            console.log('Download URL for image1:', downloadURL);

            setImage1(null);
        } catch (error) {
            console.log(error.message);
        }
    };



    const handleSubmit1 = async () => {
        const imageRef2 = ref(storage, "fileofleftreal-id-" + userLoginBasicInformationDto.accountId + "/image1");
        try {
            await uploadBytes(imageRef2, image2);
            const downloadURLpapers = await getDownloadURL(imageRef2);
            setUrl(downloadURLpapers);
            setHardcodedValues(prevState => ({
                ...prevState,
                firebaseId: downloadURLpapers
            }));
            console.log(`Download URL for image sohong:`, downloadURLpapers);
            setImage2(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit2 = async () => {
        const imageRef3 = ref(storage, "fileofrightreal-id-" + userLoginBasicInformationDto.accountId + "/image1");
        try {
            await uploadBytes(imageRef3, image3);
            const downloadURLpapers = await getDownloadURL(imageRef3);
            setHardcodedValues(prevState => ({
                ...prevState,
                firebaseId: downloadURLpapers
            }));
            setUrl2(downloadURLpapers);
            console.log(`Download URL for image sohong:`, downloadURLpapers);
            setImage3(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit3 = async () => {
        const imageRef4 = ref(storage, "fileofmap-id-" + userLoginBasicInformationDto.accountId + "/image1");
        try {
            await uploadBytes(imageRef4, image4);
            const downloadURLpapers = await getDownloadURL(imageRef4);
            setHardcodedValues(prevState => ({
                ...prevState,
                firebaseId: downloadURLpapers
            }));
            setUrl23(downloadURLpapers);
            console.log(`Download URL for image sohong:`, downloadURLpapers);
            setImage4(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit4 = async () => {
        const imageRef5 = ref(storage, "fileofpinkmap-id-" + userLoginBasicInformationDto.accountId + "/image1");
        try {
            await uploadBytes(imageRef5, image5);
            const downloadURLpapers = await getDownloadURL(imageRef5);
            setHardcodedValues(prevState => ({
                ...prevState,
                firebaseId: downloadURLpapers
            }));
            setUrl1234(downloadURLpapers);
            console.log(`Download URL for image sohong:`, downloadURLpapers);
            setImage5(null);
        } catch (error) {
            console.log(error.message);
        }
    };



    const fetchImages = async () => {
        try {
            const response = await axios.get("http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate");
            const imageUrls = response.data;
            setUr(imageUrls[0]);
            setUrl(imageUrls[1]);
        } catch (error) {
            console.error("Error fetching images:", error.message);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleSubmitData = async () => {
        try {
            await submitDataToSwagger();

            setPropertyInfo({
                realestateName: '',
                address: '',
                roomNumber: '',
                description: '',
                length: '',
                width: '',
                area: '',
                price: '',
                discount: '',
            });
            console.log('Data submitted to Swagger successfully!', {
                hardcodedValues,
                propertyInfo,
                downloadURLsArray,
            });
        } catch (error) {
            console.error('Failed to submit data:', error.message);
        }
    };

    return (
        <div className='container'>
            <div className="col-md-3 account">
                <span>Welcome, {userLoginBasicInformationDto.username}!</span>
                <span>Your role is: {userLoginBasicInformationDto.roleName}</span>
                <span>Your role is: {userLoginBasicInformationDto.accountId}</span>
                <button className='buuton-logout' onClick={handleLogout}>Logout</button>
            </div>
            <div className="col-md-9 a">
                <div className='thongitnbatdongsan'>
                    <span className='tieude'>Thông tin tin cơ bản</span>
                    <span>Tên bất động sản</span>
                    <input
                        type="text"
                        value={propertyInfo.realestateName}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, realestateName: e.target.value })}
                    />
                    <span>Địa chỉ</span>
                    <LocationSelector onSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                    <span>Số nhà</span>
                    <input
                        type="text"
                        value={propertyInfo.address}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, address: e.target.value })}
                    />
                </div>
                <div className='thongtinbaiviet'>
                    <span className='tieude'>Thông tin bài viết</span>
                    <span>Mô tả</span>
                    <textarea
                        value={propertyInfo.description}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, description: e.target.value })}
                    ></textarea>
                </div>
                <div className='thongtinbatdongsan1'>
                    <span className='tieude'>Thông tin bất động sản</span>
                    <span>Chiều dài</span>
                    <input
                        type="text"
                        value={propertyInfo.length}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, length: e.target.value })}
                    />
                    <span>Chiều rộng</span>
                    <input
                        type="text"
                        value={propertyInfo.width}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, width: e.target.value })}
                    />
                    <span>Diện tích</span>
                    <input
                        type="text"
                        value={propertyInfo.area}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, area: e.target.value })}
                    />
                    <span>Số phòng</span>
                    <input
                        type="text"
                        value={propertyInfo.roomNumber}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, roomNumber: e.target.value })}
                    />
                    <span>Mức giá</span>
                    <input
                        type="text"
                        value={propertyInfo.price}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, price: e.target.value })}
                    />
                    <span>Chiết Khấu</span>
                    <input
                        type="text"
                        value={propertyInfo.discount}
                        onChange={(e) => setPropertyInfo({ ...propertyInfo, discount: e.target.value })}
                    />
                    <span>Hình ảnh mặt trước</span>
                    <div className="App">
                        <Avatar src={ur} sx={{ width: 300, height: 300 }} variant="square" />

                        <input type="file" onChange={handleImageChange} />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>

                    <span><b>View nhà</b></span>
                    <span>Hình ảnh bên trái</span>
                    <div className="App1">
                        <Avatar src={url} sx={{ width: 300, height: 300 }} variant="square" />

                        <input type="file" onChange={handleImageChange1} />
                        <button onClick={handleSubmit1}>Submit</button>
                    </div>

                    <span>Hình ảnh bên phải</span>
                    <div className="App2">
                        <Avatar src={url2} sx={{ width: 300, height: 300 }} variant="square" />

                        <input type="file" onChange={handleImageChange2} />
                        <button onClick={handleSubmit2}>Submit</button>
                    </div>

                    <span>Hình ảnh sơ đồ đất</span>
                    <div className="App3">
                        <Avatar src={url23} sx={{ width: 300, height: 300 }} variant="square" />

                        <input type="file" onChange={handleImageChange3} />
                        <button onClick={handleSubmit3}>Submit</button>
                    </div>

                    <span>Hình ảnh sổ hồng</span>
                    <div className="App4">
                        <Avatar src={url1234} sx={{ width: 300, height: 300 }} variant="square" />

                        <input type="file" onChange={handleImageChange4} />
                        <button onClick={handleSubmit4}>Submit</button>
                    </div>



                    <button onClick={handleSubmitData}>ĐĂNG TIN</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
