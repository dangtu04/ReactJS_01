// ProductSearch.js
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GET_ALL } from "../../api/apiService";
import Menu from "./Menu";

function ProductSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (keyword.trim() !== "") {
      GET_ALL(`products/keyword/${encodeURIComponent(keyword)}`)
        .then((data) => {
          setProducts(data.content);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setError(`Không tìm thấy sản phẩm`);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [keyword]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Kết quả tìm kiếm cho: "{keyword}"</h4>
        {products.length === 0 ? (
          <p>Không có sản phẩm nào được tìm thấy.</p>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3" key={product.productId}>
                <Link to={`/ProductDetail/${product.productId}`}>
                  <figure className="card card-product-grid">
                    <div className="img-wrap">
                      {product.discount !== 0 && (
                        <span className="badge badge-danger py-2">
                          - {product.discount}%
                        </span>
                      )}
                      <img
                        src={`http://localhost:8080/api/public/products/image/${product.image}`}
                        alt={product.productName}
                      />
                    </div>
                    <figcaption className="info-wrap">
                      <p className="title mb-2">{product.productName}</p>
                      <div className="price-wrap">
                        <span className="price text-primary">
                          {product.specialPrice
                            ? `${product.specialPrice.toLocaleString(
                                "vi-VN"
                              )} VNĐ`
                            : `${product.price.toLocaleString("vi-VN")} VNĐ`}
                        </span>
                        <small className="text-muted"> / Sản phẩm</small>
                      </div>
                      <p className="mb-2">
                        {product.quantity} Cái{" "}
                        <small className="text-muted">(Số lượng còn lại)</small>
                      </p>
                      <hr />
                      <p className="mb-3">
                        <span className="tag">
                          {product.category.categoryName}
                        </span>{" "}
                        <span className="tag">{product.brand.brandName}</span>
                      </p>
                    </figcaption>
                  </figure>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductSearch;
