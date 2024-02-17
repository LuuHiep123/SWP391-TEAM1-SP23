import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Agencythongtinchitiet() {
    const [realEstate, setRealEstate] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://firstrealestate-001-site1.anytempurl.com/api/invester/getAllRealEstate')
            .then(response => {
                // Tìm bất động sản có investorId là 5
                const estateWithInvestorId5 = response.data.find(estate => estate.investorId === 5 && estate.id === parseInt(id));
                setRealEstate(estateWithInvestorId5);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [id]);

    if (!realEstate) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Agency Thong Tin Chi Tiet</h1>
            <p>Estate ID: {id}</p>
            <p>Investor ID: {realEstate.investorId}</p>
            <p>Pay ID: {realEstate.payId}</p>
            <p>Location ID: {realEstate.locationId}</p>
            <p>Direct ID: {realEstate.directId}</p>
            <p>Real Estate Name: {realEstate.realestateName}</p>
            <p>Address: {realEstate.address}</p>
            <p>Room Number: {realEstate.roomNumber}</p>
            <p>Length: {realEstate.length}</p>
            <p>Width: {realEstate.width}</p>
            <p>Perimeter: {realEstate.perimeter}</p>
            <p>Area: {realEstate.area}</p>
            <p>Legal Status: {realEstate.legalStatus}</p>
            <p>Price: {realEstate.price}</p>
            <p>Discount: {realEstate.discount}</p>
            <p>Description: {realEstate.discription}</p>
            <p>Status: {realEstate.status}</p>
            <h2>Real Estate Images</h2>
            <ul>
                {realEstate.realEstateImages.map(image => (
                    <li key={image.id}>
                        <p>Image Name: {image.imageName}</p>
                        <img src={image.imageUrl} alt={image.imageName} style={{ maxWidth: '200px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
