import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link } from "react-router-dom";
function Menu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 5,
      sortBy: "categoryId",
      sortOrder: "asc",
    };

    GET_ALL("categories", params)
      .then((response) => {
        setCategories(response.content);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  return (
    <header className="section-header px-5">
      <nav className="navbar navbar-main navbar-expand pl-0">
        <ul className="navbar-nav flex-wrap">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
            >
             Danh mục sản phẩm
            </a>
            <div className="dropdown-menu">
              {categories.length > 0 &&
                categories.map((row) => (
                  <Link
                    key={row.categoryId}
                    className="dropdown-item"
                    to={`/ListingGrid?categoryId=${row.categoryId}`}
                  >
                    {row.categoryName}
                  </Link>
                ))}
            </div>
          </li>
     
          <li className="nav-item">
            <Link className="nav-link" to="/ProductGrid">
              Tất cả sản phẩm
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Order">
              Đơn hàng
            </Link>
          </li>
           
          
        </ul>
      </nav>
    </header>
  );
}

export default Menu;
