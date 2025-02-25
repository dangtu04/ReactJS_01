import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import DefaultAvata from "../../assets/images/avatars/default-avata.jpg";
import { GET_ALL, LOGOUT, PUT_EDIT } from "../../api/apiService";
import { Link, useNavigate } from "react-router-dom";

const SettingProfile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    street: "",
    city: "",
    district: "",
    ward: "",
    country: "Vietnam",
    addressId: null,
    roles: [],
  });

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Lấy thông tin người dùng
  useEffect(() => {
    if (userEmail) {
      GET_ALL(`users/email/${userEmail}`)
        .then((response) => {
          if (response) {
            const {
              userId,
              firstName,
              lastName,
              email,
              mobileNumber,
              password,
              roles,
              address,
            } = response;
            setUserData({
              userId: userId,
              firstName: firstName || "",
              lastName: lastName || "",
              email: email || "",
              phoneNumber: mobileNumber || "",
              password: password || "",
              street: address?.street || "",
              city: address?.city || "",
              district: address?.district || "",
              ward: address?.ward || "",
              country: address?.country || "Vietnam",
              addressId: address?.addressId,
              roles: roles || [],
            });
          }
        })
        .catch((error) =>
          console.error("Lỗi khi lấy thông tin người dùng:", error)
        );
    }
  }, [userEmail]);

  // ẩn hiện ô địa chỉ
  const toggleAddressFields = () => setShowAddressFields(!showAddressFields);

  // ẩn hiện đổi password
  const handleToggleChangePassword = () =>
    setShowChangePassword(!showChangePassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields({ ...passwordFields, [name]: value });
  };

  // Hàm cập nhật hồ sơ: xây dựng payload và gọi PUT_EDIT API
  const handleUpdateUser = () => {
    let updatedPassword = userData.password;
    if (showChangePassword) {
      if (passwordFields.newPassword !== passwordFields.confirmPassword) {
        alert("Mật khẩu mới không khớp!");
        return;
      }
      updatedPassword = passwordFields.newPassword;
    }

    const payload = {
      userId: userData.userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobileNumber: userData.phoneNumber,
      email: userData.email,
      password: updatedPassword,
      roles: userData.roles,
      address: {
        addressId: userData.addressId,
        street: userData.street,
        city: userData.city,
        district: userData.district,
        ward: userData.ward,
        country: userData.country,
      },
    };

    PUT_EDIT(`users/${userData.userId}`, payload)
      .then((res) => {
        alert("Cập nhật hồ sơ thành công!");
        navigate('/Profile');

      })
      .catch((err) => {
        console.error("Lỗi cập nhật hồ sơ:", err);
        alert("Cập nhật hồ sơ thất bại!");
      });
  };

  return (
    <>
      <Menu />
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-md-3">
              <nav className="list-group">
                <Link className="list-group-item" to="/Profile">
                  Tổng quan về tài khoản
                </Link>
                <Link
                  className="list-group-item active disabled"
                  to="/SettingProfile"
                >
                  Cài đặt
                </Link>
                <Link
                  className="list-group-item"
                  to="/Order"
                >
                  Đơn hàng
                </Link>
                <Link className="list-group-item" to="" onClick={LOGOUT}>
                  Đăng xuất
                </Link>
              </nav>
            </aside>
            <main className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <form className="row">
                    <div className="col-md-9">
                      <div className="form-row">
                        <div className="col form-group">
                          <label>Họ</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col form-group">
                          <label>Tên</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={userData.email}
                            disabled
                          />
                        </div>
                        <div className="col form-group">
                          <label>Số điện thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          onClick={toggleAddressFields}
                          style={{
                            cursor: "pointer",
                            background: "#f9f9f9",
                            padding: "10px",
                            display: "block",
                            borderRadius: "10px",
                          }}
                        >
                          Địa chỉ {showAddressFields ? "▲" : "▼"}
                        </label>
                        {showAddressFields && (
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>Thành phố</label>
                              <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={userData.city}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Quận/Huyện</label>
                              <input
                                type="text"
                                className="form-control"
                                name="district"
                                value={userData.district}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Phường/Xã</label>
                              <input
                                type="text"
                                className="form-control"
                                name="ward"
                                value={userData.ward}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Đường</label>
                              <input
                                type="text"
                                className="form-control"
                                name="street"
                                value={userData.street}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        className="btn btn-light"
                        type="button"
                        onClick={handleToggleChangePassword}
                      >
                        {showChangePassword
                          ? "Ẩn đổi mật khẩu"
                          : "Đổi mật khẩu"}
                      </button>

                      {showChangePassword && (
                        <div className="mt-3">
                          <div className="form-group">
                            <label>Mật khẩu hiện tại</label>
                            <input
                              type="password"
                              className="form-control"
                              name="currentPassword"
                              value={passwordFields.currentPassword}
                              onChange={handlePasswordChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input
                              type="password"
                              className="form-control"
                              name="newPassword"
                              value={passwordFields.newPassword}
                              onChange={handlePasswordChange}
                            />
                          
                          </div>
                          <div className="form-group">
                            <label>Xác nhận mật khẩu mới</label>
                            <input
                              type="password"
                              className="form-control"
                              name="confirmPassword"
                              value={passwordFields.confirmPassword}
                              onChange={handlePasswordChange}
                            />
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateUser}
                      >
                        Cập nhật
                      </button>
                    </div>

                    <div className="col-md">
                      <img
                        src={DefaultAvata}
                        className="img-md rounded-circle border"
                        alt="User Avatar"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default SettingProfile;
