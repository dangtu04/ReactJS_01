import React, { useEffect, useState } from "react";
import DefaultAvata from "../.././assets/images/avatars/default-avata.jpg";
import { GET_ALL, LOGOUT } from "../../api/apiService";
import { Link } from "react-router-dom";
import Menu from "./Menu";
const Profile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [cartQty, setCartQty] = useState({ qty: 0 });
  const [orderQty, setOrderQty] = useState(0);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    district: "",
    ward: "",
  });

  // lấy thông tin người dùng
  useEffect(() => {
    if (userEmail) {
      GET_ALL(`users/email/${userEmail}`)
        .then((response) => {
          if (response) {
            const { firstName, lastName, email, mobileNumber, address, cart } =
              response;
            setUserData({
              firstName: firstName || "",
              lastName: lastName || "",
              email: email || "",
              phoneNumber: mobileNumber || "",
              street: address?.street || "",
              city: address?.city || "",
              district: address?.district || "",
              ward: address?.ward || "",
            });
            setCartQty({
              qty: cart?.products?.length || 0,
            });
          }
        })
        .catch((error) =>
          console.error("Lỗi khi lấy thông tin người dùng:", error)
        );
      // Lấy danh sách đơn hàng
      GET_ALL(`users/${userEmail}/orders`)
        .then((response) => {
          if (response && Array.isArray(response)) {
            setOrderQty(response.length);
          }
          // console.log("response: ", response);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            console.log("Lỗi 400: Không tìm thấy đơn hàng cho người dùng này.");
          } else {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
          }
        });
    }
  }, [userEmail]);

  return (
    <>
      <Menu />
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-md-3">
              <nav className="list-group">
                <Link
                  className="list-group-item active disabled"
                  href="/Profile"
                >                  
                  Tổng quan về tài khoản
                </Link>

                <Link className="list-group-item" to="/SettingProfile">                  
                  Cài đặt
                </Link>
                <Link className="list-group-item" to="/Order">Đơn hàng</Link>
                <Link className="list-group-item" to="" onClick={LOGOUT}>
                  
                  Đăng xuất
                </Link>
              </nav>
            </aside>
            <main className="col-md-9">
              <article className="card mb-3">
                <div className="card-body">
                  <figure className="icontext">
                    <div className="icon">
                      <img
                        className="rounded-circle img-sm border"
                        src={DefaultAvata}
                      />
                    </div>
                    <div className="text">
                      <strong>
                        
                         {userData.lastName}{" "}{userData.firstName}
                      </strong>
                      <br />
                      <p className="mb-2"> {userEmail} </p>
                      <Link
                        to="/SettingProfile"
                        className="btn btn-light btn-sm"
                      >
                        Chỉnh sửa
                      </Link>
                    </div>
                  </figure>
                  <hr />
                  <p>
                    <i className="fa fa-map-marker text-muted"></i> &nbsp; Địa
                    chỉ:
                    <br />
                    {userData.city}, {userData.district}, {userData.ward},{" "}
                    {userData.street}
                    
                  </p>

                  <article className="card-group card-stat">
                    <figure className="card bg">
                      <div className="p-3">
                        <h4 className="title">{orderQty}</h4>
                        <span>Đơn hàng</span>
                      </div>
                    </figure>
                    <figure className="card bg">
                      <div className="p-3">
                        <h4 className="title">{cartQty.qty}</h4>
                        <span>Giỏ hàng</span>
                      </div>
                    </figure>
                  </article>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};
export default Profile;
