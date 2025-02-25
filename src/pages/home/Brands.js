import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const imageURL = `http://localhost:8080/api/public/brands/image/`;
  useEffect(() => {
    GET_ALL(`brands`)
      .then((response) => {
        // console.log('dữ liệu br: ', response)
        setBrands(response);
        response.forEach((brand) =>
          fetchBrandImage(brand.image, brand.brandId)
        );
      })
      .catch((error) => {
        console.log("Lỗi khi tải dữ liệu thương hiệu: ", error);
      });
  }, []);

  const fetchBrandImage = async (fileName, id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/public/brands/image/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrls((prev) => ({ ...prev, [id]: imageUrl }));
    } catch (error) {
      console.error("Error fetching brand image:", error);
    }
  };
  return (
    <section className="padding-bottom">
      <header className="section-heading heading-line">
        <h4 className="title-section text-uppercase text-main">Thương hiệu</h4>
      </header>

      <div className="row">
        {brands.map((brand) => (
          <div className="col-md-3 col-sm-6" key={brand.brandId}>
            <article className="card card-post">
              <img src={imageUrls[brand.brandId]} className="card-img-top" />
              <div className="card-body">
                <h6 className="title">{brand.brandName}</h6>
                {/* <p className="small text-uppercase text-muted">Order protection</p> */}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Brands;
