import React, { useEffect, useState } from "react";
import { DELETE_ID, GET_ALL, GET_ID, PUT_EDIT } from "../../api/apiService";
import payment from "../../assets/images/misc/payments.png";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cart, setCart] = useState(null);
  const cartId = localStorage.getItem("cartId");
  const userEmail = localStorage.getItem("userEmail");
  const [quantities, setQuantities] = useState({});
  const imageUrl = "http://localhost:8080/api/public/products/image/";


  // gọi api lấy giỏ hàng
  useEffect(() => {
    if (cartId && userEmail) {
      const endpoint = `users/${userEmail}/carts/${cartId}`;
      GET_ALL(endpoint)
        .then((response) => {
          setCart(response);         
          // console.log("Dữ liệu giỏ hàng:", response);
          
        })
        .catch((error) => {
          console.error("Lỗi khi lấy giỏ hàng:", error);
        });
    }
  }, [cartId, userEmail]);

  // gọi api lấy số lượng từng sản phẩm trong giỏ hàng
  useEffect(() => {
    if (cart && cart.products.length > 0) {
      cart.products.forEach((item) => {
        const productId = item.productId;
        GET_ALL(`cartItem/${cartId}/${productId}`)
          .then((response) => {
            setQuantities((prev) => ({
              ...prev,
              [productId]: response.quantity,
            }));
          }
        )
          .catch((error) => {
            console.log("Lỗi khi lấy số lượng sản phẩm: ", error);
          });
      });
    }
  }, [cart]);

  const handleRemoveProduct = (productId) => {
    if (!cartId) return;
    const endpoint = `carts/${cartId}/product/${productId}`;
    DELETE_ID(endpoint)
      .then(() => {
        // alert("Xóa sản phẩm thành công");
        setCart((prevCart) => ({
          ...prevCart,
          products: prevCart.products.filter(
            (item) => item.productId !== productId
          ),
        }));
      })
      .catch((error) => {
        console.error("Lỗi khi xoá sản phẩm:", error);
        alert("Không thể xoá sản phẩm. Vui lòng thử lại!");
      });
  };

  // Hàm cập nhật số lượng 
  const handleIncreaseQuantities = (productId, availableStock) => {
    const currentQuantity = quantities[productId] || 0;
    if (availableStock === 0) {
      alert("Sản phẩm đã hết hàng");
      return;
    }
    if (currentQuantity >= availableStock) {
      alert("Số lượng sản phẩm không đủ");
      return;
    }
    const newQuantity = currentQuantity + 1;
    const updateEndpoint = `carts/${cartId}/products/${productId}/quantity/${newQuantity}`;
    PUT_EDIT(updateEndpoint, null)
      .then(() => {
        // Nếu thành công, cập nhật state quantities
        setQuantities((prev) => ({
          ...prev,
          [productId]: newQuantity,
        }));
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
        alert("Không thể cập nhật số lượng sản phẩm");
      });
  };

  // Hàm cập nhật số lượng 
  const handleDecreaseQuantities = (productId) => {
    const currentQuantity = quantities[productId] || 0;
    if (currentQuantity <= 1) {
      return; // Không cho giảm dưới 1
    }
    const newQuantity = currentQuantity - 1;
    const updateEndpoint = `carts/${cartId}/products/${productId}/quantity/${newQuantity}`;
    PUT_EDIT(updateEndpoint, null)
      .then(() => {
        setQuantities((prev) => ({
          ...prev,
          [productId]: newQuantity,
        }));
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
        alert("Không thể cập nhật số lượng sản phẩm");
      });
  };

  // const totalDiscount = cart?.products?.reduce(
  //   (total, item) => total + (item.price - item.specialPrice), 0)
    
  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <main className="col-md-9">
            <div className="card">
              <table className="table table-borderless table-shopping-cart">
                <thead className="text-muted">
                  <tr className="small text-uppercase">
                    <th scope="col">Sản phẩm</th>
                    <th scope="col" width="120">
                      Số lượng
                    </th>
                    <th scope="col" width="120">
                      Giá
                    </th>
                    <th scope="col" className="text-right" width="200">
                      {" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart && cart.products.length > 0 ? (
                    cart.products.map((item) => (
                      <tr>
                        
                        <td>
                          <figure className="itemside">
                            <div className="aside">
                              <img
                                src={`${imageUrl}${item.image}`}
                                className="img-sm"
                              />
                            </div>
                            <figcaption className="info">
                              <a href="#" className="title text-dark">
                                {item.productName}
                              </a>
                              <p className="text-muted small">
                                Thương hiệu: {item.brand.brandName}
                                <br /> Danh mục: {item.category.categoryName}
                              </p>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <button
                              className="btn bg-main text-white"
                              type="button"
                              onClick={() =>
                                handleDecreaseQuantities(item.productId)
                              }                             
                            >
                              &minus;
                            </button>
                            <input
                              type="text"
                              className="form-control"
                              value={quantities[item.productId]}
                              onChange={(e) => console.log(e.target.value)}
                              style={{
                                width: "50px",
                                textAlign: "center",
                                height: "35px",
                              }}
                            />
                            <button
                              className="btn bg-main text-white"
                              type="button"
                              onClick={() =>
                                handleIncreaseQuantities(
                                  item.productId,
                                  item.quantity
                                )
                              }
                              disabled={item.quantity === 0}
                              
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td>
                          <div className="price-wrap">
                            <var className="price">{item.specialPrice.toLocaleString("vi-VN")}</var>
                            <small className="text-muted">
                              {" "}
                              {item.price.toLocaleString("vi-VN")}
                            </small>
                          </div>
                        </td>
                        <td className="text-right">
                          {/* <a
                            data-original-title="Save to Wishlist"
                            title=""
                            href=""
                            className="btn btn-light"
                            data-toggle="tooltip"
                          >
                           
                            <i className="fa fa-heart"></i>
                          </a> */}
                          <a
                            href=""
                            className="btn btn-light text-primary" 
                            style={{borderColor:'#FF6A00'}}
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveProduct(item.productId);
                            }}
                          >
                            {" "}
                            Xoá
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
              <div className="card-body border-top">
                <Link to="/Payment" className={`btn btn-primary float-md-right ${!cartId ? 'disabled' : ''} ${cart && cart.totalPrice === 0 ? 'disabled' : ''}
`}>
                  {" "}
                  Thanh toán <i className="fa fa-chevron-right"></i>{" "}
                </Link>
                <Link to="/" className="btn btn-light">
                  {" "}
                  <i className="fa fa-chevron-left"></i> Tiếp tục mua hàng 
                </Link>
              </div>
            </div>

            <div className="alert alert-success mt-3">
              <p className="icontext">
                <i className="icon text-success fa fa-truck"></i> Giao hàng miễn phí trong vòng 1-2 tuần
              </p>
            </div>
          </main>
          <aside className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Phiếu giảm giá?</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        placeholder="Mã giảm giá"
                      />
                      <span className="input-group-append">
                        <button className="btn btn-primary">Áp dụng</button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="dlist-align">
                  <dt>Tổng giá:</dt>
                  <dd className="text-right">
                  {cart ? `${cart.totalPrice.toLocaleString("vi-VN")} VNĐ` : "0 VNĐ"}
                  </dd>
                </dl>
                {/* <dl className="dlist-align">
                  <dt>Discount:</dt>
                  <dd className="text-right"> VNĐ</dd>
                </dl> */}
                {/* <dl className="dlist-align">
                  <dt>Total:</dt>
                  <dd className="text-right  h5">
                    <strong>$1,650</strong>
                  </dd>
                </dl> */}
                <hr />
                <p className="text-center mb-3">
                  <img src={payment} height={26} />
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
export default Cart;
