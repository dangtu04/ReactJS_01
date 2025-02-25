import React from "react";
import item1 from "../../assets/images/items/1.jpg";
import item2 from "../../assets/images/items/2.jpg";
import item3 from "../../assets/images/items/3.jpg";
import item4 from "../../assets/images/items/4.jpg";
import item5 from "../../assets/images/items/5.jpg";
import item6 from "../../assets/images/items/6.jpg";
import item7 from "../../assets/images/items/7.jpg";

const Apparel = () => (
  <section className="padding-bottom">
    <header className="section-heading heading-line">
      <h4 className="title-section text-uppercase">Apparel</h4>
    </header>

    <div className="card card-home-category">
      <div className="row no-gutters">
        <div className="col-md-3">
          <div className="home-category-banner bg-light-orange">
            <h5 className="title">Best trending clothes only for summer</h5>
            <p>
              Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.{" "}
            </p>
            <a href="#" className="btn btn-outline-primary rounded-pill">
              Source now
            </a>
            <img src={item2} className="img-bg" />
          </div>
        </div>
        <div className="col-md-9">
          <ul className="row no-gutters bordered-cols">
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Well made women clothes with trending collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item1} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> Guanjou, China
                  </p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Great clothes with trending collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item2} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> Beijing, China
                  </p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Demo clothes with sample collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item3} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> Tokyo, Japan
                  </p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Home and kitchen electronic stuff collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item4} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> Tashkent, Uzb
                  </p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Home and kitchen electronic stuff collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item5} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> London, Britain
                  </p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Home and kitchen electronic stuff collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item6} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> Guanjou, China
                  </p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Well made clothes with trending collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item7} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> Hong Kong, China
                  </p>
                </div>
              </a>
            </li>
            <li className="col-6 col-lg-3 col-md-4">
              <a href="#" className="item">
                <div className="card-body">
                  <h6 className="title">
                    Home and kitchen interior stuff collection{" "}
                  </h6>
                  <img className="img-sm float-right" src={item7} />
                  <p className="text-muted">
                    <i className="fa fa-map-marker-alt"></i> Guanjou, China
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);
export default Apparel;
