import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GET_ALL } from "../../api/apiService";
import Menu from "../home/Menu";
const baseURL = process.env.REACT_APP_BASE_API_URL
const ProductGrid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  const numItems = 8;

  const fetchProducts = (page = currentPage) => {
    if (page < 1 || page > totalPages) return;
    const params = {
      pageNumber: page,
      pageSize: numItems,
      sortBy: "productId",
      sortOrder: "asc",
    };

    let endpoint = "products";
    if (selectedCategoryId && selectedBrandId) {
      endpoint = `categories/${selectedCategoryId}/brands/${selectedBrandId}/products`;
    } else if (selectedCategoryId) {
      endpoint = `categories/${selectedCategoryId}/products`;
    } else if (selectedBrandId) {
      endpoint = `brands/${selectedBrandId}/products`;
    }

    GET_ALL(endpoint, params)
      .then((response) => {
        setProducts(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategoryId, selectedBrandId]);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
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
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <li
        key={page}
        className={`page-item ${currentPage === page ? "active" : ""}`}
      >
        <Link
          className="page-link"
          to={`?page=${page}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Link>
      </li>
    ));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GET_ALL("categories");
        setCategories(response.content);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await GET_ALL("brands");
        setBrands(response);
      } catch (error) {
        console.error("Error fetching brands: ", error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <section className="section-content">
      <Menu />
      <div className="container pt-1">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                 Tất cả sản phẩm
                </li>
              </ol>
            </div>
            <hr />
            <div className="row">
              <label>Lọc theo:</label>
              <ul className="list-inline">
                <li className="list-inline-item mr-3 dropdown px-4">  
                  <select
                    className="form-control"
                    value={selectedCategoryId || ""}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                  >
                    <option value="">Tất cả danh mục</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="list-inline-item mr-3 dropdown px-4">
                  <select
                    className="form-control"
                    value={selectedBrandId || ""}
                    onChange={(e) => setSelectedBrandId(e.target.value)}
                  >
                    <option value="">Tất cả thương hiệu</option>
                    {brands.map((brand) => (
                      <option key={brand.brandId} value={brand.brandId}>
                        {brand.brandName}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="row">
          {products.map((product) => (
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
        </div>

        <nav className="mb-4" aria-label="Page navigation">
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
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
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
      </div>
    </section>
  );
};

export default ProductGrid;
