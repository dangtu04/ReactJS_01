import React, { useState } from "react";
import { GET_ID, LOGIN } from "../../api/apiService";
import { Link, useNavigate } from "react-router-dom";

const SectionContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    try {
      const response = await LOGIN(body); // Await LOGIN response
      if (response && response.data) {
        const token = response.data["jwt-token"];
        if (token) {
          localStorage.setItem("authToken", token);
          // console.log("Login successful!");

          const userResponse = await GET_ID(`users/email`, email);
          if (userResponse) {
            const { email, userId, cart} = userResponse;
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', userId);
            if(cart && cart.cartId) {
              localStorage.setItem('cartId', cart.cartId); 
            }
            // console.log("User email:", email);
            // console.log("Cart ID:", cart?.cartId);
          }


          navigate("/");
        } else {
          window.alert("Token not found in response");
        }
      } else {
        window.alert("Login response is missing data");
      }
    } catch (error) {
      window.alert("Đăng nhập không thành công!");
    }
  };

  return (
    <section className="section-content padding-y" style={{ minHeight: "84vh" }}>
      {/* ============================ COMPONENT LOGIN=====================*/}
      <div
        className="card mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-main">Đăng nhập</h4>
          <form onSubmit={handleSubmit}>
            {/* Facebook and Google sign-in buttons */}
            {/* <a href="#" className="btn btn-facebook btn-block mb-2">
              <i className="fab fa-facebook-f"></i> &nbsp; Đăng nhập với Facebook
            </a>
            <a href="#" className="btn btn-google btn-block mb-4">
              <i className="fab fa-google"></i> &nbsp; Đăng nhập với Google
            </a> */}
            <div className="form-group">
              <input
                name="email"
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                className="form-control"
                placeholder="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <a href="#" className="float-right">
                Quên mật khẩu?
              </a>
              <label className="float-left custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" />
                <div className="custom-control-label"> Nhớ </div>
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className="text-center mt-4">
       Bạn chưa có tài khoản? <Link to="/register">Đăng kí</Link>
      </p>
      <br />
      <br />
      {/* ============================ COMPONENT LOGIN END.// ============================== */}
    </section>
  );
};

export default SectionContent;
