import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";

const Slider = () => {
  const [banners, setBanners] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    GET_ALL("/banners/active")
      .then((data) => {
        setBanners(data);
        data.forEach((banner) => fetchBannerImage(banner.image, banner.id));
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }, []);

  const fetchBannerImage = async (fileName, id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`http://localhost:8080/api/public/banners/image/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrls((prev) => ({ ...prev, [id]: imageUrl }));
    } catch (error) {
      console.error("Error fetching banner image:", error);
    }
  };

  return (
    <section className="section-intro padding-y">
      <div className="container">
        <div
          id="carousel1_indicator"
          className="slider-home-banner carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            {banners.map((_, index) => (
              <li
                key={index}
                data-target="#carousel1_indicator"
                data-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></li>
            ))}
          </ol>
          <div className="carousel-inner">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                {imageUrls[banner.id] ? (
                  <img src={imageUrls[banner.id]} alt={`Slide ${index + 1}`} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carousel1_indicator"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carousel1_indicator"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Slider;