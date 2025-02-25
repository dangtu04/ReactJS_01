import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <footer className="section-footer bg-secondary">
            <div className="container">
                <section className="footer-top padding-y-lg text-white">
                    <div className="row">
                        <aside className="col-md col-6">
                            <h6 className="title">Công ty</h6>
                            <ul className="list-unstyled">
                                <li> <a href="#">Về chúng tôi</a></li>
                                <li> <a href="#">Nghề nghiệp</a></li>
                                <li> <a href="#">Tìm cửa hàng</a></li>
                                <li> <a href="#">Quy định và điều khoản</a></li>
                                <li> <a href="#">Sơ đồ trang</a></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h6 className="title">Trợ giúp</h6>
                            <ul className="list-unstyled">
                                <li> <a href="#">Liên hệ chúng tôi</a></li>
                                <li> <a href="#">Hoàn tiền</a></li>
                                <li> <a href="#">Trạng thái đơn hàng</a></li>
                                <li> <a href="#">Thông tin vận chuyển</a></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h6 className="title">Tài khoản</h6>
                            <ul className="list-unstyled">
                                <li> <Link to="/login">Đăng nhập</Link></li>
                                <li> <Link to="/register">Đăng ký</Link></li>
                                <li> <Link to="/SettingProfile">Cài đặt tài khoản</Link></li>
                                <li> <Link to="/Order">Đơn hàng của tôi</Link></li>
                            </ul>
                        </aside>
                        <aside className="col-md">
                            <h6 className="title">Mạng xã hội</h6>
                            <ul className="list-unstyled">
                                <li><Link to="#"> <i className="fab fa-facebook"></i> Facebook </Link></li>
                                <li><Link to="#"> <i className="fab fa-twitter"></i> Twitter </Link></li>
                                <li><Link to="#"> <i className="fab fa-instagram"></i> Instagram </Link></li>
                                <li><Link to="#"> <i className="fab fa-youtube"></i> Youtube </Link></li>
                            </ul>
                        </aside>
                    </div>
                </section>
        
                <section className="footer-bottom text-center">            
                    <p className="text-white">Chính sách bảo mật - Điều khoản sử dụng - Hướng dẫn pháp lý thông tin người dùng</p>
                    <p className="text-muted"> &copy 2019 Tên công ty, Đã đăng ký bản quyền </p>
                    <br/>
                </section>
            </div>
        </footer>
    );
  }
}

export default Footer;
