import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER } from "../api/apiService";

const UserRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");

  const [showAddressFields, setShowAddressFields] = useState(false);
  const navigate = useNavigate();

  const toggleAddressFields = () => setShowAddressFields(!showAddressFields);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Mật khẩu và nhập lại mật khẩu không khớp!");
      return;
    }

    const payload = {
      userId: 0,
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      roles: [{ roleId: 102, roleName: "USER" }],
      address: {
        addressId: 0,
        street: showAddressFields ? street : "",
        city: showAddressFields ? city : "",
        district: showAddressFields ? district : "",
        ward: showAddressFields ? ward : "",
        country: "Vietnam",
      },
    };

    try {
      await REGISTER(payload);
      alert("Đăng ký thành công!");
      navigate("/login");

      setFirstName("");
      setLastName("");
      setEmail("");
      setMobileNumber("");
      setPassword("");
      setConfirmPassword("");
      setCity("");
      setDistrict("");
      setWard("");
      setStreet("");
      setShowAddressFields(false);
    } catch (error) {
      alert(error.message);
      console.error("Lỗi trong quá trình đăng ký:", error);
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="card mx-auto" style={{ maxWidth: "520px", marginTop: "40px" }}>
        <article className="card-body">
          <header className="mb-4">
            <h4 className="card-title text-main">ĐĂNG KÝ</h4>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="form-row">            
              <div className="col form-group">
                <label>Họ</label>
                <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="col form-group">
                <label>Tên</label>
                <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="col form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="col form-group">
                <label>Số điện thoại</label>
                <input type="text" className="form-control" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label
                onClick={toggleAddressFields}
                style={{ cursor: "pointer", background: "#f9f9f9", padding: "10px", display: "block", borderRadius: "10px" }}
              >
                Địa chỉ {showAddressFields ? "▲" : "▼"}
              </label>
              {showAddressFields && (
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Thành phố</label>
                    <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Quận/Huyện</label>
                    <input type="text" className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Phường/Xã</label>
                    <input type="text" className="form-control" value={ward} onChange={(e) => setWard(e.target.value)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Số nhà và tên đường</label>
                    <input type="text" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} />
                  </div>
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Mật khẩu</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Nhập lại mật khẩu</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
            </div>
            <div className="form-group">
              <label className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" defaultChecked />
                <div className="custom-control-label">
                  Tôi đồng ý với <a href="#">điều khoản và điều kiện</a>
                </div>
              </label>
            </div>
          </form>
        </article>
      </div>
      <p className="text-center mt-4">Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
      <br />
    </section>
  );
};

export default UserRegister;
