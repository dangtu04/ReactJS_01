import React, { useEffect, useState } from "react";

import items1 from "../../assets/images/items/1.jpg";
import { GET_ALL } from "../../api/apiService";
import { Link } from "react-router-dom";

const RecommendedProduct = () => {
  const [products, setProducts] = useState([]);
  const imageURL = "http://localhost:8080/api/public/products/image/";
  useEffect(() => {
    GET_ALL(`products?pageNumber=0&pageSize=12&sortBy=productId&sortOrder=asc`)
      .then((response) => {
        // console.log('dữ liệu sp: ', response.content)
        setProducts(response.content);
      })
      .catch((error) => {
        console.log("Lỗi khi tải dữ liệu sản phẩm: ", error);
      });
  }, []);
  return (
    <section className="padding-bottom-sm">
      <header className="section-heading heading-line">
        <h4 className="title-section text-uppercase text-main">
          Sản phẩm được đề xuất
        </h4>
      </header>

      <div className="row row-sm">
        {products.map((product) => (
         <div
		 className="col-xl-2 col-lg-3 col-md-4 col-6"
		 key={product.productId}
	   >
		 <div className="card card-sm card-product-grid">
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
			 <Link to={`/ProductDetail/${product.productId}`} className="title">
			   {product.productName}
			 </Link>
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
        ))}
      </div>
    </section>
  );
};
export default RecommendedProduct;
