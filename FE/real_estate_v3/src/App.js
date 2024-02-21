import './css/header.css';
import './css/footer.css';
import './css/login.css';
import './css/investor-dangtin.css';
import './css/customer-fillter.css';
import './css/customer-trangchu-banvila.css';
import './css/customer-chaomung.css';
import './css/customer-gioithieu.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header-footer/Header';
import Header2 from './header-footer/Header2';
import Footer from './header-footer/Footer';
import Body1 from './components/Body1';
import Login from './components/Login';
import TrangChu from './components/Customer/customer-trangchu';
import Home2 from './components/Home2';
import Home from './components/Investor/investor-dangtin';
import Quanlitindang from './components/Investor/investor-quanlitindang';
import AuthRoleFilter from './authentication/AuthRoleFilter';
import Agencytindang from './components/Agency/agency-tindang';
import Agencythongtinchitiet from './components/Agency/agency-thongtinchitiet';
import Customergioithieu from './components/Customer/customer-gioithieu';
function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleLoginSuccess = (userLoginBasicInformationDto) => {
    // Callback function to update user information in App.js state
    setUserInfo(userLoginBasicInformationDto);
  };

  return (

    <Router>
      <div className="App">
        {/* Header should be rendered outside Routes */}
        <Header />
        <Header2 />
        <Routes>
          <Route path="/dangnhap" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/home2"
            element={
              <AuthRoleFilter>
                <Home2 />
              </AuthRoleFilter>
            }
          />
          <Route
            path="/home"
            element={
              <AuthRoleFilter>
                <Home />
              </AuthRoleFilter>
            }
          />
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/gioithieu" element={<Customergioithieu />} />
          <Route path="/quanlitindang" element={<Quanlitindang />} />
          <Route path="/acencytindang" element={<Agencytindang />} />
          <Route path="/agencythongtinchitiet" element={<Agencythongtinchitiet />} />
          <Route path="/agencythongtinchitiet/:id" element={<Agencythongtinchitiet />} />
          <Route path="/" element={<Body1 />} />
          {/* Add more routes if needed */}
        </Routes>
        {/* Footer should be rendered outside Routes */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
