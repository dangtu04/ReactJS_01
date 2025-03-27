import React, { useState, useEffect, use } from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { GET_ALL, LOGOUT, POST_ADD } from "../../api/apiService";
import PrintInvoiceButton from "../print/PrintInvoiceButton";
const baseURL = process.env.REACT_APP_BASE_API_URL
const Order = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [userId, setUserId] = useState(null);
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
  const [orders, setOrder] = useState([]);
  const imageURL = `${baseURL}/public/products/image/`;
  const [evaluatingProductId, setEvaluatingProductId] = useState(null);
  const [evaluations, setEvaluations] = useState({});
  // const [reviews, setReviews] = useState([]);

  // Lấy thông tin người dùng và danh sách đơn hàng
  useEffect(() => {
    if (userEmail) {
      // Lấy thông tin người dùng
      GET_ALL(`users/email/${userEmail}`)
        .then((response) => {
          if (response) {
            const { firstName, lastName, email, mobileNumber, address } =
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
          }
          setUserId(response.userId);
        })
        .catch((error) =>
          console.error("Lỗi khi lấy thông tin người dùng:", error)
        );

      // Lấy danh sách đơn hàng
      GET_ALL(`users/${userEmail}/orders`)
        .then((response) => {
          setOrder(response);
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

  const toggleEvaluateFields = (orderItemId, productId) => {
    setEvaluatingProductId((prevId) =>
      prevId === orderItemId ? null : orderItemId
    );
  };

  const handleSendEvaluate = (productId) => {
    const { rating, comment } = evaluations[productId] || {};
    const endpointGet = `reviews/user/${userId}/product/${productId}`;
    const endpointPost = `reviews/userId/${userId}/productId/${productId}`;
    const userName = userData.lastName + " " + userData.firstName;
    const payload = {
      rating: rating || 5,
      comment: comment,
      userName: userName,
    };
  
    // Thực hiện GET để kiểm tra
    GET_ALL(endpointGet)
      .then((response) => {
        // Nếu GET thành công nghĩa là đã có đánh giá
        alert("Bạn đã đánh giá sản phẩm này rồi!");
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Nếu gặp lỗi 404 thì chưa có đánh giá, cho phép post
          POST_ADD(endpointPost, payload)
            .then(() => {
              alert("Thêm đánh giá thành công");
              setEvaluations((prev) => ({
                ...prev,
                [productId]: {
                  rating: 5,
                  comment: "",
                },
              }));
            })
            .catch((postError) => {
              alert("Lỗi khi thêm đánh giá sản phẩm");
              console.log("Lỗi khi thêm đánh giá: ", postError);
            });
        } else {
          // Nếu lỗi khác 404
          alert("Lỗi khi kiểm tra đánh giá");
          console.log("Lỗi khi kiểm tra đánh giá: ", error);
        }
      });
  };
  

  return (
    <>
      <Menu />
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            {/* Thanh điều hướng bên trái */}
            <aside className="col-md-3">
              <nav className="list-group">
                <Link className="list-group-item" to="/Profile">
                  Tổng quan về tài khoản
                </Link>
                <Link className="list-group-item" to="/SettingProfile">
                  Cài đặt
                </Link>
                <Link className="list-group-item active disabled" to="/Order">
                  Đơn hàng
                </Link>
                <Link className="list-group-item" to="" onClick={LOGOUT}>
                  Đăng xuất
                </Link>
              </nav>
            </aside>
            {/* Nội dung chính hiển thị đơn hàng */}
            <main className="col-md-9">
              {orders.map((order) => (
                <article className="card mb-4" key={order.orderId}>
                  <header className="card-header">
                    <a href="#" className="float-right">
                      {/* <i className="fa fa-print"></i> In hoá đơn */}
                      <PrintInvoiceButton order={order} />
                    </a>
                    <strong className="d-inline-block mr-3">
                      Mã đơn hàng: {order.orderId}
                    </strong>
                    <span className="mr-3">Ngày đặt hàng: {order.orderDate}</span>
                    <strong>Trạng thái:</strong>
                    <span> {order.orderStatus}</span>
                    
                  </header>
                  <div className="card-body">
                    <div className="row">
                      {/* Thông tin người nhận */}
                      <div className="col-md-8">
                        <h6 className="text-muted">Giao đến</h6>
                        <p>
                          {userData.lastName + " " + userData.firstName} <br />
                          Số điện thoại: {userData.phoneNumber} <br />
                          Email: {userData.email} <br />
                          Địa chỉ:{" "}
                          {`${userData.city}, ${userData.district}, ${userData.ward}, ${userData.street}`}
                        </p>
                      </div>
                      {/* Thông tin thanh toán */}
                      <div className="col-md-4">
                        <h6 className="text-muted">Thanh toán</h6>
                        <span className="text-success">
                          {order.payment.paymentMethod === "cash"
                            ? "Thanh toán tiền mặt"
                            : "Thanh toán PayPal"}
                        </span>
                        <p>
                          <span className="b">
                            Tổng tiền:{" "}
                            {order.totalAmount.toLocaleString("vi-VN")} VND
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <tbody>
                        {order.orderItems.map((item) => (
                          <React.Fragment key={item.orderItemId}>
                            <tr>
                              <td width="65">
                                <img
                                  src={`${imageURL}${item.product.image}`}
                                  className="img-xs border"
                                  alt={item.product.productName}
                                />
                              </td>
                              <td>
                                <p className="title mb-0">
                                  {item.product.productName}
                                </p>
                                <var className="price text-muted">
                                  {item.product.specialPrice.toLocaleString(
                                    "vi-VN"
                                  )}{" "}
                                  VND
                                </var>
                              </td>
                              <td>
                                Thương hiệu <br />
                                {item.product.brand?.brandName ||
                                  "Không xác định"}
                              </td>
                              <td width="250">
                               {order.orderStatus === 'Delivered' && ( <Link
                                  to="#"
                                  className="btn btn-outline-primary"
                                  onClick={() =>
                                    toggleEvaluateFields(
                                      item.orderItemId,
                                      item.product.productId
                                    )
                                  }
                                >
                                  Đánh giá
                                </Link>)}
                              </td>
                            </tr>

                            {evaluatingProductId === item.orderItemId && (
                              <>
                                <tr>
                                  <td colSpan="4">
                                    <div className="d-flex align-items-center">
                                      {/* Phần chọn số sao */}
                                      <div
                                        className="star-rating"
                                        style={{
                                          minWidth: "120px",
                                          marginRight: 10,
                                        }}
                                      >
                                        <select
                                          className="custom-select form-control start"
                                          value={
                                            evaluations[item.product.productId]
                                              ?.rating || "5"
                                          }
                                          onChange={(e) => {
                                            const ratingValue = parseInt(
                                              e.target.value,
                                              10
                                            ); // chuyển đổi sang số nguyên
                                            setEvaluations((prev) => ({
                                              ...prev,
                                              [item.product.productId]: {
                                                ...prev[item.product.productId],
                                                rating: ratingValue,
                                              },
                                            }));
                                          }}
                                        >
                                          <option value="5">★★★★★</option>
                                          <option value="4">★★★★</option>
                                          <option value="3">★★★</option>
                                          <option value="2">★★</option>
                                          <option value="1">★</option>
                                        </select>
                                      </div>

                                      {/* Phần nhập nhận xét */}
                                      <div className="comment-input flex-grow-1 ms-3">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập nhận xét về sản phẩm..."
                                            value={
                                              evaluations[
                                                item.product.productId
                                              ]?.comment || ""
                                            }
                                            onChange={(e) =>
                                              setEvaluations((prev) => ({
                                                ...prev,
                                                [item.product.productId]: {
                                                  ...prev[
                                                    item.product.productId
                                                  ],
                                                  comment: e.target.value,
                                                },
                                              }))
                                            }
                                          />
                                          <button
                                            className="btn text-white bg-main"
                                            type="button"
                                            onClick={() =>
                                              handleSendEvaluate(
                                                item.product.productId
                                              )
                                            }
                                          >
                                            <i
                                              className="fa fa-paper-plane"
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
