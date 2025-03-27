import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DELETE_ID, GET_ALL, GET_ID, POST_ADD, PUT_EDIT } from "../../api/apiService";
import Menu from "./Menu";
import DefaultAvt from "../../assets/images/avatars/default-avata.jpg";
const baseURL = process.env.REACT_APP_BASE_API_URL
const ProductDetail = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [availabelQuantity, setAvailabelQuantity] = useState(0);
  const [reviews, setReviews] = useState([]);
  const userIdLocal = localStorage.getItem("userId");
  const cartId = localStorage.getItem("cartId");

  useEffect(
    function () {
      GET_ID("/products", productId)
        .then((response) => {
          setProducts(response);
          setAvailabelQuantity(response.quantity);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          setError("Không thể tải thông tin sản phẩm.");
          setLoading(false);
        });
    },
    [productId]
  );

  // Cộng số lượng sản phẩm
  const handleIncreaseQuantity = () => {
    if (availabelQuantity === 0) {
      alert("Sản phẩm đã hết hàng");
      return;
    }
    if (quantity < availabelQuantity) {
      setQuantity(quantity + 1);
    } else {
      alert("Số lượng sản phẩm không đủ");
    }
  };

  // Trừ số lượng sản phẩm
  const handleDecreaseQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    if (!cartId) {
      alert("Không tìm thấy giỏ hàng");
      return;
    }
    const endpoint = `carts/${cartId}/products/${productId}/quantity/${quantity}`;
    POST_ADD(endpoint, null)
      .then(() => {
        alert("Thêm sản phẩm thành công");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Nếu sản phẩm đã có trong giỏ hàng -> Lấy số lượng hiện tại
          GET_ALL(`cartItem/${cartId}/${productId}`)
            .then((cartItem) => {
              const newQuantity = cartItem.quantity + quantity;
              const updateEndpoint = `carts/${cartId}/products/${productId}/quantity/${newQuantity}`;

              // Cập nhật số lượng
              PUT_EDIT(updateEndpoint, null)
                .then(() => {
                  alert("Cập nhật số lượng sản phẩm thành công");
                })
                .catch((updateError) => {
                  console.error("Lỗi khi cập nhật số lượng:", updateError);
                  alert("Không thể cập nhật số lượng sản phẩm");
                });
            })
            .catch((fetchError) => {
              console.error("Lỗi khi lấy số lượng sản phẩm:", fetchError);
              alert("Không thể lấy số lượng sản phẩm trong giỏ hàng");
            });
        } else {
          console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
          alert("Không thể thêm sản phẩm vào giỏ hàng");
        }
      });
  };

  // gọi api lấy đánh giá sản phẩm
  useEffect(() => {
    const endpoint = `reviews/product/${productId}/paged`;
    GET_ALL(endpoint)
      .then((response) => {
        setReviews(response.content || []);
      })
      .catch((error) => {
        console.log("Lỗi khi lấy đánh giá sản phẩm: ", error);
      });
  }, [productId]);

  if (loading) {
    return <>Dang tải</>;
  }
  if (error) {
    return <>{error}</>;
  }
  if (!products) {
    return <>Không tìm thấy sản phẩm</>;
  }

  const handleDelete = (reviewId) => {
    const endpoint = `reviews/${reviewId}`
    DELETE_ID(endpoint)
    .then((response) => {
      setReviews((prevReviews) => 
        prevReviews.filter((review) => review.id !== reviewId)
      );
      alert('Xoá đánh giá sản phẩm thành công')
    })
    .catch((error) => {
      alert('Lỗi khi xoá đánh giá')
      console.log('Lỗi khi xoá đánh giá: ', error)
    })
  }
  return (
    <>
      <Menu />
      <section className="py-3 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">Chi tiết sản phẩm</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {products.productName}
            </li>
          </ol>
        </div>
      </section>
      <section className="section-content bg-white padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-md-6">
              <div className="card">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <img
                      src={`${baseURL}/public/products/image/${products.image}`}
                    />
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-md-6">
              <article className="product-info-aside">
                <h2 className="title mt-3 text-main">{products.productName}</h2>
                <div className="mb-3">
                  <var className="price h4">
                    {products.specialPrice < products.price ? products.specialPrice.toLocaleString("vi-VN") : products.price.toLocaleString("vi-VN")} VNĐ
                  </var>
                  {/* <span className="text-muted">{products.specialPrice}</span> */}
                </div>

                <p>{products.description}</p>

                <dl className="row">
                  <dt className="col-sm-4">Danh mục</dt>
                  <dd className="col-sm-8">
                    <a href="#">{products.category.categoryName}.</a>
                  </dd>

                  <dt className="col-sm-4">Thương hiệu</dt>
                  <dd className="col-sm-8">
                    <a href="#">{products.brand.brandName}.</a>
                  </dd>

                  <dt className="col-sm-4">Thời gian giao hàng</dt>
                  <dd className="col-sm-8">3-4 ngày</dd>

                  <dt className="col-sm-4">Số lượng khả dụng</dt>
                  <dd className="col-sm-8">
                    <a href="#">{products.quantity} Sản phẩm</a>
                  </dd>
                </dl>

                <div className="form-row  mt-4">
                  <div className="form-group col-md flex-grow-0">
                    <div className="input-group mb-3 input-spinner">
                      <div className="input-group-prepend">
                        <button
                          className="btn bg-main text-white"
                          type="button"
                          id="button-plus"
                          onClick={handleDecreaseQuantity}
                        >
                          &minus;
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => console.log(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn bg-main text-white"
                          type="button"
                          id="button-minus"
                          onClick={handleIncreaseQuantity}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md">
                    <a
                      href="#"
                      className="btn  btn-primary"
                      onClick={handleAddToCart}
                    >
                      <i className="fas fa-shopping-cart"></i>
                      <span className="text">Thêm vào giỏ hàng</span>
                    </a>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
      <section className="section-content bg-white padding-y">
        <div className="container">
          <h3 className="title mb-4 text-main">Đánh giá sản phẩm</h3>
          <div className="review-container">
            {reviews.length === 0 ? (
              <p>Chưa có đánh giá cho sản phẩm</p>
            ) : (
              reviews.map((review) => (
                <div
                  className="media review-card mb-4"
                  key={review.id}
                  style={{ position: "relative" }}
                >
                  <img
                    src={DefaultAvt}
                    alt="User Avatar"
                    className="mr-3 rounded-circle"
                    width="48"
                    height="48"
                  />
                  <div className="media-body">
                    <div className="review-header">
                      <h5 className="mt-0" style={{ fontSize: "1rem" }}>
                        {review.userName}
                      </h5>
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {review.createdAt}
                      </small>
                    </div>

                    {/* Nút xóa */}
                    {review.userId == userIdLocal ? (
                      <button
                        className="delete-button"
                        style={{
                          position: "absolute",
                          top: "50px",
                          right: "10px",
                          border: "none",
                          background: "none",
                          color: "#ff6a00",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(review.id)}
                      >
                        Xoá
                      </button>
                    ): ''}

                    <ul
                      className="rating-stars"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        fontSize: "0.9rem",
                        marginTop: "-1.5rem",
                        padding: 0,
                        listStyle: "none",
                      }}
                    >
                      <li style={{ color: "#ccc" }}>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </li>
                      <li
                        className="stars-active"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: `${(review.rating / 5) * 100}%`,
                          overflow: "hidden",
                          color: "orange",
                        }}
                      >
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                    <p className="review-text" style={{ fontSize: "0.85rem" }}>
                      {review.comment === null ? (
                        <i>Người dùng chưa để lại đánh giá</i>
                      ) : (
                        review.comment
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
