import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link } from "react-router-dom";
import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";

const ProductByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const imageURL = "http://localhost:8080/api/public/products/image/";
  useEffect(() => {
    GET_ALL("categories", {})
      .then((response) => {
        // console.log("Categories fetched:", response.content);
        setCategories(response.content);

        if (response.content.length > 0) {
          setSelectedCategory(response.content[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return; // Nếu chưa có danh mục được chọn thì dừng lại

    const params = { pageSize: 4, sortBy: "productId", sortOrder: "asc" };

    // Gọi API để lấy sản phẩm theo danh mục
    GET_ALL(`categories/${selectedCategory.categoryId}/products`, params)
      .then((response) => {
        // console.log(`Products for category ${selectedCategory.categoryName}:`, response.content);
        setProducts(response.content);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [selectedCategory]); // Chỉ chạy lại khi danh mục được chọn thay đổi

  return (
    <section className="padding-bottom">
      <header className="section-heading heading-line">
        <h4 className="title-section text-uppercase text-main">
          Sản phẩm theo danh mục
        </h4>
      </header>

      {/* Dropdown chọn danh mục */}
      <div className="mb-4">
        <label htmlFor="category-select ">Chọn danh mục:</label>
        <select
          id="category-select"
          value={selectedCategory?.categoryId || ""}
          onChange={(e) => {
            const category = categories.find(
              (cat) => cat.categoryId === parseInt(e.target.value, 10)
            );
            setSelectedCategory(category);
          }}
        >
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị sản phẩm */}
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-xl-3 col-lg-3 col-md-4 col-6">
              <div className="card card-product-grid">
                <Link to={`/ProductDetail/${product.productId}`} className="img-wrap">
                  {product.discount != 0 ? (
                    <span className="badge badge-danger py-2">
                      - {product.discount}%
                    </span>
                  ) : (
                    ""
                  )}
                  <img src={`${imageURL}${product.image}`} />{" "}
                </Link>
                <figcaption className="info-wrap">
                  <ul className="rating-stars mb-1">
                    <li style={{ width: "80%" }} className="stars-active">
                      <img src={startsActive} alt="" />
                    </li>
                    <li>
                      <img src={startsDisable} alt="" />
                    </li>
                  </ul>
                  <div>
                    <p className="text-muted">
                      {product.brand.brandName}
                    </p>
                    <Link to={`/ProductDetail/${product.productId}`} className="title">
                      {product.productName}
                    </Link>
                  </div>
                  {product.specialPrice &&
                  product.specialPrice < product.price ? (
                    <div className="price mt-1">
                      <small>
                        <del className="text-gray-500 text-sm">
                          {product.price.toLocaleString("vi-VN")} VNĐ
                        </del>
                      </small>
                      <span className="ml-2 font-bold text-red-500 text-main">
                        {product.specialPrice.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>
                  ) : (
                    <div className="price mt-1">
                      {product.price.toLocaleString("vi-VN")} VNĐ
                    </div>
                  )}
                </figcaption>
              </div>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </div>
    </section>
  );
};

export default ProductByCategory;
