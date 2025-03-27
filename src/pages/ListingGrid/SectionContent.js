import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GET_ALL, GET_ID } from "../../api/apiService";
import Menu from "../home/Menu";
const baseURL = process.env.REACT_APP_BASE_API_URL
const SectionContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({ categoryName: "Tất cả sản phẩm" });
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const categoryId = queryParams.get("categoryId");
  const numItems = 4;

  const handlePageChange = (page) => {
    navigate(`/ListingGrid?page=${page}&categoryId=${categoryId}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <Link
            className="page-link"
            to={`?page=${i}&categoryId=${categoryId}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  useEffect(() => {
    setLoading(true);
    const params = {
      pageNumber: currentPage,
      pageSize: numItems,
      sortBy: "productId",
      sortOrder: "asc",
    };
    if (categoryId !== null) {
      GET_ALL(`categories/${categoryId}/products`, params)
        .then((response) => {
          setProducts(response.content);
          setTotalPages(response.totalPages);
          setTotalElements(response.totalElements);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch products:", error);
          setLoading(false);
        });

      GET_ID("categories", categoryId)
        .then((item) => setCategories(item))
        .catch((error) => {
          console.error("Failed to fetch category:", error);
        });
    } else {
      GET_ALL("products", params)
        .then((response) => {
          setProducts(response.content);
          setTotalPages(response.totalPages);
          setTotalElements(response.totalElements);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch products:", error);
          setLoading(false);
        });

      setCategories({ categoryName: "Tất cả sản phẩm" });
    }
  }, [categoryId, currentPage]);

  return (
<>
<Menu/>
<div className="container">

    <section className="section-content padding-y">
      <div className="container">
        <div className="card mb-3">
          <div className="card-body">
            {/* Breadcrumb navigation */}
            <div className="row">
             Bạn đang ở đây: 
              <nav className="col-md-8">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">{categories?.categoryName}</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="row">
          {!loading &&
            products.length > 0 &&
            products.map((product) => (
                <div className="col-md-3" key={product.productId}>
                           <Link to={`/ProductDetail/${product.productId}`}>
                             <figure className="card card-product-grid">
                               <div className="img-wrap">
                                 {product.discount != 0 ? <span className="badge badge-danger py-2">- {product.discount}%</span>: ''}
                                 <img
                                   src={`${baseURL}/public/products/image/${product.image}`}
                                   alt={product.productName}
                                 />
                               </div>
                               <figcaption className="info-wrap">
                                 <p className="title mb-2">{product.productName}</p>
                                 <div className="price-wrap">
             
                                 <span className="price text-primary">
                                   {product.specialPrice 
                                     ? `${product.specialPrice.toLocaleString("vi-VN")} VNĐ` 
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
                                   <span className="tag">{product.category.categoryName}</span>
                                   <span className="tag">{product.brand.brandName}</span>
                                 </p>
                               </figcaption>
                             </figure>
                           </Link>
                         </div>
            ))}
          {loading && <p>Loading...</p>}
        </div>
        {/* Pagination */}
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Trang trước
              </button>
            </li>
            {renderPageNumbers()}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Trang sau
              </button>
            </li>
          </ul>
        </nav>
        <div className="box text-center">
          <p>Bạn đã tìm thấy điều bạn đang tìm kiếm chứ?</p>
          <a href="#" className="btn btn-light">
            Có
          </a>
          <a href="#" className="btn btn-light" style={{ marginLeft: "10px" }}>
            Không
          </a>
        </div>
      </div>
    </section>
  </div>
</>
  );
};

export default SectionContent;
