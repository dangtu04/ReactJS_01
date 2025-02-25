import React from "react";

import items1 from "../../assets/images/items/1.jpg";
import items2 from "../../assets/images/items/2.jpg";
import items7 from "../../assets/images/items/7.jpg";
import items8 from "../../assets/images/items/8.jpg";
import items9 from "../../assets/images/items/9.jpg";
import items10 from "../../assets/images/items/10.jpg";
import items11 from "../../assets/images/items/11.jpg";
import items12 from "../../assets/images/items/12.jpg";
import items14 from "../../assets/images/items/14.jpg";

const Electronics = () => (
  <section className="padding-bottom">
    <header className="section-heading heading-line">
      <h4 className="title-section text-uppercase">Electronics</h4>
    </header>

    <div className="card card-home-category">
      <div className="row no-gutters">
        <div className="col-md-3">
          <div className="home-category-banner bg-light-orange">
            <h5 className="title">Machinery items for manufacturers</h5>
            <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <a href="#" className="btn btn-outline-primary rounded-pill">Source now</a>
            <img src={items14} className="img-bg" alt="item" />
          </div>
        </div>
        <div className="col-md-9">
          <ul className="row no-gutters bordered-cols">
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Well made electronic stuff collection</h6>
                  <img className="img-sm float-right" src={items7} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Tokyo, Japan</p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Another demo text for item stuff goes here</h6>
                  <img className="img-sm float-right" src={items8} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Hong Kong, China</p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Home and kitchen electronic stuff collection</h6>
                  <img className="img-sm float-right" src={items9} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Tashkent, Uzb</p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Group of electronic stuff collection</h6>
                  <img className="img-sm float-right" src={items10} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Home and kitchen electronic stuff collection</h6>
                  <img className="img-sm float-right" src={items11} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Home and kitchen electronic stuff collection</h6>
                  <img className="img-sm float-right" src={items12} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Home and kitchen electronic stuff collection</h6>
                  <img className="img-sm float-right" src={items1} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">Home and kitchen electronic stuff collection</h6>
                  <img className="img-sm float-right" src={items2} alt="item" />
                  <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);
export default Electronics;
