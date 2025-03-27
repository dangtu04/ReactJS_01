import React, { useEffect, useState } from "react";
import { GET_ALL, POST_ADD } from "../../api/apiService";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const baseURL = process.env.REACT_APP_BASE_API_URL
const Payment = () => {
  const userEmail = localStorage.getItem("userEmail");
  const cartId = localStorage.getItem("cartId"); 


  const [showAddressFields, setShowAddressFields] = useState(false);
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
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [quantities, setQuantities] = useState({}); 
  const [selectedPayment, setSelectedPayment] = useState(""); // Theo dõi phương thức thanh toán
  const [isPaid, setIsPaid] = useState(false); 
  const VND_TO_USD = 25345;

  const totalPriceUSD = Number((cart.totalPrice / VND_TO_USD).toFixed(2));


  const navigate = useNavigate();
  // đổi phương thức thanh toán
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  // lấy thông tin người dùng
  useEffect(() => {
    if (userEmail) {
      GET_ALL(`users/email/${userEmail}`)
        .then((response) => {
          if (response) {
            const { firstName, lastName, email, mobileNumber, address, cart } = response;
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
            setCart({
              products: cart?.products || [],
              totalPrice: cart?.totalPrice || 0,
            });
          }
        })
        .catch((error) => console.error("Lỗi khi lấy thông tin người dùng:", error));
    }
  }, [userEmail]);

  // Lấy số lượng sản phẩm trong giỏ hàng
  useEffect(() => {
    if (cart.products.length > 0 && cartId) {
      const fetchQuantities = async () => {
        const newQuantities = {};
        await Promise.all(
          cart.products.map(async (product) => {
            try {
              const response = await GET_ALL(`cartItem/${cartId}/${product.productId}`);
              if (response) {
                newQuantities[product.productId] = response.quantity || 1;
              }
            } catch (error) {
              console.error("Lỗi khi lấy số lượng sản phẩm:", error);
            }
          })
        );
        setQuantities(newQuantities);
      };

      fetchQuantities();
    }
  }, [cart.products, cartId]);

  // hiện/ẩn các trường địa chỉ
  const toggleAddressFields = () => setShowAddressFields(!showAddressFields);


  const handleCreateOrder = () => {
    if (!cartId) {
      alert("Không tìm thấy giỏ hàng");
      return;
    }
    if (!userEmail) {
      alert("không tìm thấy thông tin người dùng");
      return;
    }
    const endpoint = `users/${userEmail}/carts/${cartId}/payments/${selectedPayment}/order`
    // console.log(endpoint)
    POST_ADD(endpoint, null)
    .then(() => {
      alert("Đặt hàng thành công");
      navigate("/Order")

    })
    .catch((error) => {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Đặt hàng thất bại");
    });
  }

  const handlePaymentSuccess = () => {
    setIsPaid(true);    
    const endpoint = `users/${userEmail}/carts/${cartId}/payments/${selectedPayment}/order`;
    POST_ADD(endpoint, null)
      .then((response) => {
        console.log("Order saved:", response);
        alert("Đặt hàng thành công");
        navigate("/Order");
      })
      .catch((error) => console.error("Error saving order:", error));
  };


  return (
    <section className="section-content padding-y">
      <div className="container" style={{ maxWidth: "720px" }}>
        
        {/* Thông tin giao hàng */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-3 text-main">Thông tin giao hàng</h4>

            <div className="form-row">
              <div className="col form-group">
                <label>Họ</label>
                <input type="text" className="form-control" value={userData.lastName} disabled />
              </div>
              <div className="col form-group">
                <label>Tên</label>
                <input type="text" className="form-control" value={userData.firstName} disabled />
              </div>
            </div>

            <div className="form-row">
              <div className="col form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={userData.email} disabled />
              </div>
              <div className="col form-group">
                <label>Số điện thoại</label>
                <input type="text" className="form-control" value={userData.phoneNumber} disabled />
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
                    <input type="text" className="form-control" value={userData.city} disabled />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Quận/Huyện</label>
                    <input type="text" className="form-control" value={userData.district} disabled />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Phường/Xã</label>
                    <input type="text" className="form-control" value={userData.ward} disabled />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Số nhà, đường</label>
                    <input type="text" className="form-control" value={userData.street} disabled />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4 text-main">Sản phẩm thanh toán</h4>

            {cart.products.length > 0 ? (
              <>
                {cart.products.map((product, index) => {
                  const quantity = quantities[product.productId] || 1;
                  // console.log(quantities[product.productId])
                  return (
                    <div key={index} className="cart-item">
                      <img src={`${baseURL}/public/products/image/${product.image}`} alt={product.productName} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h5>{product.productName}</h5>
                        <p>
                          Giá:{" "}
                          {product.specialPrice
                            ? product.specialPrice.toLocaleString()
                            : product.price.toLocaleString()}{" "}
                          VND x {quantity} ={" "}
                          {(quantity *
                            (product.specialPrice ? product.specialPrice : product.price)
                          ).toLocaleString()}{" "}
                          VND
                        </p>

                      </div>
                    </div>
                  );
                })}
                <hr />
                <h5 className="text-right">Tổng tiền: {cart.totalPrice.toLocaleString()} VND</h5>
              </>
            ) : (
              <p>Giỏ hàng trống.</p>
            )}
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4 text-main">Phương thức thanh toán</h4>

            <div className="payment-options">
              {/* Thanh toán khi nhận hàng */}
              <label className="payment-option">
                <input
                  type="radio"
                  className="mr-2"
                  name="payment"
                  value="cash"
                  onChange={handlePaymentChange}
                />
                <div className="payment-box">
                  <h5>Thanh toán khi nhận hàng</h5>
                  <p>Trả tiền mặt khi nhận hàng.</p>
                </div>
              </label>

              {/* PayPal */}
              <label className="payment-option">
                <input
                  type="radio"
                  className="mr-2"
                  name="payment"
                  value="paypal"
                  onChange={handlePaymentChange}
                />
                <div className="payment-box">
                  <h5>Thanh toán PayPal ( ${totalPriceUSD} )</h5>
                  <p>Thanh toán an toàn qua PayPal.</p>
                </div>
              </label>
            </div>

            {/* Nút đặt hàng chỉ hiển thị khi chọn COD */}
            {selectedPayment === "cash" && (
              <button className="btn btn-primary mt-3"
                onClick={handleCreateOrder}
              >Đặt hàng</button>
            )}

            {selectedPayment === "paypal" && (
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_KEY_PAYPAL }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPriceUSD,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaymentSuccess(details, data);
                });
              }}
            />
            {isPaid && <p>Thanh toán thành công! Đơn hàng của bạn đã được ghi nhận.</p>}
          </PayPalScriptProvider>
            )}
             
          </div>
        </div>
       
      </div>
    </section>
  );
};

export default Payment;
